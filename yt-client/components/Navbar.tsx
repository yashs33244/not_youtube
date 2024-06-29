"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] text-white">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/logo_.png" alt="YouTube Logo" width={40} height={10} />
                    <h1 className='px-2 font-weight-800'>
                        YouTube
                    </h1>
                </Link>
            </div>
            
            <div className="flex items-center flex-grow max-w-xl mx-4">
                <form onSubmit={handleSearch} className="flex w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="flex-grow px-4 py-2 text-black rounded-l-full"
                    />
                    <button type="submit" className="px-4 py-2 bg-[#222222] rounded-r-full">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M10,17C6.14,17,3,13.86,3,10S6.14,3,10,3s7,3.14,7,7S13.86,17,10,17z M10,5C7.24,5,5,7.24,5,10s2.24,5,5,5s5-2.24,5-5 S12.76,5,10,5z M21,20.59l-4.38-4.38C17.92,15.14,19,12.68,19,10C19,4.48,14.52,0,9,0S-1,4.48-1,10s4.48,10,10,10c2.68,0,5.14-1.08,6.97-2.78 l4.38,4.38L21,20.59z"></path>
                        </svg>
                    </button>
                </form>
            </div>
            
            <div className="flex items-center">
                <button className="p-2 hover:bg-[#222222] rounded-full">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z"></path>
                    </svg>
                </button>
                <button className="p-2 ml-2 hover:bg-[#222222] rounded-full">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"></path>
                    </svg>
                </button>
                <button className="p-1 ml-2">
                    <Image src="/profile-pic.jpg" alt="Profile" width={32} height={32} className="rounded-full" />
                </button>
            </div>
        </nav>
    );
}
