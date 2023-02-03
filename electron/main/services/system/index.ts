import {
  app,
  ipcMain,
} from 'electron'

ipcMain.handle('get-system-status', async () =>
  ({ isDev: !app.isPackaged }))
