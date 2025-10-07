import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup } from '../ui/radio-group';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, authUser } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${API_BASE_URL}/api/v1/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (authUser?.role === 'recruiter') navigate("/admin/companies");
    else if (authUser?.role === 'student') navigate("/");
  }, [authUser, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ff] px-5">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
          <p className="text-center text-gray-500">Sign up to start applying for jobs</p>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 font-semibold">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-gray-700 font-semibold">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="example@email.com"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-gray-700 font-semibold">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+91 9876543210"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-gray-700 font-semibold">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <RadioGroup className="flex items-center gap-6 my-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="accent-[#6A38C2] cursor-pointer"
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
                  className="accent-[#6A38C2] cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col">
              <Label className="text-gray-700 font-semibold">Profile Image</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8F5BFF] hover:from-[#8F5BFF] hover:to-[#6A38C2] text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? 'Please wait...' : 'Sign Up'}
          </Button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-[#6A38C2] font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
