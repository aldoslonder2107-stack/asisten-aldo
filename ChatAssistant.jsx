import React, { useState } from 'react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'asisten', text: 'Hai Aldo! Ada yang bisa aku bantu hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'aldo', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input }
          ]
        }),
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'asisten', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'asisten', text: 'Maaf, terjadi kesalahan saat menghubungi server.' }]);
    }
    setLoading(false);
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
        {loading && <div className="text-left text-gray-500">Asisten sedang mengetik...</div>}
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
          disabled={loading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
                                              
