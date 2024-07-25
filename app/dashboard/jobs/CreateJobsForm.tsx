"use client";

import { getAllClient } from "@/app/actions/clients";
import { getAllMerchant } from "@/app/actions/merchant";
import DropDown from "@/app/components/DropDown";
import React, { useEffect, useState } from "react";

export default function CreateJobsForm({ data, submit }) {
  const [formData, setFormData] = useState({
    name: data ? data.name : "",
    clientID: data ? data.clientID : "",
    categoryID: data ? data.categoryID : "",
    merchantID: data ? data.merchantID : "",
    SPLID: data ? data.SPLID : "",
    IMAN: data ? data.IMAN : "",
    model: data ? data.model : "",
    totalPieces: data ? data.totalPieces : "",
    startDate: data ? data.startDate : "",
    endDate: data ? data.endDate : "",
    metaData:data?data.metaData:""
  });

  const [clientData, setClientData] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [SPLData, setSPLData] = useState([]);

  const formChangeHandler = (e) => {
    console.log("[+]form change handler ", e.target.name, e.target.value);
    setFormData((prev) => {
      console.log(prev);
      prev[e.target.name] = e.target.value;
      console.log(prev);
      return { ...prev };
    });
  };

  function clientChangehandler(value) {
    let selectedClient = clientData.find((client) => client._id === value);
    console.log(selectedClient);
    setCategoryData(selectedClient?.categories);
    setSPLData(selectedClient?.SPLs);

    setFormData((prev) => {
      prev.clientID = value;
      return { ...prev };
    });
  }

  function dropDownChangeHandler(name, value) {
    setFormData((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }

  useEffect(() => {
    getAllClient().then((res) => {
      setClientData(res.data);
      let _clientTemp = res.data;
      setCategoryData(_clientTemp[0]?.categories);
      setSPLData(_clientTemp[0]?.SPLs);
      setFormData((prev) => {
        prev.clientID = _clientTemp[0]?._id;
        prev.categoryID = _clientTemp[0]?.categories[0]?._id;
        prev.SPLID = _clientTemp[0]?.SPLs[0]?._id;
        return { ...prev };
      });
      console.log("[=]Client data", res);
    });
    getAllMerchant().then((res) => {
      setMerchantData(res.data);
      console.log("[=]Merchant data ", res.data);
      setFormData(prev=>{
        prev.merchantID=res.data[0]?._id
        return {...prev}
      })
    });
  }, []);

  function formSubmitHandler(e) {
    e.preventDefault();
    submit(formData);
  }

  return (
    <div>
      <form
        onSubmit={formSubmitHandler}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={formChangeHandler}
            placeholder="Job Name"
            className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <textarea
            name="metaData"
            value={formData.metaData}
            onChange={formChangeHandler}
            placeholder="metaData"
            className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <div>
            <DropDown
              list={clientData}
              onChange={clientChangehandler}
              selected={formData.clientID}
              name="Client"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <DropDown
              list={categoryData}
              onChange={(val) => dropDownChangeHandler("categoryID", val)}
              selected={formData.categoryID}
              name="Category"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <DropDown
              list={SPLData}
              onChange={(val) => dropDownChangeHandler("SPLID", val)}
              selected={formData.SPLID}
              name="SPL"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <DropDown
              list={merchantData}
              onChange={(val) => dropDownChangeHandler("merchantID", val)}
              selected={formData.merchantID}
              name="Merchant"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
              IMAN:
            </label>
            <input
              type="number"
              name="IMAN"
              value={formData.IMAN}
              onChange={formChangeHandler}
              placeholder="IMAN"
              className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
              Model:
            </label>
            <input
              type="number"
              name="model"
              value={formData.model}
              onChange={formChangeHandler}
              placeholder="Model"
              className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
              Total Pieces:
            </label>
            <input
              type="number"
              name="totalPieces"
              value={formData.totalPieces}
              onChange={formChangeHandler}
              placeholder="Total Pieces"
              className="text-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
