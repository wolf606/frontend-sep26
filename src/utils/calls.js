import { apiCall } from "@utils/http";
import { verifyToken, getToken } from "@utils/auth"

export async function logIn(values) {
    const loginPayload = {
        email: values.email,
        password: values.password,
    };
    await apiCall("post", "login", loginPayload)
    .then(response => {
        if (response.accessToken) {
            const token = response.accessToken;
            const decoded = verifyToken(token);
            if (decoded !== null) {
                localStorage.setItem("token", token);
                console.log("token: ", getToken());
                //window.location.href = "/dashboard";
                //Remove lines and add them in the sing in website
            } else {
                console.log("Invalid token: ", response);
                throw new Error("Invalid token.");
                //return {error: "token_invalid"};
            }
        } else if (response.error) {
            if (!response.error.active) {
                throw new Error("not_active");
            }
            //return response.error;
        } else {
            console.log("Invalid credentials: ", response);
            throw new Error("Invalid credentials.");
            //return response.error;
        }
    })
}

export async function signUp(values) {
    const payload = {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
    };
    await apiCall("post", "users", payload)
    .then(response => {
        if (response.data) {
            console.log("user created: ", response.data);
            //window.location.href = "/login";
        } else if (response.error) {
            if (!response.error.active) {
                throw new Error("Validations");
            }
        } else {
            console.log("WTF, bruh: ", response);
            throw new Error("Unexpected.");
        }
    })
}

export async function getMe() {
    var me = null;
    if (getToken !== null) {
        await apiCall("get", "users/me")
        .then(response => {
            if (response.data) {
                me = response.data;
            } else if (response.error) {
                throw new Error("Error getMe(): ", response.error);
                //return response.error;
            } else {
                console.log("Error getMe(): ", response);
                throw new Error("Somthing terribly went wrong in getMe().");
                //return response.error;
            }
        });
        return me;
    } else {
        return null;
    }
}