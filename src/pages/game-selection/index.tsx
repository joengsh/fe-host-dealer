import find from 'lodash/find'
import { observer } from 'mobx-react-lite'
import React from 'react'

import useKeyboard from '@/hooks/use-keyboard'
import useSelection from '@/hooks/use-selection'
import useSystem from '@/hooks/use-system'
import { LiveGame } from '@/types'
import { ipcRenderer } from 'electron'

const { send } = ipcRenderer

const GameSelection: React.FC = observer(() => {
  const system = useSystem()
  const collection = Object.entries(system.config?.gameConfig ?? []).map(
    ([k, {
      name,
      hostId,
    }], index) =>
      ({
        code: k as LiveGame,
        hostId,
        key: index,
        label: name,
      }),
  )

  const { selection } = useSelection({
    collection,
    key: 'leftRight',
    onChange: (currentSelection) => {
      if (currentSelection !== undefined) {
        system.hostId = collection?.[currentSelection]?.hostId ?? ''
      }
    },
  })

  const { key } = useKeyboard('enter', () => {
    system.game.key = collection?.[selection].code
    system.game.name = collection?.[selection].label
    system.hostId = collection?.[selection].hostId
    if (!system.hostId) {
      send('terminate', { message: `Please input hostId for ${ system.game.name }` })
    }
  })

  return (
    <div className='text-center text-white h-full flex flex-wrap'>
      <h1 className='text-4xl basis-full'>Game selection</h1>
      <h2 className='text-3xl basis-full'>
        { `Please press ${ key } to select one of the following games` }
      </h2>
      <div className='w-1/2 my-3 mx-auto flex flex-wrap justify-center gap-7'>
        <div className='flex items-center'>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path clipRule='evenodd' d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z' fillRule='evenodd' />
          </svg>

        </div>
        <div className='text-5xl text-emerald-400 flex items-center w-[600px] justify-center break-words'>
          { find(collection, { key: selection })?.label || '' }
        </div>
        <div className='flex items-center'>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path clipRule='evenodd' d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z' fillRule='evenodd' />
          </svg>

        </div>
      </div>
    </div>
  )
})

export default GameSelection
