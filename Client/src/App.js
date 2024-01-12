import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [chat, setChat] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        const bot = { type: "bot", content: res.data.content };
        
        setChat([...chat, bot]);
        setPrompt("")
        setLoading(false);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          {chat.map((message, index) => (
            <div key={index} className={message.type}>
              <p>
                
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <div>
          <label>WANNA ASK SOMETHING:</label>
        </div>
        <div>
          <textarea id="inputField" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div>
          <button type="submit">{loading ? "Loading..." : "ANSWER"}</button>
        </div>
      </form>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
