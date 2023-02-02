import format from 'date-fns/format'
import {
  useEffect,
  useState,
} from 'react'

interface UseCurrentTimeReturnInterface {
  fullDateTime: string
}

const useCurrentTime = (): UseCurrentTimeReturnInterface => {
  const genTime = () =>
    ({ fullDateTime: format(new Date(), 'yyyy/MM/dd HH:mm') })

  const [currentTime, setCurrentTime] = useState(genTime())

  // run once
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(genTime())
    }, 1000)

    // clear timer when unmount
    return () =>
      clearInterval(interval)
  }, [])

  return currentTime
}

export default useCurrentTime
