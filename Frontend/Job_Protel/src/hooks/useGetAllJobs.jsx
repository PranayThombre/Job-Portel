import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchText } = useSelector(store => store.job);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${API_BASE_URL}/api/v1/job/all?keyword=${searchText}`);
               
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])
}
export default useGetAllJobs;