import { observer } from 'mobx-react-lite'
import React from 'react'

import logo from '@/assets/logo.png'
// import Logout from '@/components/logout'
// import Pitboss from '@/components/pitboss'
import useSystem from '@/hooks/use-system'

const Footer: React.FC = observer(() => {
  const system = useSystem()

  return (
    <div className='flex items-end basis-full w-full justify-between text-white'>
      <div>
        <img alt='logo' src={ logo } />
      </div>
      <div className='flex flex-wrap'>
        {/* { system.dealer && system.isLoggedIn && <Logout /> }
        { system.isLoggedIn && <Pitboss /> } */}
        <span className='basis-full text-right text-3xl'>
          { `v${ import.meta.env.PACKAGE_VERSION }` }
        </span>
        {
          (system.tableId || system.hostId) && (
            <span className='basis-full text-right text-3xl'>
              { system.tableId || system.hostId }
            </span>
          )
        }
      </div>
    </div>
  )
})

export default Footer
