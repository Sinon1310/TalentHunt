import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

const TeamChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Rahul Sharma',
      content: 'Hey team! How is the progress on the UI mockups?',
      timestamp: '10:30 AM',
      avatar: null
    },
    {
      id: 2,
      sender: 'Priya Patel',
      content: 'Almost done! Just finalizing the dashboard layout.',
      timestamp: '10:32 AM',
      avatar: null
    },
    {
      id: 3,
      sender: 'Dr. Rajesh Verma',
      content: 'Great work everyone. Let me know if you need any help with the AI integration.',
      timestamp: '10:35 AM',
      avatar: null
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'Rahul Sharma', // This would normally come from auth context
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: null
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'Rahul Sharma' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium">
                  {msg.sender.charAt(0)}
                </span>
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[70%] ${
                  msg.sender === 'Rahul Sharma'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                } rounded-lg p-3 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">
                    {msg.sender}
                  </span>
                  <span className={`text-xs ${
                    msg.sender === 'Rahul Sharma' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
                <p className={`text-sm ${
                  msg.sender === 'Rahul Sharma' ? 'text-white' : 'text-gray-700'
                }`}>
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamChat; 