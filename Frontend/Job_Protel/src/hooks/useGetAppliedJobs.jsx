import { setAllAppliedJobs } from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/application/get`
        );
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications)); // use 'applications' not 'application'
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
