import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { DisplayPayroll } from '../PayrollCalculator.js'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('PayrollCalculator', () => {
  let displayemployee

  beforeEach(() => {
    let payrolldata = {
      companyName: 'Yummy Pizza',
      payroll: 123456
    }
    displayemployee = shallow(<DisplayPayroll companyName={payrolldata.companyName} payroll={payrolldata.payroll} />)
  })

  it('renders the company name and annual payroll', () => {
    expect(
      displayemployee.findWhere(
        n => n.type() === 'p' && n.contains('Yummy Pizza')
      )
    )

    expect(
      displayemployee.findWhere(
        n => n.type() === 'p' && n.contains('$123,456.00')
      )
    )
  })
})
