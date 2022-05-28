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
function changeUrl(url, saveState = false) {
  try {
    if (window.history.replaceState && !saveState) {
      window.history.replaceState(null, document.title, url);
    }
    else if (window.history.pushState && saveState) {
      window.history.pushState(null, document.title, url)
    }
    else {
      window.location.href = url
    }
  } catch(e) {}
}

/**
 * Managing URL parameters
 */
class URLParams {
  constructor(url) {
    this._url = url
  }

  get url() {
    try {
      return new URL(this._url || window.location.href)
    } catch(e) {
      return new URL()
    }
  }

  /**
   * Set parameter
   *
   * @param {String} name
   * @param {String|Number} value
   * @param {Boolean} saveState
   *
   * @returns {URLParams}
   */
  set(name, value, saveState = false) {
    this.url.searchParams.set(name, value)
    changeUrl(this.url, saveState)
    return this
  }

  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * @param {String} name
   * @param {any} value
   * @returns {URLParams}
   */
  append(name, value, saveState = false) {
    this.url.searchParams.append(name, value)
    changeUrl(url, saveState)
    return this
  }

  /**
   * Returns the first value associated with the given search parameter
   *
   * @param {String} name
   *
   * @returns {String}
   */
  get(name) {
    return this.url.searchParams.get(name)
  }

  /**
   * Returns all the values associated with a given search parameter
   *
   * @param {String} name
   *
   * @returns {Array<String>} An array of values
   */
  getAll(name) {
    return this.url.searchParams.getAll(name)
  }

  /**
   * Returns all values and parameters in array
   *
   * @returns {Array<Array<String, String>>} an array of arrays like Object.entries
   * with [key, value] structure
   */
  getAllParams() {
    return Array.from(this.url.searchParams.entries())
  }

  /**
   * Deletes the given search parameter
   * and all its associated values,
   * from the list of all search parameters.
   *
   * @param {String} name - The name of the parameter to be deleted.
   * @param {Boolean} saveState
   *
   * @returns {URLParams}
   */
  delete(name, saveState = false) {
    this.url.searchParams.delete(name)
    changeUrl(this.url, saveState)
    return this
  }

  /**
   * Returns a USVString containing the whole URL
   *
   * @returns {String} URL string representation
   */
  toString() {
    return this.url.toString()
  }
}

export default {
  URLParams,
  urlParams: new URLParams()
}
