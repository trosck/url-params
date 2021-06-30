/**
 * Update url
 *
 * @param {URL|String} url
 * @param {Boolean} saveState if true - session will saved in history
 * as new object, else replace last record
 *
 * @returns {void}
 */
function changeUrl(url, saveState = false) {
  try {
    if (window.history.replaceState && !saveState) {
      // prevents browser from storing history
      window.history.replaceState(name, document.title, url);
    }
    else if (window.history.pushState && saveState) {
      window.history.pushState(name, document.title, url)
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
    this.url = new URL(url)
  }

  /**
   * Set parameter
   *
   * @param {String} name
   * @param {String|Number} value
   * @param {Boolean} saveState
   *
   * @returns {void}
   */
  set(name, value, saveState = false) {
    this.url.searchParams.set(name, value)
    changeUrl(this.url, saveState)
  }

  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * @param {String} name
   * @param {any} value
   * @returns {void}
   */
  append(name, value) {
    this.url.searchParams.append(name, value)
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
   * @returns {void}
   */
  delete(name, saveState = false) {
    this.url.searchParams.delete(name)
    changeUrl(this.url, saveState)
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

export default URLParams
