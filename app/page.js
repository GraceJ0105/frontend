'use client'
 
import { useEffect, useState } from 'react'
import axios from 'axios';
import './globals.css'; 

export default function Home() {
const [message, setMessage] = useState("")

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/health');
      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    fetchData();
  };


  return (
    <div>
      <h1>
        Hello world
      </h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick}>
  Click Me
</button>
    </div>
  );
}

