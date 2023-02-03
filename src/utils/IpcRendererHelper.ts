import { IpcRendererEvent, ipcRenderer } from 'electron'

export default {
  on: <T,>(channel: string, handler:  (_: IpcRendererEvent, e: T) => void) => {
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeListener(channel, handler);
  },
  invoke: ipcRenderer.invoke,
  send: ipcRenderer.send,
}

 