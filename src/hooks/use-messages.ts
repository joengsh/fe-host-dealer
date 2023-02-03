import filter from 'lodash/filter'
import { useContext } from 'react'

import {
  Message,
  MessagesContext,
} from '@/providers/messages'
import uuid from '@/utils/uuid'

interface UseMessagesReturnInterface {
  currentMessage: Message | undefined
  messages: Message[]
  setMessages: (message: Omit<Message, 'timestamp' | 'id'>) => void
  getMessages: (params?: Partial<Omit<Message, 'onDisappear'>>) => Message[]
  clearAllMessages: () => void
}

const useMessages = (): UseMessagesReturnInterface => {
  const {
    currentMessage,
    messages,
    setMessages: _setMessages,
    setCurrentMessage,
  } = useContext(MessagesContext)

  const setMessages = (message: Omit<Message, 'timestamp' | 'id'>): Message => {
    const newMessage = {
      ...message,
      id: uuid(),
      timestamp: Date.now(),
    }

    _setMessages((prevMessages) =>
      [
        ...prevMessages,
        newMessage,
      ])

    return newMessage
  }

  const getMessages = (params?: Partial<Omit<Message, 'onDisappear'>>) =>
    filter<Message>(messages, params)

  const clearAllMessages = () => {
    _setMessages([])
    setCurrentMessage(undefined)
  }

  return {
    clearAllMessages,
    currentMessage,
    getMessages,
    messages,
    setMessages,
  }
}

export default useMessages
