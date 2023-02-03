import IpcRendererHelper from '@/utils/IpcRendererHelper'
import { IpcRendererEvent } from 'electron'
import {
  useEffect,
  useRef,
} from 'react'

interface Config {
  pause?: boolean
}

interface useElectronBridgeReturnInterface {
  event: string
}

const { on } = IpcRendererHelper

const useElectronBridge = (
  event: string,
  callback: (_: IpcRendererEvent, ...args: any) => void,
  config?: Config,
): useElectronBridgeReturnInterface => {
  const callbackRef = useRef<(_: IpcRendererEvent, ...args: any) => void>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (config?.pause) {
      return
    }

    const eventCallback = (_: IpcRendererEvent, ...args: any) =>
      callbackRef.current && callbackRef.current(_, ...args)

    console.log(`listen to ${ event } from main process`)
    const unsubscribe = on(event, eventCallback)

    return () => {
      console.log(`remove listener to ${ event } from main process`)
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  return { event }
}

export default useElectronBridge
