import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import useKeyboard from '@/hooks/use-keyboard'
import useSystem from '@/hooks/use-system'
import Routes from '@/routes'

import { ipcRenderer } from 'electron'

const {
  invoke,
  send,
} = ipcRenderer

const App: React.FC = observer(() => {
  const system = useSystem()

  // game config
  useEffect(() => {
    void (async function() {
      const { isDev } =
        await invoke('get-system-status')
      const config = await invoke('get-dealer-config')

      if (isDev) {
        system.isDev = isDev
      }

      const path = await invoke('get-dealer-config-path')
      console.log('Config path', path)

      system.config = config
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window.location.hash !== '#/') {
      window.location.hash = '#/'
    }
  }, [])

  useKeyboard('shift d', () =>
    send('open-dev-tools'),
  )

  useKeyboard('ctrl shift k', () =>
    send('terminate'),
  )

  return <Routes />
})

export default App