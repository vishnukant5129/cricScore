import React, { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginSuccessfully, setLoginSuccessfully] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = "Enter a valid 10-digit mobile number";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        setLoginSuccessfully(false);

        try {

            const res = await api.post("/auth/login", {
                mobilenumber: mobile,
                password: password,
            },
                {
                    withCredentials: true,
                }
            );

            console.log("Login Success:", res.data);

            localStorage.setItem(
                "token",
                res.data.token
            );

            setLoginSuccessfully(true);

            navigate("/home");

        } catch (err) {

            setLoginSuccessfully(false);

            console.log(
                "STATUS:",
                err.response?.status
            );

            console.log(
                "DATA:",
                err.response?.data
            );

            alert(
                err.response?.data?.message ||
                "Login failed"
            );

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* CARD */}
            <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">

                {/* Logo / Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                        <svg
                            className="w-7 h-7 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="text-3xl font-bold text-white text-center tracking-tight">
                    Welcome Back
                </h2>

                <p className="text-slate-400 text-center mt-2 mb-8 text-sm">
                    Sign in to your CrickHeroes account
                </p>

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-5" noValidate>

                    {/* MOBILE */}
                    <div>
                        <label
                            htmlFor="mobile"
                            className="block text-slate-300 text-sm font-medium mb-1.5"
                        >
                            Mobile Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium select-none">
                                +91
                            </span>
                            <input
                                id="mobile"
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                value={mobile}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setMobile(val);
                                    if (errors.mobile) setErrors(prev => ({ ...prev, mobile: "" }));
                                }}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 text-white outline-none border transition-all duration-200 placeholder:text-slate-600
                                    ${errors.mobile
                                        ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                                    }`}
                                placeholder="9876543210"
                            />
                        </div>
                        {errors.mobile && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.mobile}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor="password"
                                className="text-slate-300 text-sm font-medium"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                                }}
                                className={`w-full px-4 py-3 pr-14 rounded-xl bg-slate-800 text-white outline-none border transition-all duration-200 placeholder:text-slate-600
                                    ${errors.password
                                        ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                                    }`}
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyan-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    {loginSuccessfully && (
                        <p className="mt-3 text-sm text-green-400 text-center">
                            Login successful!
                        </p>
                    )}

                </form>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-slate-800" />
                    <span className="text-xs text-slate-600 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* GOOGLE BUTTON 
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-white font-medium hover:bg-slate-800 transition-colors"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>*/}

                {/* FOOTER */}
                <p className="text-center text-slate-400 mt-6 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;