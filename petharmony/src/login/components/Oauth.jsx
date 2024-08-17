import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Oauth() {
    const navigate = useNavigate();
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = `http://localhost:3000/oauth`;
    const code = new URL(window.location.href).searchParams.get("code");

    const getCode = async () => {
        try {
            console.log("Getting authorization code:", code);
            const response = await axios.post('https://kauth.kakao.com/oauth/token', {
                    grant_type: "authorization_code",
                    client_id: REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: code,
                }, {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );
            console.log("Token response:", response);
            return response;
        } catch (error) {
            console.error("Error during token request:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (code) {
            getCode()
                .then(response => {
                    if (response && response.data.access_token) {
                        return axios.post("http://localhost:8080/api/public/kakao", {
                            accessToken: response.data.access_token
                        });
                    } else {
                        throw new Error("No access token received");
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        navigate("/");
                    } else {
                        throw new Error("Failed to log in with Kakao");
                    }
                })
                .catch(err => console.error("Error:", err));
        }
    }, [code]);

    return <></>;
}

export default Oauth;