import { apiCall } from "@utils/http";
import { verifyToken } from "@utils/auth"

export async function logIn(values) {
    const loginPayload = {
        email: values.email,
        password: values.password,
    };
    await apiCall("post", "/login", loginPayload)
    .then(response => {
        if (response.accessToken) {
            const token = response.accessToken;
            const decoded = verifyToken(token);
            if (decoded !== null) {
                localStorage.setItem("token", token);
                window.location.href = "/login";
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

