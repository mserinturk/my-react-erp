import { createContext, useContext, useState } from 'react'

const MobileMenuContext = createContext()

export const MobileMenuProvider = ({ children }) => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const openMobileMenu = () => setMobileMenu(true)
  const closeMobileMenu = () => setMobileMenu(false)

  return (
    <MobileMenuContext.Provider value={{ mobileMenu, openMobileMenu, closeMobileMenu }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export const useMobileMenu = () => useContext(MobileMenuContext)