import isEqual from 'lodash/isEqual'
import upperFirst from 'lodash/upperFirst'
import {
  useEffect,
  useRef,
} from 'react'

import useSystem from '@/hooks/use-system'

interface useKeyboardReturnInterface {
  key: string
}

const translateSpecialKey = (key: string): string => {
  let updatedKey = key
  if (key === 'control') {
    updatedKey = 'ctrl'
  }

  return updatedKey
}

const useKeyboard = (
  key: string,
  callback: () => void,
): useKeyboardReturnInterface => {
  const system = useSystem()
  const keysPressed = useRef<string[]>([])
  const callbackRef = useRef<() => void>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const eventCallback = (event: KeyboardEvent) => {
      if (timeout) {
        clearTimeout(timeout)
      }

      if (system.isCalledPitboss) {
        return
      }

      const target = translateSpecialKey(event.key.toLowerCase()).toLowerCase()
      const keys = key.split(' ').filter((k) =>
        /\S/g.test(k))
      const seq = [...keys]

      if (keys.includes(target)) {
        keysPressed.current.push(target)
      }

      if (isEqual(keysPressed.current, seq)) {
        if (callbackRef.current) {
          callbackRef.current()
          keysPressed.current = []

          return
        }
      }

      timeout = setTimeout(() => {
        keysPressed.current = []
      }, 350)
    }

    window.addEventListener('keydown', eventCallback)

    return () => {
      window.removeEventListener('keydown', eventCallback)
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { key: upperFirst(key) }
}

export default useKeyboard
