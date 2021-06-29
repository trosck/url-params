/**
 * Managing URL parameters
 */
class URLParams {
  constructor(url) {
    this.url = new URL(url)
  }

  /**
   * Add/delete parameter
   *
   * @param {String} name
   * @param {String|Number} value
   * @param {Boolean} saveState
   *
   * @returns {void}
   */
  set(name, value, saveState) {
    this.url.searchParams.set(name, value)
    this._changeUrl(saveState)
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
  delete(name, saveState) {
    this.url.searchParams.delete(name)
    this._changeUrl(saveState)
  }

  /**
   * Update url
   *
   * @param {Boolean} saveState if true - session will saved in history
   * as new object, else replace last record
   *
   * @returns {void}
   */
  _changeUrl(saveState = false) {
    try {
      if (window.history.replaceState && !saveState) {
        // prevents browser from storing history
        window.history.replaceState(name, document.title, this.url);
      }
      else if (window.history.pushState && saveState) {
        window.history.pushState(name, document.title, this.url)
      }
      else {
        window.location.href = this.url.toString()
      }
    } catch(e) {}
  }
}

export default URLParams
