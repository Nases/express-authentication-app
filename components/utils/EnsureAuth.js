import { useEffect } from 'react'
import { useUser } from '../../contexts/UserProvider/UserProvider'
import Router from 'next/router'


const EnsureAuth = ({ children, roleIdRequired = [1] }) => {
  const userData = useUser()

  const isAuth = userData.isAuth
  const isLoading = userData.isLoading
  const roleId = userData.data.roleId

  console.log(roleId)

  const redirectNonAuth = () => {
    if (!isAuth || !roleIdRequired.includes(roleId)) {
      Router.push('/')
    }
  }

  useEffect(() => {
    if (!isLoading) redirectNonAuth()
  }, [isLoading])

  return (
    <>
      {isAuth && children}
    </>
  )
}

export default EnsureAuth