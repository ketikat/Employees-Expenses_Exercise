import React, { Component } from 'react'
import axios from 'axios'

export default class PayrollCalculator extends Component {
  constructor () {
    super()
    this.state = {
      selectedCompany: '',
      payroll: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    evt.preventDefault()
    const company = evt.target.value
    axios.get(`/api/payroll/${company}`).then(payrollData => {
      const sum = payrollData.data
      this.setState({ selectedCompany: company, payroll: sum })
    })
  }

  render () {
    let { companies } = this.props
    const optionItems = companies.map(co => (
      <option value={co} key={co}>
        {co}
      </option>
    ))

    return (
      <div className='component-container'>
        <div className='component-left'>
          <div>
            <img className='pic' src='calc2.png' />
            <p className='subheader'>{`Select a Company to view it's Payroll Expenses`}</p>
          </div>
          <form id='select-company'>
            <select
              placeholder='select company from the list'
              name='selectedCompany'
              onChange={this.handleChange}
            >
              {optionItems}
            </select>
          </form>
        </div>
        <div className='component-right'>
          <DisplayPayroll
            companyName={this.state.selectedCompany}
            payroll={this.state.payroll}
          />
        </div>
      </div>
    )
  }
}

export function DisplayPayroll (props) {
  const { payroll } = props
  if (payroll) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    let formattedPayroll = formatter.format(payroll)

    return (
      <div className='display-text'>
        <p className='subheader'>Results:</p>
        <p>
          The total amount &nbsp;
          <u>{props.companyName}</u> is paying yearly for payroll is:
        </p>
        <br />
        <p>{`${formattedPayroll} Dollars`}</p>
      </div>
    )
  } else {
    return <div id='payroll-display' />
  }
}
