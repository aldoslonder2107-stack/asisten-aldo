import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    utterance.lang = 'id-ID' // agar intonasi cocok bahasa Indonesia
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'Aldo', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    if (!import.meta.env.VITE
        
