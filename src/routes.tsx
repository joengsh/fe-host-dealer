import {
  createHashHistory,
  Outlet,
  ReactLocation,
  Router,
  useNavigate,
} from '@tanstack/react-location'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import GameSelection from '@/pages/game-selection'
import {
  EventState,
  GameState,
} from '@/types'
import useSystem from './hooks/use-system'
import useElectronBridge from './hooks/use-electron-bridge'
import withLayout from './hoc/with-layout'
import { ipcRenderer } from 'electron'

const { invoke } = ipcRenderer

const history = createHashHistory()
const location = new ReactLocation({ history })

const RouteController: React.FC = observer(() => {
  const navigate = useNavigate()
  const system = useSystem()

  useElectronBridge('host-client-update-event', async (_, event: GameState) => {
    console.log('UPDATE Event', event)
    system.game.state = event
  })

  useEffect(() => {
    if (system.hostId && system.dealer) {
      invoke('host-client-get-game-status', system.hostId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system.dealer])

  useEffect(() => {
    if (system.canLogin) {
      navigate({
        replace: true,
        to: '/dealer/login',
      })

      return
    }
  }, [system.canLogin, system.game?.state])

  return <Outlet />
})

const LiveGameRoutes = withLayout(() =>
  (
    <Router
    location={ location }
    routes={
      [
        {
          element: <GameSelection />,
          path: '/',
        },
      ]
    }
    >
      <RouteController />
    </Router>
  ))
  export default LiveGameRoutes
