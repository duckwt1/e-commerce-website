import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { endpointBE } from "../utils/Constant";

const ResetPassword: React.FC = () => {
    const { code } = useParams(); // Get the activation code from the URL
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isCodeValid, setIsCodeValid] = useState(false); // Check if the code is valid
    const [notifications, setNotifications] = useState(""); // Error or success message

    useEffect(() => {
        if (code) {
            verifyActivationCode();
        }
    }, [code]);

    const verifyActivationCode = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${endpointBE}/auth/reset-password?code=${code}`, {
                method: "POST", // Method can be GET/POST based on the backend implementation
            });

            if (response.ok) {
                // If the code is valid
                setIsCodeValid(true);
                setNotifications("The activation code is valid. You can now reset your password.");
            } else {
                // If the code is invalid
                const errorText = await response.text();
                setIsCodeValid(false);
                setNotifications(errorText || "Invalid activation code.");
            }
        } catch (error) {
            setIsCodeValid(false);
            setNotifications("Connection error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div>
                <div className="container bg-light my-3 rounded-3 p-4">
                    <h1 className="text-center text-black">RESET PASSWORD</h1>
                    <div className="d-flex align-items-center justify-content-center flex-column p-5">
                        <h2>Checking the activation code...</h2>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="container bg-light my-3 rounded-3 p-4">
                    <h1 className="text-center text-black">RESET PASSWORD</h1>
                    <div className="d-flex align-items-center justify-content-center flex-column p-5">
                        {isCodeValid ? (
                            <>
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/order_status/ico_successV2.svg?q=10311"
                                    alt="success"
                                />
                                <h2 className="my-3 text-success">{notifications}</h2>
                                <Link to={`/change-password?code=${code}`}>
                                    <Button variant="contained" className="my-3">
                                        Set a New Password
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <img
                                    src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png"
                                    alt="fail"
                                    width={150}
                                />
                                <h2 className="my-3 text-danger">
                                    Verification failed. Error: {notifications}
                                </h2>
                                <Link to="/forgot-password">
                                    <Button variant="contained" className="my-3" color="error">
                                        Try Again
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default ResetPassword;
