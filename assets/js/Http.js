const DEFAULT_OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'same-origin'
};

export default class Http {

  /**
   * @param url    {String} - url relative internal or absolute external without parameters
   * @param params {Object} - parameters as object with key-value pairs for url parameters
   * @returns {Promise}
   */
  static get(url, params = []) {
    let paramsString = Object.keys(params)
      .reduce((str, current) => `${str}${current}=${params[current]}&`, '?');

    // use no params in url if its length is less than 3 - 3 because we need a `?`(1), char for key(2) and `=`(3)
    if (paramsString.length < 3) paramsString = '';

    return Http._fetch(`${url}${paramsString}`, 'GET');
  }

  static post(url, body) {
    return Http._fetch(url, 'POST', body);
  }

  /**
   * Wrapper of fetch()
   * 1) Adds functionality to fetch() by rejecting any response which is not in 200-299 range.
   * 2) Sends body object jsonized.
   *
   * @param url    {string}
   * @param method {string} - default `GET`
   * @param body   {Object} - payload object
   * @returns {Promise}
   */
  static _fetch(url, method, body) {
    const options = Object.assign({}, DEFAULT_OPTIONS);
    options.method = method;
    options.body = (method === 'GET') ? undefined : JSON.stringify(body);

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => (response.ok) ? resolve(response) : reject(response))
        .catch(response => reject(response));
    });
  }

}


