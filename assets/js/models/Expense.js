import axios from 'axios';

const api = axios.create({
  baseURL: '/api/expenses/'
});

class Expense {
  static create(args) {
    return api.post('', args)
      .then(({ data: expense }) => expense);
  }
}

export default Expense;
