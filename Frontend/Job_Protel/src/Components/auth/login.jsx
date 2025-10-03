import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '../ui/radio-group'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const { loading, authUser } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (authUser?.role === 'recruiter') navigate("/admin/companies");
        else if (authUser?.role === 'student') navigate("/");
    }, [authUser, navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ff] px-4">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
                    <p className="text-center text-gray-500">Login to your account to continue</p>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-700 font-semibold">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="your@email.com"
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-semibold">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="********"
                                className="mt-1"
                                required
                            />
                        </div>
                    </div>

                    <RadioGroup className="flex items-center gap-6 my-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="accent-[#6A38C2]"
                                required
                            />
                            <Label>Student</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="accent-[#6A38C2]"
                            />
                            <Label>Recruiter</Label>
                        </div>
                    </RadioGroup>

                    <Button 
                        type="submit" 
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8F5BFF] hover:from-[#8F5BFF] hover:to-[#6A38C2] text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2"
                    >
                        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                        {loading ? 'Please wait...' : 'Login'}
                    </Button>

                    <p className="text-center text-gray-500 text-sm">
                        Don't have an account? <Link to="/signup" className="text-[#6A38C2] font-semibold hover:underline">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;
