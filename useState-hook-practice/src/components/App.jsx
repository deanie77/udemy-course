import React, {useState} from "react";

function App() {
  const [currentTime, setCurrentTime] = useState()
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const showTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time)
    setIsButtonPressed(true)
  }

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time)
  }

  isButtonPressed ?  setInterval(updateTime, 1000) : null;

  return (
    <div className="container">
      <h1>{isButtonPressed ? currentTime : "TIME"}</h1>
      <button onClick={showTime}>Get Time</button>
    </div>
  );
}

export default App;
