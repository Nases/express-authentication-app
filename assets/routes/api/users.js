const User = require('../../models/User')
var router = require('express').Router()
const yup = require('yup')
const { calculateEarlierDate } = require('../../utils/calculations')


router.post('/', (req, res, next) => {
  var { limit, sort, skip, email } = req.query

  const schema = yup.object().shape({
    limit: yup
      .number()
      .min(1, 'Limit must be at least 1')
      .max(1000, 'Limit can be maximum 1000'),
    sort: yup
      .string()
      .matches(/(asc|desc)/, { excludeEmptyString: true }),
    skip: yup
      .number()
      .min(0, 'Skip must be at least 0')
      .max(99999999, 'Skip can be maximum 99999999'),
    email: yup
      .string()
      .min(0, 'Email must be at least 1 characters long')
      .max(200, 'Email can be maximum 200 characters long'),
  })

  schema.validate({
    limit: limit,
    sort: sort,
    skip: skip,
    email: email
  })
    .then(values => {
      User.find(email ? { email: { $regex: email, $options: "i" } } : {})
        .sort({ _id: (sort === 'asc' ? -1 : 1) })
        .skip(values.skip || 0)
        .limit(values.limit || 20)
        .then(value => res.send(value))
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err.errors))
})

router.post('/count', (req, res) => {
  User.countDocuments()
    .then(value => res.send(String(value)))
    .catch(err => res.send(err))
})

const lastDaysAllowed = [7, 30, 60, 180, 360]

lastDaysAllowed.map(value => {
  return (
    router.post(`/count/last-${value}-days`, (req, res) => {
      User.countDocuments({
        registrationDate: {
          $gte: calculateEarlierDate(value)
        }
      }, (err, count) => { res.send(count.toString()) })
    })
  )
})


module.exports = router