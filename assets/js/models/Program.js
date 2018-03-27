import axios from 'axios';
import Student from './Student';

const apiPrograms = axios.create({
  baseURL: '/api/programs/'
});

class Program {
  static get(id) {
    return apiPrograms.get(`${id}/`)
      .then(({ data: program }) => program);
  }

  static getAll() {
    return apiPrograms.get()
      .then(({ data: programs }) => programs);
  }

  static create(args) {
    return apiPrograms.post('', args)
      .then(({ data: program }) => program);
  }

  static getStudents(programId) {
    return Student.getAll({ program_id: programId });
  }
}

export default Program;
