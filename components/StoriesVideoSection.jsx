'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function StoriesVideoSection({ section }) {
  const sectionData = section || {};
  if (sectionData.enabled === false) return null;

  const heading = sectionData.heading || "Stories from Families Across Bangalore";
  const stories = sectionData.storiesList || [];

  return (
    <section className="py-16 bg-gradient-to-tr from-rose-50/40 via-blue-50/30 to-rose-50/25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {heading}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ story }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = story.videoUrl; // e.g., '/videos/women-health.m3u8'

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari support
      video.src = videoSrc;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }
  }, [story.videoUrl]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col hover:shadow-md hover:border-rose-200 hover:-translate-y-1.5 transition-all duration-300 group">
      {/* Video Container */}
      <div 
        className="relative w-full aspect-[4/4] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50/40 to-indigo-50/20 mb-4 cursor-pointer" 
        onClick={handlePlayClick}
      >
        <video
          ref={videoRef}
          poster={story.thumbnailSrc}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
          playsInline
        />
        
        {/* Custom Play Overlay Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition">
            <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-[#DB5070] pl-0.5 group-hover:scale-110 transition-transform">
              ▶
            </div>
          </div>
        )}
      </div>

      {/* Content Info */}
      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#DB5070] transition-colors">
        {story.title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        {story.description}
      </p>
    </div>
  );
}