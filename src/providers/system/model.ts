import { makeAutoObservable } from 'mobx'

import {
  Config,
  GameState,
  LiveGame,
} from '@/types'

interface Game {
  key: LiveGame
  name: string
  state?: GameState
}

class System {
  isDev: boolean = false

  game: Game = {
    key: '' as LiveGame,
    name: '',
    state: undefined,
  }

  hostId = ''

  tableId = ''

  dealer = ''

  isConnectedToImageRecognition: boolean = false

  isConnectedToHostClient: boolean = false

  isCalledPitboss: boolean = false

  config: Config | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return Boolean(this.dealer)
  }

  get canLogin() {
    return this.game.key && this.game.name && this.hostId && !this.dealer
  }

  logout() {
    this.dealer = ''
    this.game.state = undefined
  }
}

export default System
