import { useState } from 'react'

const ChatAssistant = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newMessages
        })
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'Gagal mendapatkan balasan.'

      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Terjadi error saat menghubungi GPT.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[300px] max-h-[60vh] overflow-y-auto border p-3 rounded bg-white">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm mb-2 ${msg.role === 'assistant' ? 'text-blue-600' : 'text-black'}`}>
            <strong>{msg.role === 'assistant' ? 'Asisten' : 'Aldo'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p className="text-blue-400">Asisten sedang mengetik...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded"
          placeholder="Tulis sesuatu..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </div>
    </div>
  )
}

export default ChatAssistant
