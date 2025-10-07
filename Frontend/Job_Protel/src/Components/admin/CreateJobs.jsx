import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import { setLoading } from "@/redux/authSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "", // string from input, converted to array in backend
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "", // must match input name and backend
    position: "",
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (value) => {
    setInput({ ...input, companyId: value }); // value is now _id
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      experienceLevel: Number(input.experienceLevel),
      requirements: Array.isArray(input.requirements)
        ? input.requirements
        : input.requirements.split(",").map((r) => r.trim()),
    };

    console.log(payload);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/job/post`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <div className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>
                Salary <span className="text-xs text-gray-500">(in LPA)</span>
              </Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>
                Experience Level{" "}
                <span className="text-xs text-gray-500">(in years)</span>
              </Label>
              <Input
                type="text"
                name="experienceLevel" // must match backend
                value={input.experienceLevel} // must match state
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length !== 0 && (
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                    onValueChange={(value) =>
                      setInput({ ...input, companyId: value })
                    }
                  >
                    {companies &&
                      companies.map((company) => {
                        return (
                          <SelectItem key={company?._id} value={company?._id}>
                            {company?.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button
            onClick={submitHandler}
            disabled={companies?.length === 0 ? true : false}
            className="w-full mt-4"
          >
            Post New Job
          </Button>
          {companies.length === 0 && (
            <p className="text-red-600 text-xs font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateJobs;
