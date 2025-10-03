import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="max-w-7xl mx-auto my-20 px-6 lg:px-12">
            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                    <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
                </h1>
                <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Explore exciting opportunities from the best companies hiring right now.
                    Find the perfect role that matches your skills and ambitions.
                </p>
            </div>

            {/* Job Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    allJobs && allJobs?.slice(0, 6).map(job => (
                        <Link 
                            key={job._id} 
                            to={`/description/${job?._id}`} 
                            className="transform transition duration-300 hover:scale-105 hover:shadow-2xl rounded-xl"
                        >
                            <LatestJobCard job={job} />
                        </Link>
                    ))
                }
            </div>

            {/* View More Button */}
            {allJobs?.length > 6 && (
                <div className="text-center mt-12">
                    <Link 
                        to="/browse"
                        className="inline-block px-8 py-3 rounded-full bg-[#6A38C2] text-white font-medium shadow-md hover:bg-[#5a2fa3] transition-all duration-300"
                    >
                        View All Jobs
                    </Link>
                </div>
            )}
        </section>
    )
}

export default LatestJobs
