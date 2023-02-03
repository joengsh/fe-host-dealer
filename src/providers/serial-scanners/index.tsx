import React, {
  createContext,
  PropsWithChildren,
  useState,
} from 'react'

interface SerialScannersContextInterface {
  onlined: string[]
  setOnlined: React.Dispatch<React.SetStateAction<string[]>>
}

export const SerialScannersContext = createContext<SerialScannersContextInterface>({
  onlined: [],
  setOnlined: () => {},
})

const SerialScannersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [onlined, setOnlined] = useState<string[]>([])

  return (
    <SerialScannersContext.Provider
      value={
        {
          onlined,
          setOnlined,
        }
      }
    >
      { children }
    </SerialScannersContext.Provider>
  )
}

export default SerialScannersProvider
