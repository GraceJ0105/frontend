"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./globals.css";
import Button from "./components/Button/Button";
import InputField from "./components/InputField/inputField";
import Form from "./components/Form/form";


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
    fetchData();
  };

  return (
    <div>
      <h1>Hello world</h1>
      <Form />
      <InputField type="number"/>
      <Button type="submit" text="Submit" onClick={handleClick}/>
    </div>
  );
}
