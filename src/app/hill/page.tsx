"use client";
import { useEffect, useState } from 'react';


export default function HillPage(){
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=44.50&longitude=-80.31&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,snowfall,rain";
    
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }        
    };
    
    
    useEffect(() => {
        fetchData();
    },[apiUrl]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center p-4 mt-4 font-sans">Hill Page</h1>
        </div>
    )
}