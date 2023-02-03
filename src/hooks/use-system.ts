import { useContext } from 'react'

import { SystemContext } from '@/providers/system'
import System from '@/providers/system/model'

const useSystem = (): System => {
  const system = useContext(SystemContext)

  return system
}

export default useSystem
