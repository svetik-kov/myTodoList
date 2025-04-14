import axios from 'axios'

const apiKey = 'd6bc0b83-a577-4487-b595-76b3b19411d1'
const token = '01addfeb-40fd-4d38-8c6a-703e2d76112e'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})