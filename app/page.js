"use client";

import { useState } from "react";
import axios from "axios";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3030/health");
  //     setMessage(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const handleClick = () => {
  //   event.preventDefault();
  //   fetchData();
  // };

  const sendNumber = async (event) => {
    event.preventDefault();
    console.log(value)
     try {
       // Send the value as a number
       const response = await axios.post(
         "http://localhost:3030/postnumber",
         { value: parseInt(value) },
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


  return (
    <div>
      <form onSubmit={sendNumber}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
      <Link href="/HomePage/">Home</Link>
    </div>
  );
}
