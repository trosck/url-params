import { URLParams, urlParams } from './index'

const [name, value] = ['hello', 'world']

const exampleURL = 'https://example.com/'
const exampleWithParams = `${exampleURL}?${name}=${value}`
const exampleWithTwoParams = `${exampleWithParams}&${name}=${value}`

global.window = Object.create(global.window || {});
Object.defineProperty(window, 'location', {
  value: {
    href: exampleURL
  }
})

/**
 * testing class without params
 */
describe(
  'new URLParams()',
  () => testAllFunctions(new URLParams())
)

/**
 * testing class wit params
 */
describe(
  'new URLParams(url)',
  () => testAllFunctions(new URLParams(exampleURL))
)

/**
 * testing function without params
 */
describe(
  'urlParams()',
  () => testAllFunctions(urlParams())
)

/**
 * testing function with params
 */
describe(
  'urlParams(url)',
  () => testAllFunctions(urlParams(exampleURL))
)

/**
 * testing urlParams proxy
 */
//  describe(
//   'urlParams()',
//   () => testStateless(urlParams)
// )

/**
 * testing all functional
 */
function testAllFunctions(instance: URLParams) {

  testStateless(instance)

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

/**
 * test stateless functional
 */
function testStateless(instance: URLParams) {
  it(
    'has url property',
    () => expect(instance.url).toBe(exampleURL)
  )

  it(
    'set query param',
    () => expect(instance.set(name, value).url).toBe(exampleWithParams)
  )
}
