// import { IpcRendererEvent } from 'electron'

// declare global {
//   interface Window {
//     /** Expose some Api through preload script */
//     bridge: {
//       __dirname: string
//       __filename: string
//       fs: typeof import('fs')
//       path: typeof import('path')
//       ipcRenderer: Pick<import('electron').IpcRenderer, 'send' | 'invoke'> & {
//         on: <T>(
//           channel: string,
//           handler: (_: IpcRendererEvent, e: T) => void
//         ) => Function
//       }
//       removeLoading: () => void
//     }
//   }
// }
