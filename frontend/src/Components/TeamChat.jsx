import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, Users, Phone, Video, Settings } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';
import io from 'socket.io-client';

const TeamChat = ({ teamId = '695d2f907aeb2886a5ab4295', teamName = 'Awesome Dev Team' }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Socket connection and event listeners
  useEffect(() => {
    if (!user || !teamId) return;

    const newSocket = io('http://localhost:5002', {
      withCredentials: true,
      transports: ['websocket']
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      
      // Authenticate user
      newSocket.emit('authenticate', {
        userId: user.id || user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || user.profileImage
      });
      
      // Join team room
      newSocket.emit('join-team', teamId);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Team events
    newSocket.on('team-members-online', (members) => {
      setOnlineMembers(members);
    });

    newSocket.on('user-joined-team', (userData) => {
      setOnlineMembers(prev => [...prev, userData]);
    });

    newSocket.on('user-left-team', (userData) => {
      setOnlineMembers(prev => prev.filter(member => member.userId !== userData.userId));
    });

    // Message events
    newSocket.on('new-message', (messageData) => {
      setMessages(prev => [...prev, messageData]);
    });

    // Typing events
    newSocket.on('user-typing', (userData) => {
      setTypingUsers(prev => {
        if (!prev.find(u => u.userId === userData.userId)) {
          return [...prev, userData];
        }
        return prev;
      });
    });

    newSocket.on('user-stopped-typing', (userData) => {
      setTypingUsers(prev => prev.filter(u => u.userId !== userData.userId));
    });

    // Error handling
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.emit('leave-team', teamId);
        newSocket.close();
      }
    };
  }, [user, teamId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket || !connected) return;

    // Stop typing indicator
    socket.emit('typing-stop', teamId);
    
    // Send message
    socket.emit('send-message', {
      teamId,
      content: message.trim(),
      type: 'text'
    });

    setMessage('');
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    if (!socket || !connected) return;
    
    // Start typing indicator
    socket.emit('typing-start', teamId);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing-stop', teamId);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isMyMessage = (senderId) => {
    return senderId === (user?.id || user?._id);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{teamName}</h3>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-500">
                {connected ? `${onlineMembers.length} online` : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {!connected && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Connecting to chat...</p>
          </div>
        )}
        
        {connected && messages.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
        
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end space-x-2 ${
                isMyMessage(msg.senderId) ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {msg.senderName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>

              {/* Message Content */}
              <div className={`max-w-[70%] flex flex-col space-y-1`}>
                <div className={`flex items-center space-x-2 ${
                  isMyMessage(msg.senderId) ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <span className="text-xs text-gray-500 font-medium">
                    {isMyMessage(msg.senderId) ? 'You' : msg.senderName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                
                <div className={`${
                  isMyMessage(msg.senderId)
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                } rounded-2xl px-4 py-3 shadow-sm`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicators */}
          {typingUsers.length > 0 && (
            <div className="flex items-center space-x-2 px-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs text-gray-500">
                {typingUsers.map(u => u.name).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={handleTyping}
              placeholder={connected ? "Type a message..." : "Connecting..."}
              disabled={!connected}
              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 disabled:opacity-50"
            />
          </div>
          
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || !connected}
            className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamChat;
