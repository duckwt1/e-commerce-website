import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import "./../../css/register.css";
import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";

const ChangePasswordPage: React.FC = () => {
    const navigation = useNavigate();

    // State for form inputs
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const code = new URLSearchParams(window.location.search).get("code") || "";

    // State for error messages
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    // State for loading button
    const [statusBtn, setStatusBtn] = useState(false);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatusBtn(true);
        setErrorNewPassword("");
        setErrorConfirmPassword("");

        // Validate passwords
        const isPasswordValid = validatePassword();
        const doPasswordsMatch = checkPasswordsMatch();

        console.log(code + " " + password + " " + confirmPassword);

        if (isPasswordValid && doPasswordsMatch) {
            try {
                const endpoint = endpointBE + "/auth/change-password?code=" + code;

                const response = await toast.promise(
                    fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: password,
                    }),
                    { pending: "Changing your password..." }
                );

                if (response.ok) {
                    toast.success("Password changed successfully.");
                    navigation("/login");
                } else {
                    const errorText = await response.text();
                    toast.error(errorText || "Failed to change the password.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to change the password. Please try again.");
            } finally {
                setStatusBtn(false);
            }
        } else {
            setStatusBtn(false);
        }
    };

    // Validate password format
    const validatePassword = () => {
        if (password.length < 8) {
            setErrorNewPassword("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    // Check if passwords match
    const checkPasswordsMatch = () => {
        if (password !== confirmPassword) {
            setErrorConfirmPassword("Passwords do not match.");
            return false;
        }
        return true;
    };

    return (
        <div className="video-background">
            <video autoPlay muted loop playsInline>
                <source src="/background_video.mp4" type="video/mp4" />
            </video>
            <div className="container container-signup py-4 rounded-5 shadow-5 bg-light w-50">
                <h1 className="text-center" style={{ color: "#880a0a", fontWeight: "600" }}>
                    CHANGE PASSWORD
                </h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="row px-2">
                        <div className="col-12">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="c95"
                                placeholder="Enter your new password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrorNewPassword("");
                                }}
                                required
                            />
                            {errorNewPassword && <p className="text-danger">{errorNewPassword}</p>}

                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="c95"
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrorConfirmPassword("");
                                }}
                                required
                            />
                            {errorConfirmPassword && <p className="text-danger">{errorConfirmPassword}</p>}
                        </div>
                    </div>
                    <div className="btn loading-button text-center my-3">
                        <Button fullWidth type="submit" sx={{ padding: "10px", color: "#fff" }} disabled={statusBtn}>
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
