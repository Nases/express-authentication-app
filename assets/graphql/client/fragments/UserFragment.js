import { gql } from '@apollo/client'


const UserFragment = gql`
  fragment userFields on User {
    _id
    role
    email
    password
    firstName
    lastName
    address
    registrationDate
    passwordLastUpdated
    forgotPasswordToken
    facebookID
    googleID
  }
`


export default UserFragment