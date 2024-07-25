"use client";

import { getFactories, getFactory, Factory } from "@/app/actions/factory";
import { getAllJobs, Job } from "@/app/actions/jobs";
import { Line } from "@/app/actions/line";
import DropDown from "@/app/components/DropDown";
import React, { useEffect, useState } from "react";

interface CreateJobAssignmentFormProps {
  submit: Function;
  data: {
    jobID: String | undefined;
    factoryID: String | undefined;
    lineID: String | undefined;
    piecesPerDay: Number;
    startDate: Date | undefined;
    endDate: Date | undefined;
    noOfDays: Number;
  };
}

export default function CreateJobAssignment({
  submit,
  data,
}: any) {
  const [formData, setFormData] = useState({
    jobID: data ? data.jobID : "",
    factoryID: data ? data.factoryID : "",
    lineID: data ? data.lineID : "",
    piecesPerDay: data ? data.piecesPerDay : "",
    startDate: data ? data.startDate : "",
    endDate: data ? data.endDate : "",
    noOfDays: data ? data.noOfDays : "",
  });
  // console.log('[+]Incoming data ',formData)

  useEffect(() => {
    const fetchFactoryData = async () => {
      try {
        const factories = await getFactories();
        const factoryPromises = factories.map((factory: any) =>
          getFactory(factory._id)
        );
        const assembledFactories = await Promise.all(factoryPromises);

        setFactoryData(assembledFactories);
        setLineData(assembledFactories[0].lines);

        setFormData((prev) => ({
          ...prev,
          lineID: prev.lineID || assembledFactories[0].lines[0]._id,
          factoryID: prev.factoryID || assembledFactories[0]._id,
        }));

        console.log("All factories", assembledFactories);
      } catch (error) {
        console.error("Error fetching factory data", error);
      }
    };

    const fetchJobData = async () => {
      try {
        const res = await getAllJobs();
        setJobData(res.data);
        let seljob = res.data.find((job: any) => job._id === formData.jobID);
        if (seljob) {
          console.log("Assigning selected job",seljob)
          setSelectedJob(seljob);
          setFormData((prev) => ({
            ...prev,
            startDate: seljob.startDate?.split("T")[0],
            endDate: seljob.endDate?.split("T")[0],
          }));
        }
        console.log("[+]Selected job dets ", seljob);
        // console.log("All jobs", res.data);
      } catch (error) {
        console.error("Error fetching job data", error);
      }
    };

    fetchJobData();
    fetchFactoryData();
  },[]);

  const [factoryData, setFactoryData] = useState<Array<Factory>>([]);
  const [lineData, setLineData] = useState<Array<Line> | undefined>([]);
  const [jobData, setJobData] = useState<Array<Job>>([]);
  const [selectedJob, setSelectedJob] = useState<Job>();

  function factoryChangeHandler(id: String) {
    let selectedFactory = factoryData.find((factory) => factory._id === id);
    console.log(selectedFactory);
    setFormData((prev) => {
      prev.factoryID = selectedFactory?._id;
      return { ...prev };
    });
    setLineData(selectedFactory?.lines);
  }

  function jobChangeHandler(id: string) {
    // Use `string` instead of `String`
    const seljob = jobData.find((job: Job) => job._id === id);

    if (seljob) {
      setSelectedJob(seljob);
      setFormData((prev) => ({
        ...prev,
        startDate: seljob.startDate.split("T")[0],
        endDate: seljob.endDate.split("T")[0],
      }));
    }
  }

  function lineChangeHandler(id: String) {
    setFormData((prev) => {
      prev.lineID = id;
      return { ...prev };
    });
  }

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[+]form change handler ", e.target.name, e.target.value);
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [e.target.name]:
          e.target.type === "date"
            ? e.target.valueAsDate?.toISOString().split("T")[0]
            : e.target.value,
      };
      console.log(updatedFormData);
      return updatedFormData;
    });
  };

  function submitHandler(e: any) {
    e.preventDefault();
    submit(formData);
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <div>
          <DropDown
            list={jobData}
            onChange={jobChangeHandler}
            selected={formData.jobID}
            name="Job"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          {factoryData.length > 0 && (
            <DropDown
              list={factoryData}
              onChange={factoryChangeHandler}
              selected={formData.factoryID}
              name="Factory"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
        <div>
          {factoryData.length > 0 && (
            <DropDown
              list={lineData}
              onChange={lineChangeHandler}
              selected={formData.lineID}
              name="Line"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Pieces per day:
          </label>
          <input
            type="number"
            name="piecesPerDay"
            value={formData.piecesPerDay}
            onChange={formChangeHandler}
            placeholder="Pieces per day"
            className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            No of day:
          </label>
          <input
            type="number"
            name="noOfDays"
            value={formData.noOfDays}
            onChange={formChangeHandler}
            placeholder="noOfDays"
            className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={formChangeHandler}
              placeholder="Start Date"
              className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={formChangeHandler}
              placeholder="End Date"
              className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="submit-button w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
