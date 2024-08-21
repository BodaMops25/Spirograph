const foo = require('./function')

test('function testing', () => {
  expect(foo(5, 5)).toBe(4)
})