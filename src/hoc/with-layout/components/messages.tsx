import classnames from 'classnames'
import React from 'react'

import useMessages from '@/hooks/use-messages'
import { Message as MessageInterface } from '@/providers/messages'
import { MessageType } from '@/types'

const Message: React.FC<MessageInterface> = ({
  type,
  message,
}) =>
  (
    <div
      className={
        classnames('text-black w-full min-h-[15rem] opacity-80 flex justify-center items-center', {
          'bg-red-500': type === MessageType.ERROR,
          'bg-white': type === MessageType.NOTIFICATION,
        })
      }
    >
      <span className='text-5xl m-12 break-all h-full flex items-center'>
        { message }
      </span>
    </div>
  )

const Messages: React.FC = () => {
  const { currentMessage } = useMessages()

  return (
    <div className='w-full absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] z-50'>
      { currentMessage && <Message { ...currentMessage } /> }
    </div>
  )
}

export default Messages
