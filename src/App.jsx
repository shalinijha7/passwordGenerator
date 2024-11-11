import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false) // New state for copy feedback

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      
      pass += str.charAt(char)   
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)

    setCopied(true) // Set copied to true
    setTimeout(() => setCopied(false), 2000) // Reset copied after 2 seconds
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-2xl px-4 my-8 py-3 text-orange-500 bg-gray-800">

      <h1 className='text-2xl my-2 text-center text-white'>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          {/* Input area */}
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly
          ref={passwordRef} />

          {/* Copy button */}
          <button 
            onClick={copyPasswordToClipboard}
            className={`outline-none px-3 py-0.5 shrink-0 transition-colors duration-300
              ${copied ? 'bg-blue-400' : 'bg-blue-900'} 
              ${!copied ? 'hover:bg-blue-600' : ''}`}>{copied ? 'Copied!' : 'Copy'}</button>

        </div>
        <div className="flex text-sm gap-x-2">

          {/* label for getting track of length */}
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>

          {/* label for numbers checkbox */}
          <div className="flex items-center gap-x-1">
            <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
             />
             <label>Numbers</label>
          </div>

          {/* label for characters checkbox */}
          <div className="flex items-center gap-x-1">
            <input 
                type="checkbox"
                defaultChecked={charAllowed}
                id='characterInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }} />
          </div>
          <label>Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
