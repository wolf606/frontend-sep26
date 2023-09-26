import {
    API_URL
} from "@utils/routes";
const baseUrl = API_URL;

export async function apiCall(method, url, data={}){
    const token = localStorage.getItem('token');

    const options = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': !token ? null : token,
        },
    }

    if (method === "post" || method === "put") {
        if (data != {}) {
            options.body = JSON.stringify(data);
        }
    }
    
    return await fetch(`${baseUrl}/${url}`, options)
    .then(response => {
        return response.json();
    });
}