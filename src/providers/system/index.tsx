import { observer } from 'mobx-react-lite'
import React, { createContext, PropsWithChildren } from 'react'

import { LiveGame } from '@/types'

import System from './model'

const defaultContext = {
  canLogin: false,
  config: null,
  dealer: '',
  game: {
    key: '' as LiveGame,
    name: '',
    round: null,
    shoe: null,
    state: undefined,
  },
  hostId: '',
  isCalledPitboss: false,
  isConnectedToHostClient: false,
  isConnectedToImageRecognition: false,
  isDev: false,
  isLoggedIn: false,
  logout: () => {},
  tableId: '',
}

export const SystemContext = createContext<System>(defaultContext)

const SystemProvider: React.FC<PropsWithChildren<unknown>> = observer(({ children }) =>
  (
  // reference: https://mobx.js.org/react-integration.html
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SystemContext.Provider value={ new System() }>
      { children }
    </SystemContext.Provider>
  ))

export default SystemProvider
