import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren
} from 'react'

import { MessageType } from '@/types'

const messageDuration = 1500

export interface Message {
  id: string
  type: MessageType.ERROR | MessageType.NOTIFICATION
  message: string
  timestamp: number
  onDisappear?: () => Promise<void>
}

interface MessagesContextInterface {
  currentMessage: Message | undefined
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  setCurrentMessage: React.Dispatch<React.SetStateAction<Message | undefined>>
}

export const MessagesContext = createContext<MessagesContextInterface>({
  currentMessage: undefined,
  messages: [],
  setCurrentMessage: () => {},
  setMessages: () => {},
})

const MessagesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState<Message>()

  const change = () => {
    const newMessages = [...messages]
    const current = newMessages.shift()
    setMessages(prev =>
      prev.filter(item =>
        item.id !== current?.id))

    setCurrentMessage(current)
  }

  useEffect(() => {
    if ((!currentMessage && messages.length)) {
      change()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, currentMessage])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (currentMessage) {
      timeout = setTimeout(async () => {
        if (currentMessage?.onDisappear) {
          await currentMessage.onDisappear()
        }
        change()
      }, messageDuration)
    }

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessage])

  return (
    <MessagesContext.Provider
      value={
        {
          currentMessage,
          messages,
          setCurrentMessage,
          setMessages,
        }
      }
    >
      { children }
    </MessagesContext.Provider>
  )
}

export default MessagesProvider
