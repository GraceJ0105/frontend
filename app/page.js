"use client";

import { useState } from "react";
import Select from "react-select";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [broadHabitat, setBroadHabitat] = useState(null);
  const [habitatType, setHabitatType] = useState(null);
  const [condition, setCondition] = useState(null);
  const [strategicSignificance, setStrategicSignificance] = useState(null);

  const broadHabitatOptions = [
    { value: "Cropland", label: "Cropland" },
    { value: "Grassland", label: "Grassland" },
  ];

  const habitatTypeOptions = {
    Cropland: [
      {
        value: "Arable field margins cultivated annually",
        label: "Arable field margins cultivated annually",
      },
      {
        value: "Arable field margins game bird mix",
        label: "Arable field margins game bird mix",
      },
      {
        value: "Arable field margins pollen and nectar",
        label: "Arable field margins pollen and nectar",
      },
      {
        value: "Arable field margins tussocky",
        label: "Arable field margins tussocky",
      },
      { value: "Cereal crops", label: "Cereal crops" },
      { value: "Winter stubble", label: "Winter stubble" },
      { value: "Horticulture", label: "Horticulture" },
      { value: "Intensive orchards", label: "Intensive orchards" },
      { value: "Non-cereal crops", label: "Non-cereal crops" },
      {
        value: "Temporary grass and clover leys",
        label: "Temporary grass and clover leys",
      },
    ],
    Grassland: [
      { value: "Traditional orchards", label: "Traditional orchards" },
      { value: "Bracken", label: "Bracken" },
      {
        value: "Floodplain wetland mosaic and CFGM",
        label: "Floodplain wetland mosaic and CFGM",
      },
      {
        value: "Lowland calcareous grassland",
        label: "Lowland calcareous grassland",
      },
      {
        value: "Lowland dry acid grassland",
        label: "Lowland dry acid grassland",
      },
      { value: "Lowland meadows", label: "Lowland meadows" },
      { value: "Modified grassland", label: "Modified grassland" },
      {
        value: "Other lowland acid grassland",
        label: "Other lowland acid grassland",
      },
      { value: "Other neutral grassland", label: "Other neutral grassland" },
      {
        value: "Tall herb communities (H6430)",
        label: "Tall herb communities (H6430)",
      },
      { value: "Upland acid grassland", label: "Upland acid grassland" },
      {
        value: "Upland calcareous grassland",
        label: "Upland calcareous grassland",
      },
      { value: "Upland hay meadows", label: "Upland hay meadows" },
    ],
  };

  const conditionOptions = [
    { value: "Good", label: "Good" },
    { value: "Fairly Good", label: "Fairly Good" },
    { value: "Moderate", label: "Moderate" },
    { value: "Fairly Poor", label: "Fairly Poor" },
    { value: "Poor", label: "Poor" },
  ];

  const strategicSignificanceOptions = [
    {
      value: "High strategic significance",
      label: "High strategic significance",
    },
    {
      value: "Medium strategic significance",
      label: "Medium strategic significance",
    },
    {
      value: "Low strategic significance",
      label: "Low strategic significance",
    },
  ];

  const handleBroadHabitatChange = (selectedOption) => {
    setBroadHabitat(selectedOption);
    setHabitatType(null); // Reset habitat type when broad habitat changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      area: parseFloat(value),
      broadHabitat: broadHabitat?.value,
      habitatType: habitatType?.value,
      condition: condition?.value,
      strategicSignificance: strategicSignificance?.value,
    };
    console.log(data);

    try {
    const response = await fetch("/api/calculate", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      throw new Error("Failed to communicate with backend");
    }

    const result = await response.text();
    setMessage(result);
  } catch (error) {
    console.error("Error:", error);
    setMessage("An error occurred");
  }

  };

  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <Link href="/HomePage/" className="text-blue-500 hover:underline">
          Home
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Broad Habitat */}
          <div>
            <label className="text-gray-700 mb-2 block">Broad Habitat</label>
            <Select
              options={broadHabitatOptions}
              value={broadHabitat}
              onChange={handleBroadHabitatChange}
              placeholder="Select Broad Habitat"
              className="text-gray-700"
            />
          </div>

          {/* Habitat Type */}
          {broadHabitat && (
            <div>
              <label className="text-gray-700 mb-2 block">Habitat Type</label>
              <Select
                options={habitatTypeOptions[broadHabitat.value]}
                value={habitatType}
                onChange={(selectedOption) => setHabitatType(selectedOption)}
                placeholder="Select Habitat Type"
                className="text-gray-700"
              />
            </div>
          )}

          {/* Condition */}
          <div>
            <label className="text-gray-700 mb-2 block">Condition</label>
            <Select
              options={conditionOptions}
              value={condition}
              onChange={(selectedOption) => setCondition(selectedOption)}
              placeholder="Select Condition"
              className="text-gray-700"
            />
          </div>

          {/* Strategic Significance */}
          <div>
            <label className="text-gray-700 mb-2 block">
              Strategic Significance
            </label>
            <Select
              options={strategicSignificanceOptions}
              value={strategicSignificance}
              onChange={(selectedOption) =>
                setStrategicSignificance(selectedOption)
              }
              placeholder="Select Strategic Significance"
              className="text-gray-700"
            />
          </div>

          {/* Area Input */}
          <div>
            <label className="text-gray-700 mb-2 block">Area (hectares)</label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const regex = /^[0-9]*\.?[0-9]*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setValue(e.target.value);
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
