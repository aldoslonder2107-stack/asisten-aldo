import React, { useState, useEffect } from 'react'

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [voice, setVoice] = useState(null)

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      const googleFemale = voices.find(v =>
        v.name.toLowerCase().includes('google') && v.lang.toLowerCase().includes('en')
      )
      setVoice(googleFemale || voices[0])
    }

    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices
      loadVoices()
    }
  }, [])

  const speak = (text) => {
    if (!voice || !text) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.lang = 'id-ID'
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'Aldo', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    const demoReply = "Halo Aldo! Ini mode demo karena belum ada API key 😊"
    setMessages(prev => [...prev, { sender: 'Asisten Aldo', text: demoReply }])
    speak(demoReply)
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="bg-white shadow rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'Aldo' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'Aldo' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-grow p-2 border rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tulis pesanmu..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Kirim
        </button>
      </div>
    </div>
  )
}

export default ChatBox
