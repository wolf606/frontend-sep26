import {
    API_URL,
    API_DOWNLOADS
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

    if (method !== "get") {
        options.body = JSON.stringify(data);
    }
    
    return await fetch(`${baseUrl}/${url}`, options)
    .then(response => {
        return response.json();
    });
}

export async function apiCallDownloadAvatar(method, url){
    const token = localStorage.getItem('token');

    const options = {
        method: method,
        mode: "cors",
        headers: {
            'Authorization': !token ? null : token,
        },
    }
    
    return await fetch(url, options)
    .then(response => {
        return response.blob();
    });
}

export async function apiCallFormData(method, url, data={}){
    const token = localStorage.getItem('token');
    const newFormData = objectToFormData(data);

    const options = {
        method: method,
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Authorization': !token ? null : token,
        },
        body: newFormData,
    }
    
    return await fetch(`${baseUrl}/${url}`, options)
    .then(response => {
        return response.json();
    });
}

function objectToFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }

    return formData;
}