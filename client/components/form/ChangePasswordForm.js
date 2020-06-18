import { Formik, Form, Field, ErrorMessage } from 'formik'
import Input from './partials/Input'
import Label from './partials/Label'
import FormErrorMessage from './partials/FormErrorMessage'
import Button from './partials/Button'
import { ChangePasswordSchema } from '../../assets/validation/schemas'
import userUtils from '../../assets/userUtils'
import { useUser, useDispatchUser } from '../../contexts/UserProvider/UserProvider'
import { useAuthModal, useDispatchAuthModal } from '../../contexts/AuthModalProvider/AuthModalProvider'
import Router from 'next/router'


const ChangePassword = ({ closeAltMenu }) => {
  const dispatchUserData = useDispatchUser()
  const dispatchAuthModal = useDispatchAuthModal()


  return (
    <div>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
          serverError: ''
        }}
        validateOnBlur={false}
        validationSchema={ChangePasswordSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          userUtils.changePassword(values.currentPassword, values.newPassword, values.confirmNewPassword)
            .then(response => {
              // dispatchUserData({
              //   type: 'LOGIN',
              //   userData: response.data
              // })
              // dispatchAuthModal({
              //   type: 'CLOSE_SIGN_UP_MODAL'
              // })
              // Router.push('/dashboard')
              console.log(response)
              setSubmitting(false)
            })
            .catch((error) => {
              console.log(error)
              // dispatchUserData({
              //   type: 'SET_IS_LOADING_FALSE'
              // })
              setFieldError('serverError', error.response.data)
              setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <ErrorMessage name="serverError" component={FormErrorMessage} />
            <div className='md:grid md:grid-cols-6 md:gap-4 mb-3'>
              <div className='col-span-1 text-common text-sm'>
                <Label htmlFor="currentPassword">Current Password</Label>
              </div>
              <div className='col-span-5 text-common'>
                <Field id='currentPassword' type="password" name="currentPassword" placeholder='Enter current password' as={Input} />
                <ErrorMessage name="currentPassword" component={FormErrorMessage} />
              </div>
            </div>
            <div className='md:grid md:grid-cols-6 md:gap-4 mb-3'>
              <div className='col-span-1 text-common text-sm'>
                <Label htmlFor="newPassword">New Password</Label>
              </div>
              <div className='col-span-5 text-common'>
                <Field id='newPassword' type="password" name="newPassword" placeholder='Enter new password' as={Input} />
                <ErrorMessage name="newPassword" component={FormErrorMessage} />
              </div>
            </div>
            <div className='md:grid md:grid-cols-6 md:gap-4'>
              <div className='col-span-1 text-common text-sm'>
                <Label htmlFor="confirmNewPassword">Confirm password</Label>
              </div>
              <div className='col-span-5 text-common'>
                <Field id='confirmNewPassword' type="password" name="confirmNewPassword" placeholder='Re-enter new password' as={Input} />
                <ErrorMessage name="confirmNewPassword" component={FormErrorMessage} />
              </div>
            </div>
            <div className='md:grid md:grid-cols-6 md:gap-4'>
              <div className='col-start-2'>
                <Button type="submit" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </div>
              <div>
                <Button onClick={closeAltMenu} secondary={true}>
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}






export default ChangePassword