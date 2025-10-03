import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setSingleJobById } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, Briefcase } from 'lucide-react';

const JobDescription = () => {
  const { singleJobById } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:3000/api/v1/application/apply/${params.id}`);
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = { ...singleJobById, applications: [...singleJobById.applications, { applicant: authUser._id }] };
        dispatch(setSingleJobById(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error( "Please Login first");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === authUser?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  return (
    <div className='max-w-5xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900'>{singleJobById?.title}</h1>
          <div className='flex flex-wrap gap-3 mt-3'>
            <Badge className='text-blue-700 font-semibold' variant='ghost'>{singleJobById?.position} Positions</Badge>
            <Badge className='text-[#F83002] font-semibold' variant='ghost'>{singleJobById?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-semibold' variant='ghost'>{singleJobById?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 ${
            isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Divider */}
      <hr className='my-6 border-gray-300' />

      {/* Job Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Briefcase className='text-gray-500' />
            <span className='font-semibold text-gray-700'>Role:</span>
            <span className='text-gray-800'>{singleJobById?.title}</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='text-gray-500' />
            <span className='font-semibold text-gray-700'>Location:</span>
            <span className='text-gray-800'>{singleJobById?.location}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='text-gray-500' />
            <span className='font-semibold text-gray-700'>Experience:</span>
            <span className='text-gray-800'>{singleJobById?.experienceLevel}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700'>Salary:</span>
            <span className='text-gray-800'>{singleJobById?.salary} LPA</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700'>Total Applicants:</span>
            <span className='text-gray-800'>{singleJobById?.applications?.length}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700'>Posted Date:</span>
            <span className='text-gray-800'>{singleJobById?.createdAt?.split("T")[0]}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className='bg-gray-50 p-5 rounded-xl shadow-inner'>
          <h2 className='text-xl font-semibold mb-2 border-b pb-2 border-gray-300'>Job Description</h2>
          <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{singleJobById?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
