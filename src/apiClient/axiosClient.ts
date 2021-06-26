import axios from 'axios';
import { URL } from '../constants';

const instance = axios.create({
  baseURL: URL.MOCK_URL,
});

export default instance;
