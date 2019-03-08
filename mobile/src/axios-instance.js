import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000/graphql',
    baseURL: 'http://192.168.0.15:3000/graphql',
    headers: {
            'Content-Type': 'application/json'
    }
});

export default instance;
