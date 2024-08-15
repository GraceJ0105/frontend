"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./globals.css";
import Button from "./components/Button/Button";

export default function Home() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/health");
      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    event.preventDefault()
    fetchData();
  };

  return (
    <div>
      <form onClick={handleClick}>
        <input type="number" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
