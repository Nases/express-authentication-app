import { useState, useEffect } from 'react'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import Link from 'next/link'
import axios from 'axios'
import companyInfo from '../../assets/company-info'

const UserDetails = ({ id }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    user || axios.post(companyInfo.serverURI + `user?id=${id}`)
      .then(value => setUser(value.data[0]))
      .catch(err => console.log(err))
  }, [user])


  const UserDetailsRow = ({ title, value }) => {
    return (
      <div className="px-4 py-5 sm:p-0 border-b border-gray-200">
        <dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              {title}
            </dt>
            <dd className={`mt-1 text-sm leading-5 ${value ? 'text-gray-900' : 'text-gray-400'} sm:mt-0 sm:col-span-2`}>
              {value || 'Unknown'}
            </dd>
          </div>
        </dl>
      </div>
    )
  }


  return (
    user ?
      <>
        <div className="mb-1">
          <Button className='pt-0 pb-0' color='link'>
            <Link href='/admin/users'>
              <a>
                <i aria-hidden className="fas fa-long-arrow-alt-left"></i>
                {' '}
              Back
            </a>
            </Link>
          </Button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {user.email}
              {' '}
              <Badge color='green'>
                Customer
              </Badge>
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
              User ID: {user._id}
            </p>
          </div>
          <UserDetailsRow title={'First name'} value={user.firstName} />
          <UserDetailsRow title={'Last name'} value={user.lastName} />
        </div>
      </> : 'Something went wrong, please try again later.'
  )
}

export default UserDetails