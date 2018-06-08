import axios from 'axios';

const api = axios.create({
  baseURL: '/api/circles/'
});

class Circle {
  static get(id) {
    return api.get(`${id}/`)
      .then(({ data: circle }) => circle);
  }

  static getAll() {
    return api.get()
      .then(({ data: circles }) => circles);
  }

  static create(args) {
    return api.post('', args)
      .then(({ data: circle }) => circle);
  }
}

export default Circle;
