import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:${process.env.PORT || 3000}/graphql`,
    // baseURL: 'https://cryptic-springs-39644.herokuapp.com:3000/graphql',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
