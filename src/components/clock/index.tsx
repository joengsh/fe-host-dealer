import React from 'react'

import useCurrentTime from '@/hooks/use-current-time'

const Clock: React.FC<unknown> = () => {
  const { fullDateTime } = useCurrentTime()

  return (
    <span className='basis-full text-right'>
      { fullDateTime }
    </span>
  )
}

export default Clock
