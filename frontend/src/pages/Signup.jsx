import React, { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        mobile: "",
        password: "",
        location: "",
        gender: "",
        dob: "",
        profileImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = (e) => {
        setForm((prev) => ({
            ...prev,
            profileImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.fullName || !form.mobile || !form.password) {
            alert("Please fill required fields");
            return;
        }

        try {
            const res = await api.post("/auth/signup", {
                fullname: form.fullName,
                mobilenumber: form.mobile,
                password: form.password,
                location: form.location,
                gender: form.gender,
                dob: form.dob,
            });
            navigate('/home');

            console.log("Signup success:", res.data);
        } catch (error) {
            console.log("Signup error:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            {/* CARD */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

                {/* TITLE */}
                <h2 className="text-3xl font-bold text-cyan-400 text-center">
                    Create Account
                </h2>

                <p className="text-slate-400 text-center mt-2 mb-6">
                    Join CrickHeroes Platform
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* FULL NAME */}
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
                    />

                    {/* MOBILE */}
                    <input
                        type="number"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
                    />

                    {/* LOCATION */}
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
                    />

                    {/* GENDER */}
                    <div className="text-slate-300 text-sm">
                        <p className="mb-2">Gender</p>

                        <div className="flex gap-4">
                            {["Male", "Female", "other"].map((g) => (
                                <label key={g} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={form.gender === g}
                                        onChange={handleChange}
                                    />
                                    <span className="capitalize">{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* DOB */}
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
                    />

                    {/* PROFILE IMAGE */}
                    <div>
                        <label className="text-slate-300 text-sm">
                            Profile Image (optional)
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full mt-1 text-slate-400"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400 transition"
                    >
                        Sign Up
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-center text-slate-400 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;