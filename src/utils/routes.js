const API_VERSION = "v1";
const API_IP = "localhost";
const API_PORT = "3977";

const API_URL = `http://${API_IP}:${API_PORT}/api/${API_VERSION}`;
const API_DOWNLOADS = `http://${API_IP}:${API_PORT}/uploads`;

module.exports = { 
    API_URL: API_URL,
    API_DOWNLOADS: API_DOWNLOADS,
    API_ROUTES: {
        AUTH: `${API_URL}/login`,
        SIGNUP: `${API_URL}/users`,
    }
};