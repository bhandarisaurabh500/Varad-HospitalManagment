import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PremiumEyeVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const videos = [
    '/photos/eye-video/video-1.mp4',
    '/photos/eye-video/video-2.mp4'
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, [currentVideoIndex]);

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

      {/* Full-width video — no max-width, edge to edge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden bg-black"
      >
        {/* Subtle inner border overlay */}
        <div className="absolute inset-0 border-y border-white/10 pointer-events-none z-20" />

        <video
          ref={videoRef}
          className="w-full h-auto aspect-video object-cover opacity-90 transition-opacity duration-500 block"
          muted
          playsInline
          autoPlay
          onEnded={handleVideoEnd}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Premium gradient overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

        {/* Dot indicators + label */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <div className="flex gap-1.5">
            {videos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentVideoIndex === idx ? 'w-6 bg-teal-400' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
          <span className="text-white/70 text-xs font-semibold tracking-wider uppercase">Live Surgery View</span>
        </div>
      </motion.div>

      {/* Bottom padding */}
      <div className="pb-16" />
    </section>
  );
};

export default PremiumEyeVideo;
