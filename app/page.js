"use client";

import { useState } from "react";
import Select from "react-select";
import Link from "next/link";

export default function Home() {
  const [area, setArea] = useState(null);
  const [baselineScore, setBaselineScore] = useState(null);
  const [message, setMessage] = useState("");
  const [broadHabitat, setBroadHabitat] = useState(null);
  const [habitatType, setHabitatType] = useState(null);
  const [condition, setCondition] = useState(null);
  const [strategicSignificance, setStrategicSignificance] = useState(null);
  const [distinctiveness, setDistinctiveness] = useState("");
  const [distinctivenessScore, setDistinctivenessScore] = useState(0)
  const [conditionScore, setConditionScore] = useState(0);
  const [conditionOptionsAvailable, setConditionOptionsAvailable] = useState(true)
  const [conditionOptions, setConditionOptions] = useState([
    { value: "Good", label: "Good" },
    { value: "Fairly Good", label: "Fairly Good" },
    { value: "Moderate", label: "Moderate" },
    { value: "Fairly Poor", label: "Fairly Poor" },
    { value: "Poor", label: "Poor" },
  ]);

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

   const restrictedConditionHabitats = [
     "Arable field margins cultivated annually",
     'Arable field margins game bird mix',
     'Arable field margins pollen and nectar',
     'Arable field margins tussocky',
     "Cereal crops",
     "Horticulture",
     "Winter stubble",
     "Intensive orchards",
     "Non-cereal crops",
     "Temporary grass and clover leys",
     "Bracken",
   ];

const getConditionOptions = (selectedOption) => {
  console.log("Inside getConditionOptions: ", selectedOption)
  if (selectedOption && restrictedConditionHabitats.includes(selectedOption.value)) {
    setConditionOptionsAvailable(false)
    setConditionScore(1);
    setConditionOptions([
      { value: "Condition Assessment N/A", label: "Condition Assessment N/A" },
    ]);
    
  } else {
    setConditionOptionsAvailable(true)
    setConditionOptions([
      { value: "Good", label: "Good" },
      { value: "Fairly Good", label: "Fairly Good" },
      { value: "Moderate", label: "Moderate" },
      { value: "Fairly Poor", label: "Fairly Poor" },
      { value: "Poor", label: "Poor" },
    ]);
    setConditionScore(0);
  }
};

  const strategicSignificanceOptions = [
    {
      value: "High",
      label: "Formally identified in local strategy (High)",
    },
    {
      value:
        "Medium",
      label:
        "Location ecologically desirable but not in local strategy (Medium)",
    },
    {
      value: "Low",
      label: "Area/compensation not in local strategy/ no local strategy (Low)",
    },
  ];

  const handleBroadHabitatChange = (selectedOption) => {
    setBroadHabitat(selectedOption);
    setHabitatType(null); // Reset habitat type when broad habitat changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getDistinctivenessScore()
    if(conditionOptionsAvailable){
    getConditionScore()
    }
    getBaselineValue()
  };

  const getBaselineValue = async () => {
    try {
      const response = await fetch("/api/calculateBaseline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: area?.value
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with backend");
      }

      const data = await response.json();
      console.log("Received data: ", data);
      setBaselineScore(data.baselineScore);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred: ", error);
      alert(message);
    }
  };


  const getDistinctivenessScore = async ()=> {
try {
    const response = await fetch("/api/calculateDistinctivenessScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        broadHabitat: broadHabitat?.value,
        habitatType: habitatType?.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to communicate with backend");
    }

    const data = await response.json();
    console.log("Received data: ", data)
    setDistinctivenessScore(data.distinctivenessScore);
    setDistinctiveness(data.distinctivenessCategory)

  } catch (error) {
    console.error("Error:", error);
    setMessage("An error occurred: ", error);
    alert(message)
  }
  }

  const getConditionScore = async () => {
  console.log(condition);
  if (condition?.value !== "Condition Assessment N/A") {
    try {
      const response = await fetch("/api/calculateConditionScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          condition: condition?.value,
          broadHabitat: broadHabitat?.value,
          habitatType: habitatType?.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with backend");
      }

      const data = await response.json();
      console.log("Received data: ", data);
      setConditionScore(data.conditionScore);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred: ", error);
      alert(message);
    }
  }
  }

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
                onChange={(selectedOption) => {
                  setHabitatType(selectedOption);
                  getConditionOptions(selectedOption);
                }}
                placeholder="Select Habitat Type"
                className="text-gray-700"
              />
            </div>
          )}
          {/* Distinctiveness */}
          <div>
            <h1 className="text-gray-700 mb-2 block">Distinctiveness</h1>
            <div className=" grid grid-cols-2">
              {" "}
              <div>
                <h2 className="text-gray-500 mb-2">Distinctiveness</h2>
                <input
                  className="w-1/2 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
                  value={distinctiveness}
                  disabled
                />
              </div>
              <div>
                <h2 className="text-gray-500 mb-2">Distinctiveness Score</h2>
                <input
                  className="w-1/4 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
                  value={distinctivenessScore}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Condition */}
          <div>
            <h1 className="text-gray-700 mb-2 block">Condition</h1>
            {conditionOptionsAvailable ? (
              <div className=" grid grid-cols-2">
                <div>
                  <label className="text-gray-500 mb-2">Condition</label>
                  <Select
                    options={conditionOptions}
                    value={condition}
                    onChange={(selectedOption) => setCondition(selectedOption)}
                    placeholder="Select Condition"
                    className="w-11/12 pt-3 text-gray-700"
                  />
                </div>
                <div>
                  <h2 className="text-gray-500 mb-2">Condition Score</h2>
                  <input
                    className="w-1/4 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
                    value={conditionScore}
                    disabled
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className=" grid grid-cols-2">
                  <div>
                    <label className="text-gray-500 mb-2">Condition</label>
                    <input
                      value="Condition Assessment N/A"
                      className="w-11/12 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
                      disabled
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500 mb-2">Condition Score</h2>
                    <input
                      className="w-1/4 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
                      value={conditionScore}
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
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
              value={area}
              onChange={(e) => {
                const regex = /^[0-9]*\.?[0-9]*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setArea(e.target.value);
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <h2 className="text-gray-700 mb-2 block">BNG Baseline Score</h2>
            <input
              className="w-1/4 text-center p-3 border border-gray-300 rounded-md focus:ring-2"
              value={baselineScore}
              disabled
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
