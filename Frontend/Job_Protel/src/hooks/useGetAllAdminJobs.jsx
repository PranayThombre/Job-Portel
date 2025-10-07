import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_URL;


const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/job/admin`, // corrected route
                    { withCredentials: true }
                );
                if (res.data.success) { 
                    dispatch(setAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Failed to fetch admin jobs:", error.response?.data || error.message);
            }
        };

        fetchAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
