import { observer } from 'mobx-react-lite'
import React, {
  useEffect,
  useState,
} from 'react'

import Timer from '@/components/timer'
import useElectronBridge from '@/hooks/use-electron-bridge'
import useMessages from '@/hooks/use-messages'
import useSystem from '@/hooks/use-system'
import {
  ConnectEvent,
  ErrorEvent,
  MessageType,
  StatusChangeEvent,
} from '@/types'

import Footer from './components/footer'
import Header from './components/header'
import Messages from './components/messages'
import IpcRendererHelper from '@/utils/IpcRendererHelper'

const { invoke } = IpcRendererHelper

const withLayout = (
  WrappedComponent: React.FC,
): React.FC =>
  observer(() => {
    const system = useSystem()
    const disconnected = !system.isConnectedToHostClient && system.isLoggedIn
    const [screenshotCountdown, setScreenshotCountdown] = useState<number>()
    const {
      setMessages,
      clearAllMessages,
    } = useMessages()

    useEffect(() => {
      if (system.game?.state?.redcard) {
        setMessages({
          message: 'Red Card is scanned!',
          type: MessageType.NOTIFICATION,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [system.game?.state?.redcard])

    useElectronBridge('host-client-error-event', (_, event: ErrorEvent) => {
      console.log('errorEvent', event)

      const errorMessage = event?.error || event?.detail

      setMessages({
        message: errorMessage || JSON.stringify(event),
        type: MessageType.ERROR,
      })

      invoke('host-client-get-game-status', system.hostId)
    })

    useElectronBridge('host-client-logout-event', (_, event: unknown) => {
      console.log('LOGOUT event', event)
      if (event) {
        system.logout()
        clearAllMessages()
        setMessages({
          message: 'Logged Out!',
          type: MessageType.NOTIFICATION,
        })
      }
    })

    useElectronBridge(
      'host-client-connect-event',
      (_, event: ConnectEvent) => {
        console.log('CONNECT Event in Layout', event)

        if (disconnected) {
          system.isCalledPitboss = event.iscallingpitboss
          system.isConnectedToHostClient = true
        }
      },
    )

    useElectronBridge(
      'host-client-offline-event',
      (_, event: unknown) => {
        console.log('OFFLINE Event', event)

        if (event) {
          system.isConnectedToHostClient = false
          invoke('host-client-reconnect')
        }
      },
    )

    useElectronBridge(
      'host-client-status-change-event',
      (_, event: StatusChangeEvent) => {
        console.log('STATUS_CHANGE Event', event)
        system.isCalledPitboss = event.iscallingpitboss

        if (event.status === 3) {
          setMessages({
            message: 'Next Round will go to maintainence!',
            type: MessageType.NOTIFICATION,
          })
        }
      },
    )

    useElectronBridge(
      'host-client-game-round-cancel-event',
      (_, event: unknown) => {
        console.log('GAME_CANCEL Event', event)
        if (event) {
          clearAllMessages()
          setMessages({
            message: 'This Round is Canceled',
            type: MessageType.NOTIFICATION,
          })
        }
      },
    )

    useElectronBridge(
      'host-client-take-screenshot-event',
      (_, event: unknown) => {
        console.log('TAKE_SCREENSHOT Event', event)
        if (event) {
          setScreenshotCountdown(3)
        }
      },
    )

    return (
      <div className='flex flex-wrap justify-between h-full'>
        {
          disconnected && (
            <div className='absolute w-full h-[350px] flex items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white/80 z-40'>
              <h1 className='text-black w-full text-center text-8xl'>Reconnecting...</h1>
            </div>
          )
        }
        {
          system.isCalledPitboss && (
            <div className='absolute w-full h-[350px] flex items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white/80 z-40'>
              <h1 className='text-black w-full text-center text-8xl'>Calling Pitboss</h1>
            </div>
          )
        }
        <Messages />
        <Header />
        <div className='first-line:basis-full flex w-full justify-center'>
          {
            screenshotCountdown && (
              <div className='absolute inset-x-4 bg-white/70 z-40'>
                <Timer
                  countdown={ screenshotCountdown }
                  onTimesOut={
                    () =>
                      setScreenshotCountdown(undefined)
                  }
                  text='Start Screenshot'
                />
              </div>
            )
          }
          <WrappedComponent />
        </div>
        <Footer />
      </div>
    )
  })

export default withLayout
