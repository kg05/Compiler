import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language : "cpp",
      code
    };
    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    }catch(err){
      console.log(err.response);
    }
  }

  return (
    <div className="App">
      <table><tr>
        <th>
          <h1> Online Code Compiler</h1>
          <textarea 
            rows="20" 
            cols="75"
            value={code}
            onChange = {(e) => {
              setCode(e.target.value)
            }}
          ></textarea>
          <br/>
          <button onClick={handleSubmit}>Submit</button>
        </th>
        <th>
          
          <div className="box">OUTPUT<br/><br/><br/>{output}</div>
        </th>
        </tr></table>
    </div>
  );
}

export default App;
