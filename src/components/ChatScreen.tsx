import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { Send, LogOut } from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user, logout } = useAuth();
  const { messages, addMessage } = useMessages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      addMessage(message.trim(), user.username);
      setMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 h-full flex flex-col">
        <div className="p-4 border-b border-white/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Chat Room</h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === user?.username ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === user?.username
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white'
                }`}
              >
                <div className="text-sm opacity-75 mb-1">{msg.sender}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded transition duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};