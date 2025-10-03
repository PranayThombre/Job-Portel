import React from 'react';
import Navbar from './shared/Navbar';
import ApplicationTable from './ApplicationTable';

const MyApplication = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          My Applications
        </h1>
        <p className="text-gray-600 mb-8">
          Track all the jobs you have applied to in one place. Stay updated on your application status and manage your profile efficiently.
        </p>

        {/* Applied Jobs Table Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Applied Jobs</h2>
          <ApplicationTable />
        </div>
      </div>
    </div>
  );
};

export default MyApplication;
