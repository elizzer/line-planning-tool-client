import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

function formatDate(dateString) {
  if (!dateString) return ''; // Return empty string if dateString is falsy (null or undefined)

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // Return empty string if date is invalid

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function JobAssignmentCard({ data }) {
  return (
    <Link  href={`/dashboard/jobAssignment/${data._id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">
        <div className="p-4">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Factory Name</span>{" "}
            {data.lineID.factoryID.name}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Line Name</span> {data.lineID.name}
          </div>
          <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Pieces per day :</span> {data.piecesPerDay}
          </div>
          <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Pieces in this line :</span> {data.totalPieces}
          </div>
          <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">No of days:</span> {data.noOfDays}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Start Date:</span>{" "}
            <span
              className={`font-semibold ${
                new Date(data.startDate) < new Date() ? "text-red-500" : ""
              }`}
            >
              {formatDate(data.startDate)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">End Date:</span>{" "}
            <span
              className={`font-semibold ${
                new Date(data.endDate) < new Date() ? "text-red-500" : ""
              }`}
            >
              {formatDate(data.endDate)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function JobAssignmetList({ data }) {
  console.log("jbjbjb", data);
  return (
    <div>

      <div className="card-grid">
        {data.map((e,i) => {
          return <JobAssignmentCard key={i} data={e}></JobAssignmentCard>;
        })}
      </div>
    </div>
  );
}
