import React from "react";
import Link from "next/link";




  interface JobCardProps {
    id: string;
    name: string;
    clientName: string;
    categoryName: string;
    merchantName: string;
    SPLName: string;
    IMAN: number;
    model: number;
    totalPieces: number;
    startDate: string; // Assuming startDate and endDate are strings formatted as dates
    endDate: string;
    assignedPieces: number;
  }
  
  function formatDate(dateString) {
    if (!dateString) return ''; // Return empty string if dateString is falsy (null or undefined)
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Return empty string if date is invalid
  
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  const JobCard: React.FC<JobCardProps> = ({
    id,
    name,
    clientName,
    categoryName,
    merchantName,
    SPLName,
    IMAN,
    model,
    totalPieces,
    startDate,
    endDate,
    assignedPieces
  }) => {
    return (
      <Link href={`/dashboard/jobs/${id}`}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="bg-gray-800 text-white text-lg font-bold px-4 py-2">{name}</div>
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Client:</span> {clientName}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Category:</span> {categoryName}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">SPL:</span> {SPLName}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Merchant:</span> {merchantName}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">IMAN:</span> {IMAN}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Model:</span> {model}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Total Pieces:</span> {totalPieces}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Assigned Pieces:</span> {assignedPieces}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Start Date:</span>{' '}
              <span className={`font-semibold ${new Date(startDate) < new Date() ? 'text-red-500' : ''}`}>
                {formatDate(startDate)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">End Date:</span>{' '}
              <span className="font-semibold">{formatDate(endDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  interface Job {
    _id: string;
    name: string;
    clientID: {
      name: string;
    };
    categoryID: {
      name: string;
    };
    merchantID: {
      name: string;
    };
    SPLID: {
      name: string;
    };
    IMAN: number;
    model: number;
    totalPieces: number;
    startDate: string; // Assuming startDate and endDate are strings formatted as dates
    endDate: string;
    assignedPieces: number;
  }
  
  interface JobListProps {
    jobList: Job[];
  }
  
  const JobList: React.FC<JobListProps> = ({ jobList }) => {
    return (
      <div className="card-grid">
        {jobList.map((e, i) => (
          <JobCard
            key={i}
            id={e._id}
            name={e.name}
            clientName={e.clientID.name}
            categoryName={e.categoryID.name}
            merchantName={e.merchantID.name}
            SPLName={e.SPLID.name}
            IMAN={e.IMAN}
            model={e.model}
            totalPieces={e.totalPieces}
            startDate={e.startDate}
            endDate={e.endDate}
            assignedPieces={e.assignedPieces}
          />
        ))}
      </div>
    );
  };

  export default JobList;
