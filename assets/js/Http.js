const DEFAULT_OPTIONS = {
  headers: {
		'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'same-origin'
};

export default class Http {

  static post(url, body) {
    return Http._fetch(url, 'POST', body);
  }

  /**
   * Wrapper of fetch()
   * 1) Adds functionality to fetch() by rejecting any response which is not in 200-299 range.
   * 2) Sends body object jsonized.
   *
   * @param url
   * @param method
   * @param body
   * @returns {Promise}
   */
  static _fetch(url, method, body) {
    const options = Object.assign({}, DEFAULT_OPTIONS);
    options.method = method;
    options.body = JSON.stringify(body);

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => (response.ok) ? resolve(response) : reject(response))
        .catch(response => reject(response));
    });
  }

}


