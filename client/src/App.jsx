import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          
        </p>
        <link href="/dist/output.css" rel="stylesheet"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>  
       
      
      </header> 
    <h1 className="text-3xl font-bold underline text-white">
          Hello world!
        </h1> 
    </div>
  );
}

export default App;
