import axios from 'axios';

const api = axios.create({
  baseURL: '/api/circles/',
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

  static update(id, args) {
    return api.put(`${id}/`, args)
      .then(({ data: circle }) => circle);
  }

  static delete(id) {
    return api.delete(`${id}/`);
  }

  static getBudget(circleId) {
    return api.get(`${circleId}/budget/`)
      .then(({ data: budget}) => budget);
  }

  static setBudget(circleId, fields) {
    return api.post(`${circleId}/set_budget/`, { fields })
      .then(({ data: budget }) => budget);
  }

  static getStudents(circleId) {
    return api.get(`${circleId}/students/`)
      .then(({ data: students }) => students);
  }

  static setStudents(circleId, students) {
    return api.post(`${circleId}/set_students/`, { students })
      .then(({ data: students }) => students);
  }
}

export default Circle;
