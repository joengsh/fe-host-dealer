import React, {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

import { MahJong as MahJongEnum } from '@/types'

interface Props {
  value: MahJongEnum
}

type MahJongProps = Props & HTMLAttributes<HTMLDivElement>;

const MahJong: React.FC<MahJongProps> = ({ value, ...props }) => {
  const mounted = useRef(false)
  const [img, setImg] = useState()

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    void (async function() {
      const result = await import(
        `../../assets/images/mah-jong/${ value }.png`
      )
      if (mounted.current) {
        setImg(result.default)
      }
    })()
  }, [value])

  return (
    <div {...props}>
      <img className='w-auto h-full'
        alt={ `${ value }` }
        src={ img }
      />
    </div>
  )
}

export default MahJong
