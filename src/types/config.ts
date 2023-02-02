export enum LiveGame {
  BAL = 'BAL',
  BAA = 'BAA',
  BAC = 'BAC',
  BAM = 'BAM',
  BAS = 'BAS',
  DT = 'DT',
  DTS = 'DTS',
  LW = 'LW',
  RO = 'RO',
  ROL = 'ROL',
  DI = 'DI',
  DIL = 'DIL',
  ZJH = 'ZJH',
  OX = 'OX',
}

export type Env = 'development' | 'release' | 'staging' | 'uat' | 'production'

export interface GameProperty {
  [k: string]: string | number | Record<string, unknown> | undefined
  name: string
  hostId: string
  betCounter: number
  serialPort?: string
  imageRecognition?: {
    url: string
    zoom: {
      [key: string]: number
      width: number
      height: number
      center_x: number
      center_y: number
    }
  }
}

export type Config = {
  version: string
  env: Env
  gameConfig: {
    [k: string]: GameProperty
  }
}
