import {
  useEffect,
  useState,
} from 'react'

import useKeyboard from '@/hooks/use-keyboard'

interface UseSelectionReturnInterface {
  selection: number
  reset: () => void
}

interface Params {
  collection: { key: number, label: string }[]
  key: 'leftRight' | 'upDown'
  disabled?: boolean
  onChange?: (selection?: number) => void
}

const useSelection = ({
  collection,
  key,
  disabled = false,
  onChange,
}: Params): UseSelectionReturnInterface => {
  const [selection, setSelection] = useState<number>(0)

  const reset = () =>
    setSelection(0)

  // right
  useKeyboard(key === 'leftRight'
    ? 'arrowright'
    : 'arrowdown', () => {
    if (!disabled) {
      const selectionIndex = selection + 1
      setSelection(selectionIndex === collection.length
        ? 0
        : selectionIndex)
    }
  })

  // left
  useKeyboard(key === 'leftRight'
    ? 'arrowleft'
    : 'arrowup', () => {
    if (!disabled) {
      const selectionIndex = selection - 1
      setSelection(
        selectionIndex === -1
          ? collection.length - 1
          : selectionIndex,
      )
    }
  })

  useEffect(() => {
    if (onChange) {
      onChange(selection)
    }
  }, [onChange, selection, collection])

  return {
    reset,
    selection,
  }
}

export default useSelection
