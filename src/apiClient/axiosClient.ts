import axios from 'axios';
import { MOCK_URL } from '../constants';

const instance = axios.create({
  baseURL: MOCK_URL,
});

export default instance;
