import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Contact, Mail, Pen } from 'lucide-react';
import ApplicationTable from './ApplicationTable';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { UpdateProfileDialog } from './UpdateProfileDialog';
import { useNavigate } from 'react-router-dom';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { Label } from './ui/label';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { authUser } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* User Info */}
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 shadow-md">
              <AvatarImage src={authUser?.profile?.profilePhoto} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{authUser?.fullname}</h1>
              <p className="text-gray-600 mt-1">{authUser?.profile?.bio || "Add your bio here"}</p>
            </div>
          </div>
          {/* Edit Button */}
          <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
            <Pen className="h-5 w-5" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row gap-6 mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="h-5 w-5 text-gray-500" />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Contact className="h-5 w-5 text-gray-500" />
            <span>{authUser?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {authUser?.profile?.skills?.length
              ? authUser.profile.skills.map((skill, index) => (
                  <Badge key={index} className="bg-[#6A38C2] text-white font-semibold px-3 py-1 rounded-full shadow-sm">
                    {skill}
                  </Badge>
                ))
              : <span className="text-gray-500">NA</span>
            }
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-bold">Resume</Label>
          {authUser?.profile?.resume
            ? <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href={authUser.profile.resume} 
                className="block mt-2 text-blue-600 hover:underline font-medium"
              >
                {authUser.profile.resumeOriginalName}
              </a>
            : <span className="text-gray-500 block mt-2">NA</span>
          }
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg my-8 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Applied Jobs</h2>
        <ApplicationTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
