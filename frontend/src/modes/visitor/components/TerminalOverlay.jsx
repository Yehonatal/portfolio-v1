import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { VISITOR_DATA } from '../data/visitorData'

export default function TerminalOverlay({ onClose }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { text: 'SYSTEM INTERACTIVE CONSOLE INITIALIZED.', type: 'info' },
    { text: 'TYPE "contact" TO COPY EMAIL AND PREPARE COMMUNICATIONS.', type: 'info' },
    { text: 'PRESS ESCAPE OR TYPE "exit" TO RETURN.', type: 'info' }
  ])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim().toLowerCase()
      if (!trimmed) return

      const newHistory = [...history, { text: `$ ${input}`, type: 'command' }]

      if (trimmed === 'exit' || trimmed === 'quit') {
        onClose()
        return
      } else if (trimmed === 'clear' || trimmed === 'cls') {
        setHistory([])
        setInput('')
        return
      } else if (trimmed === 'contact') {
        try {
          navigator.clipboard.writeText(VISITOR_DATA.email)
          newHistory.push({ text: `EMAIL ${VISITOR_DATA.email} SUCCESSFULLY COPIED TO CLIPBOARD.`, type: 'success' })
        } catch (err) {
          newHistory.push({ text: `COPY FAILED. DIRECT LINK: ${VISITOR_DATA.email}`, type: 'error' })
        }
      } else {
        newHistory.push({ text: `command not found: ${input}. Available commands: contact, clear, exit`, type: 'error' })
      }

      setHistory(newHistory)
      setInput('')
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#1A1816] text-[#F2EFE8] font-mono p-6 md:p-12 flex flex-col justify-between select-text"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      {/* Console Header */}
      <div className="flex justify-between items-center border-b border-[#F2EFE8]/10 pb-4 text-[10px] tracking-widest text-[#F2EFE8]/60 uppercase font-medium">
        <span>YONATAN AFEWERK // INTERACTIVE OVERLAY SHELL</span>
        <button 
          onClick={onClose} 
          className="hover:text-[#F2EFE8] cursor-none transition-colors focus:outline-none"
        >
          [CLOSE ESC]
        </button>
      </div>

      {/* Terminal History output */}
      <div className="flex-1 overflow-y-auto py-6 space-y-3 scrollbar-none text-xs sm:text-sm leading-relaxed">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`${
              line.type === 'error' ? 'text-[#C8392B]' : 
              line.type === 'success' ? 'text-emerald-400' : 
              line.type === 'command' ? 'text-[#F2EFE8]/90 font-bold' : 
              'text-[#F2EFE8]/60'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Live Command Line Input */}
      <div className="flex items-center gap-2 border-t border-[#F2EFE8]/10 pt-4 text-sm">
        <span className="text-[#C8392B] font-bold">&gt;</span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none focus:ring-0 text-[#F2EFE8] font-mono select-text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {/* Custom blinking caret */}
          {input === '' && (
            <span 
              className="absolute left-0 w-2 h-4 bg-[#F2EFE8]"
              style={{
                animation: 'blink 1.2s step-start infinite'
              }}
            />
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}} />
    </motion.div>
  )
}
