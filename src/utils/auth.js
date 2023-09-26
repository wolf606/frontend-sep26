import jwt_decode from "jwt-decode";

export function verifyToken(token) {
    let decoded = null;
    try {
        decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) {
            console.log("Token expired.");
            decoded = null;
        }
    } catch (error) {
        console.log("Invalid token: ", error);
    }
    return decoded;
}

export function getToken() {
    const token = localStorage.getItem("token");
    return token;
}

export async function logOut() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}