import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job';
import Footer from "./shared/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchText } from '@/redux/jobSlice';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 my-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Browse <span className="text-[#6A38C2]">Jobs</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Explore thousands of job openings from top companies. Filter and find your dream role today!
          </p>
          <p className="text-gray-400 mt-2">Total Results: {allJobs?.length}</p>
        </div>

        {/* Jobs Grid */}
        <div className="flex-1 h-[75vh] overflow-y-auto no-scrollbar pb-8">
          {
            allJobs?.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {allJobs?.map(job => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <span className="text-gray-400 text-xl">No Job Found</span>
              </div>
            )
          }
        </div>

        {/* Optional Load More Button */}
        {allJobs?.length > 9 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-[#6A38C2] text-white font-medium rounded-full shadow-md hover:bg-[#5a2fa3] transition-all duration-300">
              Load More Jobs
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}

export default Browse;
