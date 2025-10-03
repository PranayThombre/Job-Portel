import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }

    return (
        <section className="text-center px-6 md:px-16 lg:px-24 py-2 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 -z-10"></div>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="mx-auto">
                    <span className="text-[#F83002] px-5 py-2 rounded-full bg-orange-100 font-medium text-sm tracking-wide shadow-sm">
                        🚀 No. 1 Job Hunt Website
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Search, Apply & <br /> 
                    Get Your <span className="text-[#6A38C2] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Dream Jobs</span>
                </h1>

                {/* Subtext */}
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Discover thousands of opportunities from top companies. 
                    Build your career, upgrade your skills, and land the job you’ve always wanted.
                </p>

                {/* Stats or Extra Info */}
                <div className="flex justify-center gap-8 mt-8 text-gray-700 text-sm md:text-base">
                    <div>
                        <span className="text-2xl font-bold text-[#6A38C2]">10k+</span>
                        <p>Jobs Posted</p>
                    </div>
                    <div>
                        <span className="text-2xl font-bold text-[#6A38C2]">5k+</span>
                        <p>Companies Hiring</p>
                    </div>
                    <div>
                        <span className="text-2xl font-bold text-[#6A38C2]">50k+</span>
                        <p>Active Users</p>
                    </div>
                </div> 

                {/* Search Box */}
                <div className="flex w-full md:w-[60%] shadow-xl border border-gray-200 rounded-full items-center gap-3 mx-auto bg-white transition duration-300  ">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="🔍 Find your dream job here..."
                        className="outline-none border-none w-full px-4 py-3 rounded-l-full text-gray-700 placeholder-gray-400"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-r-full bg-[#6A38C2] px-6 py-3 hover:bg-[#5a2fa3] transition-all"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

                
            </div>
        </section>
    )
}

export default HeroSection;
