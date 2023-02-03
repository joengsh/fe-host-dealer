import {
  app,
  dialog,
  ipcMain,
} from 'electron'
import Store from 'electron-store'

import {
  Config,
  GameProperty,
  LiveGame,
} from '@/types';

import { getExtraFilesDir } from '../../utils'

const defaultGameName = {
  BAA: 'Traditional Baccarat',
  BAC: 'Classic Baccarat',
  BAL: 'God Of Fortune - Baccarat',
  BAM: 'Squeeze Baccarat',
  BAS: 'Speed Baccarat',
  DI: 'Sicbo',
  DIL: 'God Of Fortune - Sicbo',
  DT: 'Dragon & Tiger',
  DTS: 'Speed Dragon & Tiger',
  LW: 'LuckyWheel',
  OX: 'Bull Bull',
  RO: 'Roulette',
  ROL: 'God Of Fortune - Roulette',
  ZJH: 'Three Cards',
}

export const store = new Store({
  cwd: getExtraFilesDir(),
  name: 'dealer-config',
})

const hasImageRecognition = (key: LiveGame) =>
  [LiveGame.DT, LiveGame.DTS, LiveGame.BAC, LiveGame.BAA, LiveGame.BAS, LiveGame.BAL, LiveGame.ZJH, LiveGame.OX].includes(key)

const checkImageRecognitionZoom = (key: LiveGame, config: Required<GameProperty>) => {
  for (const prop in config.imageRecognition.zoom) {
    const value = config.imageRecognition.zoom[prop]
    if (value > 1 || value < 0) {
      dialog.showErrorBox('Error', `${ key } image recognition zoom config for ${ prop } has incorrect value`)

      return app.quit()
    }
  }
}

ipcMain.handle('get-dealer-config', async () => {

  store.set({
    env: store.get('env', 'development'),
    gameConfig: Object.values(LiveGame).reduce((acc, key) => {
      const config = (store.get('gameConfig', {}) as Config['gameConfig'])[key]
      const {
        betCounter = 0,
        hostId = '',
        name = defaultGameName[key],
      } = config || {}

      if ([LiveGame.RO, LiveGame.ROL].includes(key)) {
        const serialPort = config?.serialPort || 'simulate'

        return {
          ...acc,
          [key]: {
            betCounter,
            hostId,
            name,
            serialPort,
          },
        }
      }

      if (hasImageRecognition(key)) {
        const { url = '' } = config?.imageRecognition || {}
        const imageRecognition = { url }

        return {
          ...acc,
          [key]: {
            betCounter,
            hostId,
            imageRecognition,
            name,
          },
        }
      }

      return {
        ...acc,
        [key]: {
          betCounter,
          hostId,
          name,
        },
      }
    }, {}),
  })

  for (const [key, value] of Object.entries(store.store.gameConfig as Config['gameConfig'])) {
    if (hasImageRecognition(key as LiveGame)) {
      checkImageRecognitionZoom(key as LiveGame, value as Required<GameProperty>)
    }
  }

  return store.store
})

ipcMain.handle('get-dealer-config-path', () =>
  store.path)
