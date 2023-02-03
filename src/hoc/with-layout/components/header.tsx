import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, {
  useEffect,
  useState,
} from 'react'

import Clock from '@/components/clock'
import useElectronBridge from '@/hooks/use-electron-bridge'
import useSystem from '@/hooks/use-system'
// import isCardGame, { hasImageRecognition } from '@/utils/check-card-games'
import IpcRendererHelper from '@/utils/IpcRendererHelper'

const { invoke } = IpcRendererHelper

const ImageRecognitionStatus: React.FC = observer(() => {
  const [version, setVersion] = useState<string>()
  const system = useSystem()

  useElectronBridge('image-recognition-disconnected', () => {
    system.isConnectedToImageRecognition = false
  })

  useElectronBridge('image-recognition-connected', () => {
    system.isConnectedToImageRecognition = true
  })

  useEffect(() => {
    void (async () => {
      const v = await invoke('get-image-recognition-version')
      setVersion(v)
    })()

    const check = async () =>
      invoke('check-image-recognition-connection')
    const interval = setInterval(check, 1000)

    check()

    return () =>
      clearInterval(interval)
  }, [])

  return (
    <>
      <div className='basis-full text-right'>
        <span>Image Recognition Status:&nbsp;</span>
        <span
          className={
            classnames({
              'text-green-400': system.isConnectedToImageRecognition,
              'text-red-500': !system.isConnectedToImageRecognition,
            })
          }
        >
          {
            system.isConnectedToImageRecognition
              ? 'ONLINE'
              : 'OFFLINE'
          }
        </span>
      </div>
      {
        version && (
          <div className='basis-full text-right'>
            <span>
              { version }
            </span>
          </div>
        )
      }
    </>
  )
})

const Header: React.FC = observer(() => {
  const system = useSystem()

  const renderShoeRound = () => {
    const hasShoe = system.game.state?.shoe !== undefined
    const hasRound = system.game.state?.round !== undefined

    // if (isCardGame(system.game.key)) {
    //   if (hasShoe && hasRound) {
    //     return (
    //       <span className='basis-full'>
    //         { `Shoe - Round: ${ system.game.state?.shoe } - ${ system.game.state?.round }` }
    //       </span>
    //     )
    //   }
    //   if (hasRound && !hasShoe) {
    //     return (
    //       <span className='basis-full'>
    //         { `Round: ${ system.game.state?.round }` }
    //       </span>
    //     )
    //   }

    //   return null
    // }

    return hasRound
      ? (
        <span className='basis-full'>
          { `Round: ${ system.game.state?.round }` }
        </span>
      )
      : null
  }

  return (
    <div className='flex items-start basis-full w-full justify-between text-white text-4xl'>
      <div className='flex flex-wrap'>
        {
          system.game.name && (
            <span className='basis-full'>
              { `Game: ${ system.game.name }` }
            </span>
          )
        }
        { renderShoeRound() }
      </div>
      <div className='flex flex-wrap'>
        <Clock />
        {/* { hasImageRecognition(system.game.key) && <ImageRecognitionStatus /> } */}
        {
          system.dealer && (
            <span className='basis-full text-right'>
              { `Staff Name: ${ system.dealer }` }
            </span>
          )
        }
      </div>
    </div>
  )
})

export default Header
