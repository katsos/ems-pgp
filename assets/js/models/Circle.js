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

  static getBudget(circleId) {
    return api.get(`${circleId}/budget/`)
      .then(({ data: budget}) => budget);
  }

  static setBudget(circleId, fields) {
    return api.post(`${circleId}/set_budget/`, { fields })
      .then(({ data: budget }) => budget);
  }

  static setStudents(circleId, students) {
    return api.post(`${circleId}/students/`, { students })
      .then(({ data: students }) => students);
  }
}

export default Circle;
