import {
  spawn,
  SpawnOptions,
} from 'child_process'
import { app } from 'electron'
import { resolve } from 'path'

export const getExtraFilesDir = () =>
  app.isPackaged
    ? resolve(__dirname, '../../../..')
    : resolve(__dirname, '../../..')

export const spawnProcess = (baseDir: string, proc: string, args: string[], options: SpawnOptions = {}) => {
  let newOptions
  // For Windows, specify cwd where binary located
  // For Mac, specify PATH variable to search the binary
  if (process.platform === 'win32') {
    newOptions = {
      ...options,
      cwd: baseDir,
    }
  } else {
    newOptions = {
      ...options,
      env: { PATH: baseDir },
    }
  }

  return spawn(proc, args, newOptions as SpawnOptions)
}
