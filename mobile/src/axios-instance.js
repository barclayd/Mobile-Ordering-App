import axios from 'axios';

const instance = axios.create({
    baseURL: `https://powerful-stream-57309.herokuapp.com/graphql`,
    headers: {
            'Content-Type': 'application/json'
    }
});

export default instance;
