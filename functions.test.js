import {calcSpirographCoords} from "./functions.js"
import {jest} from '@jest/globals'

test('spirograph coords from angle function', () => {
  // expect(calcSpirographCoords({r: 1, R: 0, d: 0, angle: 0})).toEqual({ x: -1, y: -0 })

  const mock = jest.fn(calcSpirographCoords)

  expect(mock({r: 1, R: 0, d: 0, angle: 0})).toEqual({x: -1, y: -0})
  expect(mock).toHaveBeenCalledWith({r: 1, R: 0, d: 0, angle: 0})
})