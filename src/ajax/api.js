import api from './index'
const base_url = 'https://www.easy-mock.com/mock/5afbeb92f4cccf131049507b/mock';

export const getHome = () => api.get(`${base_url}/home`);
