import axios from 'axios';
import { API_URL } from '../../api-config.json';

export const request = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
});
