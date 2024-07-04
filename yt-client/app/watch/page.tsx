"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function Watch() {
    const videoPrefix = 'https://storage.googleapis.com/ys324-processed-videos/';
    const videoSrc = useSearchParams().get('v');    
  return (
      <div className="items-center justify-center p-4 text-black ">
          <p className="text-gray-900 font-bold text-4xl dark:text-black">
            watch page
          </p>
          <video controls src={videoPrefix + videoSrc}/>
      </div>

  );
}
