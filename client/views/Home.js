import React, { Component } from 'react'
import axios from 'axios'
import CreateEmployee from '../components/CreateEmployee.js'
import PayrollCalculator from '../components/PayrollCalculator.js'
require('../styles/Main_Style.css')

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      companies: []
    }
    this.updateCompaniesList = this.updateCompaniesList.bind(this)
  }

  componentDidMount () {
    document.getElementById('root').className = 'show'
    document.getElementById('loader').className = 'delete'

    this.updateCompaniesList()
  }

  updateCompaniesList () {
    axios.get('/api/company').then(res => {
      this.setState({ companies: res.data })
    })
  }

  render () {
    return (
      <div id='home'>
        <p id='title'>PAYROLL CALCULATOR</p>
        <p id='subtitle'>{`A simple tool for tallying a company's payroll`}</p>
        <p id='blurb'>
          {` To get started please fill out the form with all of the employees
          info, for each company. Once complete, you can select the company
          you'd like to view and see it's total payroll expenses.`}
        </p>
        <div id='components'>
          <hr />
          <CreateEmployee updateCompaniesList={this.updateCompaniesList} />
          <hr />
          <PayrollCalculator companies={this.state.companies} />
        </div>
      </div>
    )
  }
}
