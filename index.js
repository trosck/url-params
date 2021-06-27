/**
 * Управление параметрами URL
 */
class URLParams {
  constructor(url) {
    this.url = new URL(url)
  }

  /**
   * Добавление/обновление параметра
   *
   * @param {String} name название параметра
   * @param {String|Number} value значение параметра
   * @param {Boolean} saveState
   */
  set(name, value, saveState) {
    this.url.searchParams.set(name, value)
    this._changeUrl(saveState)
  }

  /**
   * Получить значение параметра
   *
   * @param {String} name название параметра
   * @returns {String} значение параметра
   */
  get(name) {
    return this.url.searchParams.get(name)
  }

  /**
   * Получить все значения параметра
   *
   * @param {String} name 
   * @returns {Array<String>} массив значений параметра
   */
  getAll(name) {
    return this.url.searchParams.getAll(name)
  }

  /**
   * Получение всех параметров с их значениями
   *
   * @returns {Array} массив массивов "ключ, значение" как Object.entries
   */
  getAllParams() {
    return Array.from(this.url.searchParams.entries())
  }

  /**
   * Удаление параметра
   *
   * @param {String} name название параметра
   * @param {Boolean} saveState сохранение состояния
   */
  delete(name, saveState) {
    this.url.searchParams.delete(name)
    this._changeUrl(saveState)
  }

  /**
   * Обновляет url
   *
   * @param {Boolean} saveState сохранение состояния
   */
  _changeUrl(saveState = false) {
    try {
      if (window.history.replaceState && !saveState) {
        //prevents browser from storing history
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
