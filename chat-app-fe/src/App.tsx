import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState("")


  useEffect(()=> {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      console.log("messaage recieved " + message.data)
      setLatestMessage(message.data)
    }

  }, [])

  if(!socket) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      <input type="text" placeholder='Text...' onChange={(e) => {
        setMessage(e.target.value)
      }}/>
      <button onClick={() => {
        socket.send(message)
      }}>send</button>
      <br />
      {latestMessage}
    </>
  )
}

export default App
