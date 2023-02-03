import React, { PropsWithChildren } from 'react'

import MessagesProvider from './messages'
import SerialScannersProvider from './serial-scanners'
import SystemProvider from './system'

const Providers: React.FC<PropsWithChildren> = ({ children }) =>
  (
    <MessagesProvider>
      <SystemProvider>
        <SerialScannersProvider>
          { children }
        </SerialScannersProvider>
      </SystemProvider>
    </MessagesProvider>
  )

export default Providers
