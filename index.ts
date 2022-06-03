/**
 * Update url
 *
 * @param {URL|String} url
 * @param {Boolean} saveState if true - session
 * will be saved in history as new object,
 * else replaced last record
 *
 * @returns {void}
 */
function changeUrl(url: string | URL, saveState = false) {
  const _url = url.toString()

  try {
    if (window.history.replaceState && !saveState) {
      window.history.replaceState(null, document.title, _url);
    }
    else if (window.history.pushState && saveState) {
      window.history.pushState(null, document.title, _url)
    }
    else {
      window.location.href = _url
    }
  } catch(e) {}
}

export interface IURLParams {
  get url(): string

  /**
   * Set parameter
   *
   * @param {String} name
   * @param {String|Number} value
   * @param {Boolean} saveState
   *
   * @returns {URLParams}
   */
  set(
    name: string,
    value: string | number,
    saveState?: boolean
  ): this

  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * @param {String} name
   * @param {any} value
   * @returns {URLParams}
   */
  append(
    name: string,
    value: string | number,
    saveState?: boolean
  ): this

  /**
   * Returns the first value associated with the given search parameter
   *
   * @param {String} name
   *
   * @returns {String}
   */
  get(name: string): string | null

  /**
   * Returns all the values associated with a given search parameter
   *
   * @param {String} name
   *
   * @returns {Array<String>} An array of values
   */
  getAll(name: string): string[]

  /**
   * Returns all values and parameters in array
   *
   * @returns {Array<Array<String, String>>} an array of arrays like Object.entries
   * with [key, value] structure
   */
  getAllParams(): Array<[string, string]>

  /**
   * Deletes the given search parameter
   * and all its associated values,
   * from the list of all search parameters.
   *
   * @param {String} name - The name of the parameter to be deleted.
   * @param {Boolean} saveState
   *
   * @returns {this}
   */
  delete(name: string, saveState?: boolean): this

  /**
   * Returns a USVString containing the whole URL
   *
   * @returns {String} URL string representation
   */
  toString(): string
}

/**
 * Managing URL parameters
 */
export class URLParams implements IURLParams {
  private _url: URL

  constructor(url?: string | URL) {
    this._url = new (URL || window.URL)(url || window.location.href)
  }

  get url() {
    return this.toString()
  }

  set(
    name: string,
    value: string | number,
    saveState = false
  ) {
    this._url.searchParams.set(name, value.toString())
    changeUrl(this._url, saveState)
    return this
  }

  append(
    name: string,
    value: string | number,
    saveState = false
  ) {
    this._url.searchParams.append(name, value.toString())
    changeUrl(this._url, saveState)
    return this
  }

  get(name: string) {
    return this._url.searchParams.get(name)
  }

  getAll(name: string) {
    return this._url.searchParams.getAll(name)
  }

  getAllParams() {
    return Array.from(this._url.searchParams.entries())
  }

  delete(name: string, saveState = false) {
    this._url.searchParams.delete(name)
    changeUrl(this._url, saveState)
    return this
  }

  toString() {
    return this._url.toString()
  }
}

export interface urlParamsType extends IURLParams {
  (url?: string | URL): IURLParams
}

// TODO: remove ts-ignore and fix error
// @ts-ignore
export const urlParams: urlParamsType = new Proxy(
  (url?: string | URL) => new URLParams(url),
  {
    get(target, prop) {
      const key = prop as keyof IURLParams

      if (key in URLParams.prototype) {
        const instance = new URLParams()
        const value = instance[key]

        return typeof value === 'function' ? value.bind(instance) : value
      }
    }
  }
)
