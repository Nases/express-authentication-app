import { gql } from '@apollo/client'


export const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    roleId: Int
    email: String
    password: String
    firstName: String
    lastName: String
    address: String
    registrationDate: Date
    passwordLastUpdated: Date
    forgotPasswordToken: String
  }
  type Query {
    login(email: String, password: String): User
    test: User
    getUserData: User
    user(id: String): User
    users(limit: Int, sort: String, skip: Int, email: String): [User]
    countUsers(email: String): Int
    logOut: String
  }
  type Mutation {
    signUp(email: String, password: String, confirmPassword: String): User
    changePassword(currentPassword: String, newPassword: String, confirmNewPassword: String): String
    changeEmail(email: String, password: String): String
    changePersonalInformation(firstName: String, lastName: String): String
  }
`