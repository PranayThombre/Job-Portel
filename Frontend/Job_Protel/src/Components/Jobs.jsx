import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Jobnotfound from "./Jobnotfound";

const Jobs = () => {
  const { authUser } = useSelector((store) => store.auth);
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchText]);

  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/jobs");
    }
  }, [authUser, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen mt-2 ">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[25%] ml-4 ">
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          <div className="flex-1 min-h-[80vh] overflow-y-auto no-scrollbar pb-10 ">
            {filterJobs?.length <= 0 ? (
              <Jobnotfound />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Jobs;
