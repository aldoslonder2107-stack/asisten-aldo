          import React, { useState } from 'react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'asisten', text: 'Hai Aldo! Ada yang bisa aku bantu hari ini?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'aldo', text: input };
    const assistantReply = {
      sender: 'asisten',
      text: 'Terima kasih! Saat ini aku belum terhubung ke ChatGPT asli, tapi aku tetap bisa bantu tampilkan UI-nya!'
    };

    setMessages([...messages, userMessage, assistantReply]);
    setInput('');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-xl rounded-2xl mt-6">
      <h2 className="text-xl font-bold mb-4">Asisten Aldo</h2>
      <div className="h-64 overflow-y-auto border rounded-md p-2 bg-gray-50 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'aldo' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'aldo' ? 'bg-blue-200' : 'bg-gray-300'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          placeholder="Tulis pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
        
