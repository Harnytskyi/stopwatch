import './App.css';
import Timer from './components/Timer'
import {useLogic} from './data/logic'



function App() {
  const {
    time,
    status,
    handleStart,
    handleStop,
    handleReset,
    handleWait,
  } = useLogic();

  return (
    <>
      <Timer timeData={time}/>
      <button onClick={status === 'start' ? handleStop : handleStart} >Start/Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleWait}>Wait</button>
    </>
  );
}

export default App;
