import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { DisplayEmployee } from '../CreateEmployee.js'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('DisplayEmployee', () => {
  let displayemployee

  beforeEach(() => {
    let employee = {
      id: 1000,
      firstName: 'Testy',
      lastName: 'McUser',
      address: '123 Pine Street, City, MA',
      company: 'Number1 company',
      salary: 100000,
      createdAt: '2018-01-15T02:22:20.626Z',
      updatedAt: '2018-01-15T02:22:20.626Z'
    }
    displayemployee = shallow(<DisplayEmployee employeeData={employee} />)
  })

  it('renders the employees salary', () => {
    expect(
      displayemployee.findWhere(
        n => n.type() === 'p' && n.contains('$100,000.00')
      )
    )

    expect(
      displayemployee.findWhere(
        n => n.type() === 'p' && n.contains('Testy McUser')
      )
    )
  })
})
