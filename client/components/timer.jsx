import React, {useState, useEffect} from 'react'

const Timer = () => {
  const [thours, setTHours] = useState(0);
  const [tminutes, setTMinutes] = useState(0);
  const [tseconds, setTSeconds] = useState(0);
  const [bhours, setBHours] = useState(0);
  const [bminutes, setBMinutes] = useState(0);
  const [bseconds, setBSeconds] = useState(0);
  const [started, setStart] = useState(false)
  const hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
  const [[hrs, mins, secs], setTime] = useState([hoursMinSecs.hours, hoursMinSecs.minutes, hoursMinSecs.seconds]);
  const tabata = [];
  const [timers, setTimers] = useState(tabata)
  const breaks = [];
  const [pauses, setPauses] = useState(breaks)

  const reset = () => {
    setTime([parseInt(hoursMinSecs.hours, 10), parseInt(hoursMinSecs.minutes, 10), parseInt(hoursMinSecs.seconds, 10)])
  };

  const tick = () => {  
    console.log(hrs) 
    if (hrs === 0 && mins === 0 && secs === 0) 
        reset()
    else if (mins === 0 && secs === 0) {
        setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
        setTime([hrs, mins - 1, 59]);
    } else {
        setTime([hrs, mins, secs - 1]);
    }
  };

  const timerId = () => {
    if (started){
      timers.map(item => setTime([item.hours, item.minutes, item.seconds]))
      
    }
    setInterval(() => tick(), 1000)
  };
  
  useEffect(() => {  
    return () => clearInterval(timerId);     
  });

  const addTabata = () => {
    if (thours > 0 || tminutes > 0 || tseconds > 0){
      const newTime = [...timers, {hours: thours, minutes: tminutes, seconds: tseconds}]
      setTimers(newTime)
      setTHours(0)
      setTMinutes(0)
      setTSeconds(0)
    }    
  }

  const addBreaks = () => {
    if (bhours > 0 || bminutes > 0 || bseconds > 0){
      const newTime = [...pauses, {hours: bhours, minutes: bminutes, seconds: bseconds}]
      setPauses(newTime)
      setBHours(0)
      setBMinutes(0)
      setBSeconds(0)
    }    
  }

  const onChange = (e) => {
    if (!Number.isNaN(parseInt(e.target.value, 10))){  
      switch (e.target.name){
        case "thours":
          setTHours(parseInt(e.target.value, 10));
          break;
        case "tminutes":
          setTMinutes(parseInt(e.target.value, 10));
          break;
        case "tseconds":
          setTSeconds(parseInt(e.target.value, 10));
          break;
        case "bhours":
          setBHours(parseInt(e.target.value, 10));
          break;
        case "bminutes":
          setBMinutes(parseInt(e.target.value, 10));
          break;
        case "bseconds":
          setBSeconds(parseInt(e.target.value, 10));
          break;
        default:
          break;
      }
    }
  }

  const start = () => {
    setStart(true)
  }

  return (
    <div>
      <div className='flex text-center'>
        <div className="pl-20 pt-20 px-2">
          <div className="bg-gray-300 pt-10 pb-10">
            <div className="text-center w-full">
              SET TIME
            </div>
            <form className="w-full m-5">
              <div className="flex flex-wrap">
                <div>
                  <label className="block ml-5 mr-10" htmlFor='hours'>Hours</label>
                  <input id='hours' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="hours" name="thours" value={thours} onChange={onChange}/>
                </div>
                <div>
                  <label className="block ml-5 mr-10" htmlFor='minutes'>Minutes</label>
                  <input id='minutes' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="minutes" name="tminutes" value={tminutes} onChange={onChange}/>
                </div>
                <div>
                  <label className="block ml-5 mr-10" htmlFor='seconds'>Seconds</label>
                  <input id='seconds' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="seconds" name="tseconds" value={tseconds} onChange={onChange}/>
                </div>
                <div>
                  <button className="mt-6 border-black rounded bg-black text-white ml-5 p-1 w-12" type='button' onClick={addTabata}>Add</button>
                </div>
              </div>              
            </form> 
          </div>  
          {timers.length ?
            <div>
              {timers.map((item, index) => <span key={index} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 last:mr-0 mr-1">{`${item.hours.toString().padStart(2, '0')}:${item.minutes.toString().padStart(2, '0')}:${item.seconds.toString().padStart(2, '0')}`}</span>)}              
            </div>:null
          }         
        </div>
        <div className="pr-20 pt-20 px-2">
          <div className="bg-gray-300 pt-10 pb-10 -pl-10">
            <div className="text-center w-full">
              SET BREAKS
            </div>
            <form className="w-full m-5">
              <div className="flex flex-wrap">
                <div>
                  <label className="block ml-5 mr-10" htmlFor='hoursb'>Hours</label>
                  <input id='hoursb' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="hours" name="bhours" value={bhours} onChange={onChange}/>
                </div>
                <div>
                  <label className="block ml-5 mr-10" htmlFor='minutesb'>Minutes</label>
                  <input id='minutesb' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="minutes" name="bminutes" value={bminutes} onChange={onChange}/>
                </div>
                <div>
                  <label className="block ml-5 mr-10" htmlFor='secondsb'>Seconds</label>
                  <input id='secondsb' type='number' className="border border-black rounded p-1 ml-5 mr-10" placeholder="seconds" name="bseconds" value={bseconds} onChange={onChange}/>
                </div>
                <div>
                  <button className="mt-6 border-black rounded bg-black text-white ml-5 p-1 w-12" type='button' onClick={addBreaks}>Add</button>
                </div>
              </div>              
            </form> 
          </div> 
          {pauses.length ?
            <div>
              {pauses.map((item, index) => <span key={index} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 last:mr-0 mr-1">{`${item.hours.toString().padStart(2, '0')}:${item.minutes.toString().padStart(2, '0')}:${item.seconds.toString().padStart(2, '0')}`}</span>)}              
            </div>:null
          }         
        </div> 
              
      </div>
      <div className="pt-20">
        <div className="text-center">
          {!started ? <button className="border border-green-600 bg-green-600 hover:bg-green-700 text-white rounded ml-5 inline-block p-1 w-96" type="button" onClick={start}>START</button>:null}
        </div>        
      </div>
      <div className="pt-10">
        <div className="text-center">
          <div className="font-bold text-9xl">
            <p>{`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
          </div>
        </div>        
      </div>
      
    </div>
    
  )
}
export default Timer