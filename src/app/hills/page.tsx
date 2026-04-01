"use client";

import { useState,useEffect } from 'react';
import Link from 'next/link';


type hillOverview = {
    id:number;
    name:string;
    location:string;
    latitude:number;
    longitude:number;
    description:string;
    daily_snowfall: null | number;
    daily_rain: null | number;
    min_temp: null | number;
    max_temp: null | number;
    max_wind: null | number;
    best_powder_score: null | number;
}

export default function HillsPage(){
    const [hills,setHills] = useState<hillOverview[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        async function fetchHills(){
            try{
                const resp = await fetch("/api/hills");
                const data = await resp.json();
                if(data.success){
                    setHills(data.data);
                }else{
                    console.error("Failed to fetch hills:", data.message);
                }            
            } catch(error){
                console.error("Error fetching hills:", error);
            } finally{
                setLoading(false);
            }
        }
        fetchHills();
    },[]);

    
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative">
      
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
        </div>

    <h1 className="text-3xl font-bold text-center p-6 pt-10">
        Ski Hills
    </h1>

    {loading ? (<p className="text-center">Loading hills...</p>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {hills.map((hill) => (
            <Link
            key={hill.id}
            href={`/hills/${hill.id}`}
            className="bg-slate-200 dark:bg-slate-800 rounded-xl p-4 shadow hover:scale-105 transition"
            >
            <h2 className="text-xl font-semibold">{hill.name}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
            {hill.location}
            </p>
            <p className="mt-2 text-sm line-clamp-3">
            {hill.description}
            </p>
            </Link>
        ))}
    </div>
    )}
    </div>
);}