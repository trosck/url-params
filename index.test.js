const { expect, test } = require('@jest/globals')
const URLParams = require('./index')

const [name, value] = ['hello', 'world']

const exampleURL = 'https://example.com/'
const exampleWithParams = `${exampleURL}?${name}=${value}`

const getExample = () => new URLParams(exampleURL)
const getExampleWithParams = () => new URLParams(exampleWithParams)

// set

test(
  'set(name, value)',
  () => {
    expect(
      getExample()
        .set(name, value)
        .toString()
    )
      .toBe(exampleWithParams)
  }
)

test(
  'set({ name: value })',
  () => {
    expect(
      getExample()
        .set({ [name]: value })
        .toString()
    )
      .toBe(exampleWithParams)
  }
)

test(
  'set({ name: null })',
  () => {
    expect(
      getExample()
        .set({ [name]: null })
        .toString()
    )
      .toBe(exampleURL)
  }
)

// append

test(
  'append(name, value)',
  () => {
    expect(
      getExample()
        .append(name, value)
        .toString()
    )
      .toBe(exampleWithParams)
  }
)

// get

test(
  'get(name)',
  () => {
    expect(
      getExampleWithParams()
        .get(name)
    )
      .toBe(value)
  }
)

// getAll

test(
  'getAll(name)',
  () => {
    expect(
      getExampleWithParams()
        .getAll(name)
    )
      .toEqual([value])
  }
)

// getAllParams

test(
  'getAllParams()',
  () => {
    expect(
      getExampleWithParams()
        .getAllParams()
    )
      .toEqual([[name, value]])
  }
)

// delete

test(
  'delete(name)',
  () => {
    expect(
      getExampleWithParams()
        .delete(name)
        .toString()
    )
      .toBe(
        getExample()
          .toString()
      )
  }
)
