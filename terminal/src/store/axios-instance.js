import axios from 'axios';

const siteAddress = window.location.href.substring(0, window.location.href.length - "3006/".length) // Example: http://localhost:3006/ or http://192.168.0.10:3006/
const instance = axios.create({
    baseURL: siteAddress + `${process.env.PORT || 3000}/graphql`,
    // baseURL: 'https://cryptic-springs-39644.herokuapp.com:3000/graphql',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
