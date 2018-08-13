import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Home } from '../Home.js'
import { PayrollCalculator } from '../../components/PayrollCalculator.js'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Initial axios request in Home page', () => {
  let mockAxios

  const initialState = { companies: [] }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.restore()
  })

  describe('Companies List', () => {
    it('gets the list of all companies', () => {
      const fakecompanies = ['company 1', 'company 2', 'company 3']
      mockAxios.onGet('/api/company').reply(200, fakecompanies)

      axios.get('/api/company').then(response => {
        expect(response.data[0]).to.be.deep.equal('company 1')
      })

      // axios.get('/api/company')
      // .then(response => {

      //   const PC = shallow(<PayrollCalculator companies={response.companies} />)

      // expect(PC).findWhere(
      //   n => n.type() === 'select' && n.contains('company 1')
      // )
      // })

      // PC.state()).to.have.property('companies', true)
    })
  })
})
