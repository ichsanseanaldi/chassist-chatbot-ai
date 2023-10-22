"use client"

import Button from "@/components/Button"
import {Message} from "ai"
import {useChat} from "ai/react"
import {Pacifico} from "next/font/google"
import Link from "next/link"
import {FormEvent, FormEventHandler, useEffect, useRef, useState} from "react"

type localType = string | null

const font = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export default function Main() {
  const {
    setMessages,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
    stop
  } = useChat()

  const [username, setUsername] = useState<string>("")
  const [newUser, setNewUser] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const state = localStorage.getItem("newuser")
    const stored_username: localType = localStorage.getItem("username")
    const stored_message: Message[] | localType = localStorage.getItem("messages")

    if (state === null || state === "true") {
      localStorage.setItem("newuser", "true")
      setNewUser(true)
    }
    if (stored_username !== null) {
      setUsername(stored_username)
    }
    if (stored_message !== null) {
      setMessages(JSON.parse(stored_message))
    }
  }, [])

  useEffect(() => {
    ref.current?.focus()
    ref.current?.scrollIntoView(false)

    return () => {
      if (messages.length === 0) return
      localStorage.setItem("messages", JSON.stringify(messages))
    }
  }, [messages])

  const submitUsername: FormEventHandler = (e: FormEvent) => {
    e.preventDefault()
    setNewUser(false)
    localStorage.setItem("newuser", "false")
    if (username !== null) {
      localStorage.setItem("username", username)
    }
  }

  return (
    <div className='wrapper flex flex-column'>
      {newUser && (
        <div className='modal-entry flex flex-center'>
          <form
            onSubmit={submitUsername}
            className='modal-wrapper flex flex-column flex-center'
          >
            <h3 className='text-center'>
              Welcome to <span className={font.className}>Chassist</span> !
            </h3>
            <input
              className='input-text w-100 modal'
              type='text'
              name='name'
              id='name'
              placeholder="What's your name?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            <Button props={"w-100 button modal"} word={"Enter"} />
          </form>
        </div>
      )}
      {error && (
        <div className='mub-10 flex flex-center error-wrapper flex-column text-center'>
          <strong className='mub-10'>Something went wrong...</strong>
          <em>
            Please report to
            <Link href='mailto:ichsanseanaldi10@gmail.com'>
              ichsanseanaldi10@gmail.com
            </Link>
          </em>
        </div>
      )}
      <div className='message-container flex flex-column'>
        <div className='h-100 bg-test'>
          {messages.length > 0 ? (
            messages.map((e, i) => (
              <div
                key={i}
                className={`flex ${
                  e.role === "user" ? "flex-end" : "flex-start"
                }`}
                tabIndex={i === messages.length - 1 ? 0 : undefined}
                ref={i === messages.length - 1 ? ref : null}
              >
                <div
                  className={`content-wrapper flex flex-column ${
                    e.role === "user" ? "flex-end" : "flex-start"
                  }`}
                >
                  <div className='role'>
                    {e.role === "user" ? (
                      <div className='flex flex-end'>{username}</div>
                    ) : (
                      <div className='flex flex-start'>{e.role}</div>
                    )}
                  </div>
                  <div className='content'>{e.content}</div>
                   {
                     e.role !== 'user' 
                     && isLoading 
                     && i === messages.length-1 
                     && <button onClick={stop} className="button stop">Stop Generating Message</button>
                   } 
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-column flex-center svg-wrapper'>
              <div className='w-min'>
                <svg width="300px" height="300px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#202020" className="m-auto" stroke="#EEE" strokeWidth={'2%'} >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.48 4h4l.5.5v2.03h.52l.5.5V8l-.5.5h-.52v3l-.5.5H9.36l-2.5 2.76L6 14.4V12H3.5l-.5-.64V8.5h-.5L2 8v-.97l.5-.5H3V4.36L3.53 4h4V2.86A1 1 0 0 1 7 2a1 1 0 0 1 2 0 1 1 0 0 1-.52.83V4zM12 8V5H4v5.86l2.5.14H7v2.19l1.8-2.04.35-.15H12V8zm-2.12.51a2.71 2.71 0 0 1-1.37.74v-.01a2.71 2.71 0 0 1-2.42-.74l-.7.71c.34.34.745.608 1.19.79.45.188.932.286 1.42.29a3.7 3.7 0 0 0 2.58-1.07l-.7-.71zM6.49 6.5h-1v1h1v-1zm3 0h1v1h-1v-1z"/>
                </svg>
                <p className='mub-10 text-center'>
                  Chassist is a chatting bot app which uses AI from{" "}
                  <Link
                    className='link-ref'
                    href='https://openai.com/'
                    target='_blank'
                  >
                    OpenAI
                  </Link>
                  , it&apos;s free to use and doesn&apos;t require Login.
                </p>
              </div>
              <div className='text-center mub-10'>
                <h1>Start by typing below!</h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex form-prompt'>
        <input
          className='flex-wide input-text prompt'
          value={input}
          placeholder={`${
            isLoading ? "Please wait..." : `What's on your thoughts?`
          }`}
          onChange={handleInputChange}
          disabled={isLoading}
          autoFocus
          required
        />
        <button className='button prompt' type='submit' disabled={isLoading}>
          {isLoading ? <div className='square'></div> : <span>Submit</span>}
        </button>
      </form>
    </div>
  )
}
