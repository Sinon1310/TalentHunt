import React from 'react';
import { Video } from 'lucide-react';

const VideoMeeting = ({ teamId, competitionId }) => {
  const startMeeting = () => {
    // Generate a unique meet code using team ID and timestamp
    const timestamp = new Date().getTime();
    const meetCode = `${teamId}-${timestamp}`;
    
    // Open Google Meet in a new tab
    window.open('https://meet.google.com/new', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={startMeeting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Video className="w-5 h-5 mr-2" />
      Start Meeting
    </button>
  );
};

export default VideoMeeting; 