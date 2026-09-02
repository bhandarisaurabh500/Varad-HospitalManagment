import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PremiumEyeVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const videos = [
    '/photos/eye-video/video-1.mp4',
    '/photos/eye-video/video-2.mp4'
  ];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <section className="bg-slate-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header — contained */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold mb-4 uppercase tracking-widest"
          >
            <span>Precision &amp; Care</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white font-poppins leading-tight"
          >
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">World-Class</span> Eye Surgery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Watch how our advanced technology and expert surgeons perform intricate eye procedures with utmost safety and precision.
          </motion.p>
        </div>
      </div>

      {/* Framed Cinematic Video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-700/50 bg-black group"
        >
          {/* Ambient Background Glow behind the video */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/30 via-transparent to-teal-500/30 blur-2xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
          
          {/* Subtle inner ring overlay */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-[2rem] pointer-events-none z-20" />

          <video
            key={currentVideoIndex}
            ref={videoRef}
            className="w-full h-auto aspect-[16/9] sm:aspect-video object-cover opacity-90 transition-opacity duration-700 block"
            muted
            playsInline
            autoPlay
            onEnded={handleVideoEnd}
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Premium gradient overlay at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Dot indicators + label */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-20 flex items-center gap-4">
            <div className="flex gap-2">
              {videos.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentVideoIndex === idx ? 'w-8 sm:w-10 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 'w-2 sm:w-3 bg-white/30 hover:bg-white/50 cursor-pointer'}`}
                  onClick={() => setCurrentVideoIndex(idx)}
                />
              ))}
            </div>
            <span className="text-white/80 text-[10px] sm:text-xs font-bold tracking-widest uppercase hidden sm:inline-block border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm bg-black/20">Live Surgery View</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom padding */}
      <div className="pb-16" />
    </section>
  );
};

export default PremiumEyeVideo;
