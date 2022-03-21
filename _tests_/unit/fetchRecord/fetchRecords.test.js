// @ts-nocheck
/* eslint-disable no-undef */
'use strict'

const data = require('./mock/request')
const mainFunc = require('../../../src/services/records')

describe('Testing Fetch Record', () => {


  const mockAggregate = jest.fn();
  jest.mock('../../../src/repositories/records', () => ({
    AggregateFunc: jest.fn().mockImplementation(() => ({
      aggregate: mockAggregate,
    })),
  }));
  jest.mock('../../../src/repositories/records', () => ({ AggregateFunc: jest.fn() }));

  it('Should Fail if request body is missing any required params', async () => {
    const expectedResult = {
      message: 'StartDate is required'
    }
    try {
      const body = data.invalidPayload
      const result = await mainFunc.fetchRecords(body)
      expect(JSON.parse(result)).toEqual(expectedResult);
    } catch (error) {
      expect(error).toEqual(expectedResult);
    }
  })

  it('Should Pass', async () => {
    mockAggregate.mockReturnValue([]);
    const expectedResult = []
    try {
      const body = data.validPayload
      const result = await mainFunc.fetchRecords(body)
      expect(JSON.parse(result)).toEqual(expectedResult);
    } catch (error) {
      expect(error).toEqual(expectedResult);
    }
  })
})