import { ACCESS_TOKEN_KEY } from "consts";

export const getAccessToken = () => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) return JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY))._accessToken
    return ''
}

const fetcher = (...args) => {
    return fetch(...args, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    }).then(res => res.json())
};

export default fetcher;