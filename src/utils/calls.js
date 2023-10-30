import { apiCall, apiCallFormData, apiCallDownloadAvatar } from "@utils/http";
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
                window.location.href = "/dashboard";
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

export async function getUsers() {
    var users = null;
    if (getToken !== null) {
        await apiCall("get", "users")
        .then(response => {
            if (response.data) {
                users = response.data;
            } else if (response.error) {
                throw new Error("Error getUsers(): ", response.error);
                //return response.error;
            } else {
                console.log("Error getMe(): ", response);
                throw new Error("Somthing terribly went wrong in getUsers().");
                //return response.error;
            }
        });
        return users;
    } else {
        return null;
    }
}

export async function getUserSpecific(params) {
    var user = null;
    if (getToken !== null) {
        await apiCall("get", `users/${params}`)
        .then(response => {
            if (response.data) {
                user = response.data;
            } else if (response.error) {
                throw new Error("Error getUsers(): ", response.error);
                //return response.error;
            } else {
                console.log("Error getMe(): ", response);
                throw new Error("Somthing terribly went wrong in getUsers().");
                //return response.error;
            }
        });
        return user;
    } else {
        return null;
    }
}

export async function editUser(params) {
    console.log("params: ", params);
    var success = false;
    if (getToken !== null) {
        await apiCallFormData("put", `users/${params.id}`, params)
        .then(response => {
            if (response.data) {
                success = true;
            }
        })
        .catch(
            err => {
                console.log("ERROR EDITING USER");
            }
        )
        ;
        return success;
    } else {
        return success;
    }
}

export async function addUser(params) {
    console.log("params: ", params);
    var success = false;
    if (getToken !== null) {
        await apiCallFormData("post", `users`, params)
        .then(response => {
            if (response.data) {
                success = true;
            }
        })
        .catch(
            err => {
                console.log("ERROR ADDING USER");
            }
        )
        ;
        return success;
    } else {
        return success;
    }
}

export async function deleteOneUser(params) {
    console.log("params: ", params);
    var success = false;
    if (getToken !== null) {
        await apiCall("delete", `users/${params}`)
        .then(response => {
            if (response.data) {
                success = true;
            }
        })
        .catch(
            err => {
                console.log("ERROR DELETING USER");
            }
        )
        ;
        return success;
    } else {
        return success;
    }
}

export async function deleteManyUsers(params) {
    console.log("params: ", params);
    var success = false;
    if (getToken !== null) {
        await apiCall("delete", `users`, params)
        .then(response => {
            if (response.data) {
                success = true;
            }
        })
        .catch(
            err => {
                console.log("ERROR DELETING USER");
            }
        )
        ;
        return success;
    } else {
        return success;
    }
}

export async function getUserAvatar(params) {
    var avatar = null;
    if (getToken !== null) {
        await apiCallDownloadAvatar("get", params)
        .then(response => {
            if (response) {
                avatar = URL.createObjectURL(response);
            } else if (response.error) {
                throw new Error("Error getUserAvatar(): ", response.error);
                //return response.error;
            } else {
                console.log("Error getUserAvatar(): ", response);
                throw new Error("Somthing terribly went wrong in getUserAvatar().");
                //return response.error;
            }
        });
        return avatar;
    } else {
        return null;
    }
}