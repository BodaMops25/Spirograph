import {calcSpirographCoords} from "./functions.js"
import a from "@jest/globals"

test('spirograph coords from angle function', () => {
  expect(calcSpirographCoords()).toBe({x: 0, y: 0})
})