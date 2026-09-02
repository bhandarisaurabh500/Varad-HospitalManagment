import React, { useEffect, useState } from 'react';
import { FaBullhorn } from 'react-icons/fa';
import api from '../services/api';

const NoticeMarquee = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        if (res.data.success && res.data.data.length > 0) {
          setNotices(res.data.data);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    
    fetchNotices();
    // Poll every 10 seconds
    const interval = setInterval(fetchNotices, 10000);
    return () => clearInterval(interval);
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-rose-600 to-red-700 text-white text-sm font-bold py-1.5 shadow-md border-b border-red-800 z-50 relative overflow-hidden flex items-center">
      <div className="px-4 flex items-center justify-center bg-red-900/50 h-full absolute left-0 z-10 border-r border-red-500/30 shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
        <FaBullhorn className="text-white animate-pulse mr-2" />
        <span className="tracking-wider uppercase text-xs">Update</span>
      </div>
      <div className="w-full flex-1 overflow-hidden ml-24 sm:ml-28">
        <div className="animate-marquee whitespace-nowrap inline-block">
          {notices.map((notice, index) => (
            <span key={notice.id || index} className="mx-8 font-poppins">
              • {notice.notice_text}
            </span>
          ))}
          {/* Duplicate for seamless scrolling */}
          {notices.map((notice, index) => (
            <span key={`dup-${notice.id || index}`} className="mx-8 font-poppins">
              • {notice.notice_text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeMarquee;
