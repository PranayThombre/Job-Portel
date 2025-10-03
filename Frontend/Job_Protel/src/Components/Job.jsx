import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ApplyJobDialog } from './ApplyJobDialog'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    }

    return (
        <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            
            {/* Top Row */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button size="icon" className="rounded-full hover:bg-gray-100 transition-colors" variant="secondary">
                    <Bookmark className="text-gray-500 hover:text-[#6A38C2]" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 shadow-md rounded-full border border-gray-100">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                </Avatar>
                <div>
                    <h2 className="font-semibold text-lg">{job?.company?.name}</h2>
                    <p className="text-sm text-gray-400">{job?.location || "India"}</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h3 className="font-bold text-xl text-gray-800 mb-1">{job?.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-row gap-2 mt-3">
                <Badge className="text-blue-700 font-bold bg-blue-50 border-none">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold bg-orange-50 border-none">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold bg-purple-50 border-none">{job?.salary} LPA</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2 mt-5">
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className="rounded-lg px-6 py-2 hover:bg-gray-100 transition-colors"
                >
                    Details
                </Button>
                <Button 
                    className="bg-[#7209b7] text-white rounded-lg px-6 py-2 hover:bg-[#5a2fa3] transition-colors"
                >
                    Save For Later
                </Button>
            </div>

            {/* Apply Dialog */}
            <ApplyJobDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Job
