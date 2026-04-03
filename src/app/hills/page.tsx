"use client";

import HillCard from '../../components/HillCard';
import { useState, useEffect } from 'react';
import Link from 'next/link';


type hillOverview = {
    id: number;
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    description: string | null;
    daily_snowfall: null | number;
    daily_rain: null | number;
    min_temp: null | number;
    max_temp: null | number;
    max_wind: null | number;
    max_powder_score: null | number;
    avg_powder_score: null | number;
}

export default function HillsPage() {
    const [hills, setHills] = useState<hillOverview[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchHills() {
            try {
                const resp = await fetch("/api/hills");
                const data = await resp.json();
                if (data.success) {
                    setHills(data.data);
                } else {
                    console.error("Failed to fetch hills:", data.message);
                }
            } catch (error) {
                console.error("Error fetching hills:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHills();
    }, []);


    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
                <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
            </div>

            <h1 className="text-3xl font-bold text-center p-6 pt-10">
                Ski Hills
            </h1>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 p-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div className = "grid grid-col-3 gap-6 p-6 sm:grid-col-2 xl:grid-col-3">
                        {hills.map((hill : any)=>(
                        <HillCard key = {hill.id} hill ={hill}/>
                    ))}
                    </div>
                </div>
            </div>
        </div>       

    );
}