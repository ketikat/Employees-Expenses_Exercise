import React, { Component } from 'react'
import axios from 'axios'

export default class CreateEmployee extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formdata: {
        firstName: '',
        lastName: '',
        address: '',
        company: '',
        salary: ''
      },
      blurred: {
        firstName: false,
        lastName: false,
        company: false,
        salary: false
      },
      createdEmployee: {}
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formatInt = this.formatInt.bind(this)
  }

  get initialFormState () {
    return {
      firstName: '',
      lastName: '',
      address: '',
      company: '',
      salary: ''
    }
  }

  get unBlurredForm () {
    return {
      firstName: false,
      lastName: false,
      company: false,
      salary: false
    }
  }

  handleChange (evt) {
    evt.preventDefault()
    const formdata = { ...this.state.formdata }
    formdata[evt.target.name] = evt.target.value
    this.setState({ formdata })
  }

  handleBlur (field) {
    const blurred = { ...this.state.blurred }
    blurred[field] = true
    this.setState({ blurred })
  }

  formatInt (float) {
    return Math.round(float)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const stateData = this.state.formdata
    const intSalary = this.formatInt(this.state.formdata.salary)
    stateData.salary = intSalary

    axios
      .post('/api/employee', stateData)
      .then(json => {
        return json.data
      })
      .then(createdEmployee => {
        this.setState({
          formdata: this.initialFormState,
          blurred: this.unBlurredForm,
          createdEmployee: createdEmployee
        })
      })
      .then(() => {
        this.props.updateCompaniesList()
      })
      .catch(error => console.log(error))
  }

  render () {
    const errors = validate(
      this.state.formdata.firstName,
      this.state.formdata.lastName,
      this.state.formdata.company,
      this.state.formdata.salary
    )
    const shouldMarkError = field => {
      const hasError = errors[field]
      const shouldShow = this.state.blurred[field]
      return hasError ? shouldShow : false
    }

    const isDisabled = !Object.keys(errors).some(err => errors[err])

    return (
      <div className='component-container'>
        <div className='component-left'>
          <div>
            <img className='pic' src='employees2.png' />
            <p className='subheader'>{`Add an Employee's Payroll to Company Expenses`}</p>
          </div>
          <br />
          <form id='employee-form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label>First Name :</label>
              <input
                onChange={this.handleChange}
                onBlur={this.handleBlur.bind(null, 'firstName')}
                value={this.state.formdata.firstName}
                type='text'
                name='firstName'
                placeholder="employee's first name"
              />
              {shouldMarkError('firstName') && (
                <p className='error'>First name is required</p>
              )}
            </div>
            <div className='form-group'>
              <label>Last Name :</label>
              <input
                onChange={this.handleChange}
                onBlur={this.handleBlur.bind(null, 'lastName')}
                value={this.state.formdata.lastName}
                type='text'
                name='lastName'
                placeholder="employee's last name"
              />
              {shouldMarkError('lastName') && (
                <p className='error'>Last is required</p>
              )}
            </div>

            <div className='form-group'>
              <label>Address :</label>
              <input
                onChange={this.handleChange}
                value={this.state.formdata.address}
                type='text'
                name='address'
                placeholder="employee's address (optional)"
              />
            </div>
            <div className='form-group'>
              <label>Company :</label>
              <input
                onChange={this.handleChange}
                onBlur={this.handleBlur.bind(null, 'company')}
                value={this.state.formdata.company}
                type='text'
                name='company'
                placeholder="employee's place of work"
              />
              {shouldMarkError('company') && (
                <p className='error'>Company is required</p>
              )}
            </div>
            <div className='form-group'>
              <label>Salary :</label>
              <input
                onChange={this.handleChange}
                onBlur={this.handleBlur.bind(null, 'salary')}
                value={this.state.formdata.salary}
                type='number'
                name='salary'
                placeholder='annual salary in whole dollars'
              />
              {shouldMarkError('salary') && (
                <p className='error'>
                  Salary is required, and must be greater than zero!
                </p>
              )}
            </div>

            <button disabled={!isDisabled} type='submit'>
              Add Employee Info
            </button>
          </form>
        </div>

        <div className='component-right'>
          <DisplayEmployee employeeData={this.state.createdEmployee} />
        </div>
      </div>
    )
  }
}

function validate (firstName, lastName, company, salary) {
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    company: company.length === 0,
    salary: salary <= 0
  }
}

export function DisplayEmployee (props) {
  const { employeeData } = props

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  let formattedSalary
  if (employeeData.salary) {
    formattedSalary = formatter.format(employeeData.salary)
  }

  if (employeeData.firstName) {
    return (
      <div className='display-text'>
        <p className='subheader'>Employee Added:</p>
        <p>
          {`Great! You've just added ${employeeData.firstName} ${
            employeeData.lastName
          }'s ${formattedSalary} yearly salary to ${
            employeeData.company
          }'s payroll expenses.`}
        </p>
        <br />
        <br />
        <p
        >{`Add more employees or check the company's payroll expense below.`}</p>
      </div>
    )
  } else {
    return null
  }
}
