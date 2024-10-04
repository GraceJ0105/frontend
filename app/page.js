"use client";

import { useState } from "react";
import axios from "axios";
import "./globals.css";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Home() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [broadHabitat, setBroadHabitat] = useState("Select");
  const [habitatTypeDropdown, setHabitatTypeDropdown] = useState(""); // For second dropdown selection
  const [selectedConditionOption, setSelectedConditionOption] = useState("");
  const [selectedStrategicSignificance, setSelectedStrategicSignificance] =
    useState("");

  const broadHabitatOptions = {
    BroadHabitats: [
      "Cropland",
      "Grassland",
      // "Heathland and shrub",
      // "Lakes",
      // "Sparsely vegetated land",
      // "Urban",
      // "Wetland",
      // "Woodland and forest",
      // "Coastal lagoons",
      // "Rocky shore",
      // "Coastal saltmarsh",
      // "Intertidal sediment",
      // "Intertidal hard structures",
      // "Watercourse footprint",
      // "Individual trees",
    ],
  };

  const habitatTypeOptions = {
    Cropland: [
      "Arable field margins cultivated annually",
      "Arable field margins game bird mix",
      "Arable field margins pollen and nectar",
      "Arable field margins tussocky",
      "Cereal crops",
      "Winter stubble",
      "Horticulture",
      "Intensive orchards",
      "Non-cereal crops",
      "Temporary grass and clover leys",
    ],
    Grassland: [
      "Traditional orchards",
      "Bracken",
      "Floodplain wetland mosaic and CFGM",
      "Lowland calcareous grassland",
      "Lowland dry acid grassland",
      "Lowland meadows",
      "Modified grassland",
      "Other lowland acid grassland",
      "Other neutral grassland",
      "Tall herb communities (H6430)",
      "Upland acid grassland",
      "Upland calcareous grassland",
      "Upland hay meadows",
    ],
  };

  const conditionOptions = [
    "Good",
    "Fairly Good",
    "Moderate",
    "Fairly Poor",
    "Poor",
  ];

  const strategicSignificanceOptions = [
    "Formally identified in local strategy",
    "Location ecologically desirable but not in local strategy",
    "Area/compensation not in local strategy/ no local strategy",
  ];

  const sendNumber = async (event) => {
    event.preventDefault();
    console.log(value);
    if (isNaN(value) || value === "") {
      alert("Please enter a valid number."); // Alert if the input is invalid
      return;
    }
    try {
      // Send the value as a number
      const response = await axios.post(
        "http://localhost:3030/postnumber",
        { value: parseFloat(value) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data);
    } catch (err) {
      if (err.response) {
        console.error("Response Data:", err.response.data);
        console.error("Response Status:", err.response.status);
        console.error("Response Headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request made but no response received");
        console.error("Request:", err.request);
      } else {
        console.error("Error setting up the request");
        console.error("Error:", err.message);
      }
    }
  };

  const handleSelectionOfBroadHabitat = (key) => {
    setBroadHabitat(key);
    setHabitatTypeDropdown(""); // Update button label with selected habitat
  };

  // Handle second dropdown selection
  const handleHabitatTypeDropdown = (key) => {
    setHabitatTypeDropdown(key);
  };

  const handleSelectionOfCondition = (key) => {
    setSelectedConditionOption(key);
  };

  const handleSelectionOfStrategicSignificance = (key) => {
    setSelectedStrategicSignificance(key);
  };

  return (
    <div>
      <Link href="/HomePage/">Home</Link>

      <form>
        <div>
          <div style={{ marginTop: "20px" }}>
            <label> Broad Habitat</label>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" class="ml-5">
                  {broadHabitat}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Broad Habitats"
                onAction={handleSelectionOfBroadHabitat} // First dropdown handler
              >
                {/* Mapping over broad habitats to dynamically render dropdown items */}
                {broadHabitatOptions.BroadHabitats.map((habitat) => (
                  <DropdownItem key={habitat}>{habitat}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {broadHabitat in habitatTypeOptions && (
          <div style={{ marginTop: "20px" }}>
            <label>Habitat Type</label>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" class="ml-5">
                  {habitatTypeDropdown || "Select"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Specific Options"
                onAction={handleHabitatTypeDropdown} // Second dropdown handler
              >
                {habitatTypeOptions[broadHabitat].map((option) => (
                  <DropdownItem key={option}>{option}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <label>Condition</label>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" class="ml-5">
                {selectedConditionOption || "Select"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Specific Options"
              onAction={handleSelectionOfCondition} // Second dropdown handler
            >
              {conditionOptions.map((option) => (
                <DropdownItem key={option}>{option}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Strategic Significance</label>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" class="ml-5">
                {selectedStrategicSignificance || "Select"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Specific Options"
              onAction={handleSelectionOfStrategicSignificance} // Second dropdown handler
            >
              {strategicSignificanceOptions.map((option) => (
                <DropdownItem key={option}>{option}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </form>
      <form class="mt-3" onSubmit={sendNumber}>
        <label>Area (hectares)</label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            // Validate to allow only numbers and decimal points
            const regex = /^[0-9]*\.?[0-9]*$/; // Regular expression for numbers and decimals
            if (regex.test(e.target.value) || e.target.value === "") {
              setValue(e.target.value); // Set value if it matches regex
            }
          }}
        />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* to be calculated in backend using input from users */}
      <h2 class="font-bold mt-3">Distinctiveness</h2>
      <h3 class="mt-3">Distinctiveness</h3>
      <h3>Score</h3>
    </div>
  );
}
