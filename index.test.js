import { URLParams, urlParams } from './index.js'

const [name, value] = ['hello', 'world']

const exampleURL = 'https://example.com/'
const exampleWithParams = `${exampleURL}?${name}=${value}`
const exampleWithTwoParams = `${exampleWithParams}&${name}=${value}`

global.window = {
  location: {
    href: exampleURL
  }
}

describe(
  'new URLParams()',
  () => testAllFunctions(new URLParams())
)

describe(
  'new URLParams(url)',
  () => testAllFunctions(new URLParams(exampleURL))
)

describe(
  'urlParams()',
  () => testAllFunctions(urlParams())
)

describe(
  'urlParams(url)',
  () => testAllFunctions(urlParams(exampleURL))
)

function testAllFunctions(instance) {
  it(
    'has url property',
    () => expect(instance.url).toBe(exampleURL)
  )

  it(
    'set query param',
    () => expect(instance.set(name, value).url).toBe(exampleWithParams)
  )

  it(
    'return value of query param',
    () => expect(instance.get(name)).toBe(value)
  )

  it(
    'append query param',
    () => expect(instance.append(name, value).url).toBe(exampleWithTwoParams)
  )

  it(
    'returns all values of query param',
    () => expect(instance.getAll(name)).toEqual([value, value])
  )

  it(
    'returns all query params in two dimensional array',
    () => expect(instance.getAllParams()).toEqual([[name, value], [name, value]])
  )

  it(
    'delete query param',
    () => expect(instance.delete(name).url).toBe(exampleURL)
  )
}
