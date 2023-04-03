import { useEffect, useState } from "react";
import { IMovie, IReccommendMovie } from "../interface/IReccommendMovie";
import Client from "../util/axios";
import './homePage.css'

const HomePage:React.FC = () =>{

  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isAnalyst, setIsAnalyst] = useState<boolean>(false);
  const [result, setResult] = useState<IReccommendMovie[]>([]);
  const [resultAnalyst, setResultAnalyst] = useState<string[]>([]);

  useEffect(() => {
    if(isWorking){
      const interval = setInterval(() => {
        //console.log('This will be called every 10 seconds');
        Client.get<IReccommendMovie>('/start-one-process')
        .then((res)=>{
          if(res.status === 200)
          setResult(result => [...result, res.data])
        }).catch((err)=>{
          console.log(err);
        })
      }, 20000);
    
      return () => clearInterval(interval);
    }
  }, [isWorking]);

  useEffect(() => {
    if(isAnalyst){
      const interval = setInterval(() => {
        //console.log('This will be called every 10 seconds');
        Client.post('/start-analyst-one-post')
        .then((res)=>{
          if(res.status === 200)
          setResultAnalyst(resultAnalyst => [...resultAnalyst, res.data])
          if(res.status === 204)
          setResultAnalyst(resultAnalyst => [...resultAnalyst,'No data to analyze'])
        }).catch((err)=>{
          console.log(err);
        })
      }, 15000);
    
      return () => clearInterval(interval);
    }
  }, [isAnalyst]);

  const list2row = (list:IMovie[]) =>{
    return(
        list.map((movie, index)=>{
          return(
            <tr><td>{(index+1)+". "+movie.name}</td></tr>
          )
        })
      
    )
  }

  return(
    <div className="home-page-container">
      <div className="row">
        <div className="column column-1">
          <div className="btn-group">
            <button className="btn-start" onClick={()=>{setIsWorking(true)}}>Start</button>
            <button className="btn-stop" onClick={()=>{setIsWorking(false)}}>Stop</button>
          </div>
          <div className="status-container">
            <div>{isWorking? 'Now Working':'Now Stop'}</div>
          </div>
          <div className="show-log-container">
            <div>
              { 
                result.map((item, index)=>{
                  return(
                    <div key={index} className="my-1-section">
                      <div>{"PostId = "+item.postId}</div>
                      <div>
                        <table>
                        {list2row(item.movielist)} 
                        </table>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="column column-2">
          <div className="btn-group">
            <button className="btn-start" onClick={()=>{setIsAnalyst(true)}}>Start</button>
            <button className="btn-stop" onClick={()=>{setIsAnalyst(false)}}>Stop</button>
          </div>
          <div className="status-container">
            <div className="analyst-status">{isAnalyst? 'Now Analyzing':'Now Stop Analyzing'}</div>
          </div>
          <div className="show-analyst-container">
              <table className="analyst-table">
                { resultAnalyst.map((item, index)=>{
                    return(
                      <tr key={index} className="my-1-section">
                        <td>{item}</td>
                      </tr>
                    )
                  })
                }
              </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;