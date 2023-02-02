import React, {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

interface Props {
  value: number
}

type DiceProp = Props & HTMLAttributes<HTMLDivElement>


const Dice: React.FC<DiceProp> = ({ value, ...props }) => {
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
        `../../assets/images/dice/${ value || 'empty' }.svg`
      )
      if (mounted.current) {
        setImg(result.default)
      }
    })()
  }, [value])

  if (!value) {
    return null
  }

  return (
    <div {...props}>
      <img
        className='w-full h-full'
        alt={ `${ value }` }
        src={ img }
      />
    </div>
  )
}

export default Dice
