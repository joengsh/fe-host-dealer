import { LiveGame } from './config'

export * from './config'

export enum ScannerType {
  SERIAL_SCANNER = 0,
  IMAGE_RECOGNITION = 1,
}

export enum Direction {
  LEFT = 1,
  RIGHT = 2,
}

export enum EventState {
  GAME_IDLE = 0,
  GAME_STARTING = 1,
  GAME_COUNTER_STARTED = 2,
  GAME_OX_FIRST_SCAN_CARD = 3,
  GAME_OX_SECOND_SCAN_CARD = 4,
  GAME_OX_THIRD_SCAN_CARD = 5,
  GAME_OX_FOURTH_SCAN_CARD = 6,
  GAME_DT_TIGER_SCAN_CARD = 4,
  GAME_DT_DRAGON_SCAN_CARD = 3,
  GAME_ZJH_GOLD_SCAN_CARD = 3,
  GAME_ZJH_SILVER_SCAN_CARD = 4,
  GAME_ZJH_GOLD_EXTRA_SCAN_CARD = 5,
  GAME_ZJH_SILVER_EXTRA_SCAN_CARD = 6,
  GAME_BAC_BANKER_SCAN_CARD = 3,
  GAME_BAC_PLAYER_SCAN_CARD = 4,
  GAME_BAC_BANKER_SCAN_EXTRA_CARD = 5,
  GAME_BAC_PLAYER_SCAN_EXTRA_CARD = 6,
  GAME_BAM_PEEK = 20,
  GAME_BAM_PEEK_BANKER_EXTRA = 22,
  GAME_BAM_PEEK_PLAYER_EXTRA = 24,
  GAME_RESULT_CONFIRM = 8,
  GAME_END = 7,
  GAME_ON_MAINTENANCE = 30,
}

export enum OXResult {
  NO_COW = 'no-cow',
  COW_ONE = 'cow-1',
  COW_TWO = 'cow-2',
  COW_THREE = 'cow-3',
  COW_FOUR = 'cow-4',
  COW_FIVE = 'cow-5',
  COW_SIX = 'cow-6',
  COW_SEVEN = 'cow-7',
  COW_EIGHT = 'cow-8',
  COW_NINE = 'cow-9',
  COW_COW = 'cow-cow',
  FIVE_FLOWER = 'five-flower',
}

export enum MahJong {
  DŌNG_FĒNG = 'dōng-fēng',
  NÁN_FĒNG = 'nán-fēng',
  XĪ_FĒNG = 'xī-fēng',
  BĔĪ_FĒNG = 'bĕī-fēng',
  BÁ_BĂN = 'bá-băn',
  HŌNG_ZHŌNG = 'hōng-zhōng',
  FĀ_CÁİ = 'fā-cái̇',
}

export enum PokerSuit {
  DIAMOND = 'diamond',
  SPADE = 'spade',
  HEART = 'heart',
  CLUB = 'club',
}

export enum MessageType {
  ERROR = 'ERROR',
  NOTIFICATION = 'NOTIFICATION',
}

export enum CharacterType {
  BANKER = 'Banker',
  PLAYER = 'Player',
  PLAYER_X = 'Player 1',
  PLAYER_Y = 'Player 2',
  PLAYER_Z = 'Player 3',
  TIGER = 'Tiger',
  DRAGON = 'Dragon',
  PHOENIX = 'Phoenix',
  GOLD = 'Gold',
  SILVER = 'Silver',
}

export enum Position {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle',
}

export enum LoginStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  LOGGING_IN = 'LOGGING_IN',
  FAILED_LOGIN = 'FAILED_LOGIN',
  LOGGED_IN = 'LOGGED_IN',
}

export interface ConnectEvent {
  iscallingpitboss: boolean
  gamestatus: unknown
  tableinfo: {
    tableid: string
    gametype: number
    meta: {
      ip: string
      mcu: string
      counter: string
      periods: string
      start: string
    }
  }
}

export interface LoginEvent {
  hostid: string
  dealerinfo: { nickname: string }
  tableinfo: {
    gametype: number
    meta: {
      ip: string
      mcu: string
      counter: string
      periods: string
      start: string
    }
  }
}

export interface ErrorEvent {
  code?: string
  detail?: string
  error?: string
  id?: string
}

export interface StatusChangeEvent {
  iscallingpitboss: boolean
  status: number
}
export interface GameState {
  [key: string]: number | boolean | string | undefined
  state: EventState
  direction?: number
  countdown: number
  countdowna?: number
  countdownb?: number
  starttime: number
  shoe: number
  round: number
  firstcard?: string
  revealingposition?: string
  redcard?: boolean
  dice1?: number
  dice2?: number
  dice3?: number
  total?: number
  odd?: number
  size?: number
  tie?: number
  playerpoint?: number
  bankerpoint?: number
  a1?: string
  a2?: string
  a3?: string
  b1?: string
  b2?: string
  b3?: string
  b4?: string
  b5?: string
  x1?: string
  x2?: string
  x3?: string
  x4?: string
  x5?: string
  y1?: string
  y2?: string
  y3?: string
  y4?: string
  y5?: string
  z1?: string
  z2?: string
  z3?: string
  z4?: string
  z5?: string
  playerxwin?: number
  playerywin?: number
  playerzwin?: number
  bankertype?: number
  playerxtype?: number
  playerytype?: number
  playerztype?: number
  dragoncard?: string
  tigercard?: string
  dragonpoint?: string
  tigerpoint?: string
  dragon1?: string
  dragon2?: string
  dragon3?: string
  phoenix1?: string
  phoenix2?: string
  phoenix3?: string
  dragonresult?: string
  phoenixresult?: string
  dragonresultint?: number
  phoenixresultint?: number
  wintype?: number
  value?: string | number
  wina?: boolean
  winb?: boolean
}

export type CardGame =
  | LiveGame.BAC
  | LiveGame.BAA
  | LiveGame.BAM
  | LiveGame.BAS
  | LiveGame.BAL
  | LiveGame.DT
  | LiveGame.DTS
  | LiveGame.ZJH
  | LiveGame.OX
