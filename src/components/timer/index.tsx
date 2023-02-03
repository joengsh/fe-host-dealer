import classnames from 'classnames'
import isInteger from 'lodash/isInteger'
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import useCountDown from 'react-countdown-hook'

import SpinLeft from '@/assets/images/spin_left.png'
import SpinRight from '@/assets/images/spin_right.png'
import useMessages from '@/hooks/use-messages'
import {
  Direction,
  MessageType,
} from '@/types'

interface Props {
  countdown: number
  text?: string
  starttime?: number
  direction?: number
  onUnmount?: () => Promise<void> | void
  onTimesOut?: () => Promise<void> | void
}

const red = '#ee2e2e'
const green = '#13a900'
const strokeWidth = 20

const getAnimatedTotalSeconds = (countdown: number, starttime?: number) =>
  starttime
    ? ((new Date(starttime).getTime() + countdown * 1000) - new Date().getTime()) / 1000
    : countdown

const Timer: React.FC<Props> = ({
  countdown,
  starttime,
  direction,
  text = 'Start Betting',
  onUnmount = () => { },
  onTimesOut = () => { },
}) => {
  const init = useRef<boolean>(false)

  const [animatedTotalSeconds, setAnimatedTotalSeconds] = useState(getAnimatedTotalSeconds(countdown, starttime))

  const { setMessages } = useMessages()

  const size = Math.floor(window.outerHeight - 270)
  const radius = size / 2 - strokeWidth * 2
  const dashArray = 2 * radius * Math.PI

  const [msLeft, { start }] = useCountDown(
    animatedTotalSeconds * 1000,
    100,
  )
  const remain = Math.round(msLeft / 1000)

  // Need to minus 1 second here cause need to wait till animation finish
  // So minus 1 on each remain and countdown will make the animation go faster
  const progress = remain - 1 <= 0
    ? 0
    : (remain - 1) / (countdown - 1)
  const dashOffset = ((!init.current)
    ? 0
    : (1 - progress)) * Math.PI * radius * 2

  useEffect(() => {
    if (init.current && msLeft <= 0) {
      onTimesOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msLeft])

  useEffect(() => {
    setAnimatedTotalSeconds(getAnimatedTotalSeconds(countdown, starttime))
  }, [starttime, countdown])

  // Validation for props
  useEffect(() => {
    if (countdown <= 0) {
      setMessages({
        message: 'Countdown seconds should not be smaller or equal to 0!',
        type: MessageType.ERROR,
      })
    }
    if (!isInteger(countdown)) {
      setMessages({
        message: ' Countdown should an integer!',
        type: MessageType.ERROR,
      })
    }

    return () => {
      if (init.current) {
        onUnmount()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    start(animatedTotalSeconds * 1000)
    init.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedTotalSeconds])

  if (countdown <= 0 || !isInteger(countdown)) {
    return null
  }

  return (
    <div className='text-center full flex flex-wrap w-full items-center relative'>
      <svg className='w-full' height={ size } width={ size }>
        <circle
          cx='50%'
          cy='50%'
          r={ radius - 9 }
          stroke='#eeeeee'
          strokeDasharray={ dashArray }
          strokeDashoffset='0'
          strokeWidth={ strokeWidth }
        />
        <circle
          className='transition-strokeDashOffset ease-linear duration-1000'
          cx='50%'
          cy='50%'
          r={ radius }
          stroke={
            init.current && remain <= 5
              ? red
              : green
          }
          strokeDasharray={ dashArray }
          strokeDashoffset={ dashOffset }
          strokeWidth={ strokeWidth }
        />
      </svg>
      <div
        className={
          classnames('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {
            'text-[#ee2e2e]': remain <= 5,
            'text-white': remain > 5,
          })
        }
      >
        <h2 className='text-9xl'>
          {
            new Date(msLeft)
              .toISOString()
              .split('T')[1]
              .split('.')[0]
              .replace(/^00:(\d{2}:\d{2})/, '$1')
          }
        </h2>
        {
          text && (
            <h2 className='text-6xl'>
              { text }
            </h2>
          )
        }
        {
          direction === Direction.LEFT && (
            <div className='m-auto mt-5 w-72'>
              <img alt='spin_left' src={ SpinLeft } />
            </div>
          )
        }
        {
          direction === Direction.RIGHT && (
            <div className='m-auto mt-5 w-72'>
              <img alt='spin_right' src={ SpinRight } />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Timer
