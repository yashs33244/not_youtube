import React from 'react';
import { getVideos } from './firebase/functions';
import Link from 'next/link';
import Image from 'next/image';

export default async function Watch() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-center text-4xl font-extrabold mb-8">
        Landing Page
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {videos.map((video) => (
          video.status !== 'processing' && (
            <Link key={video.filename} href={`/watch?v=${video.filename}`}>
              <div className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-48 bg-gray-800">
                  <Image
                    src='/thunbnail.jpg'
                    alt='video'
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-300">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">
                    {video.description || 'No description available'}
                  </p>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}