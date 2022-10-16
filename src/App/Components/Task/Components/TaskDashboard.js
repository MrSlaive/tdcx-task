import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { GetMethod } from '../../../utils/httpRequest'
import { DashBoardCntxt } from '../Context';

const TaskChart =({completed, totalTasks})=>{
  const completeTask = (completed/totalTasks)*100 || 0;
  const pieData = [
    { title: 'Completed', value: completeTask, color: '#5285EC' },
    { title: 'none', value: 100-completeTask, color: '#F4F4F6' },
  ];
    return(
        <PieChart
            data={pieData}
            startAngle={280}
            viewBoxSize={[100, 100]}
            // label={({ dataEntry }) => dataEntry.title === 'none' ? '' : dataEntry.title }
            // labelStyle={(index) => ({
                // fill: pieData[index].color,
            //     fill: '#000',
            //     fontSize: '5px',
            //   })}
            // labelPosition={100}
            radius={35}
        />
    );
}

const TaskCount =({completed, totalTasks})=>{
    return(
      <>
        <h3 style={{marginTop:0}}>Tasks Completed</h3>
        <h1
          style={{
            color:'#5285ec',
            fontWeight:400,
            fontSize:'400%',
            margin:0
          }}>
            {completed}<small style={{fontSize:'30%', color:'#8F9EA2'}}>/{totalTasks}</small>
          </h1>
      </>
    );
}

const LatestTaskList =({latestTasks})=>{
    return(
      <>
        <h3 style={{marginTop:0}}>Latest Created Task</h3>
        <ul style={{ paddingInlineStart: '1em', margin:0 }}>
          {latestTasks.map(itm=>(
            <li
              style={{
                textDecoration: !!itm.completed  ? 'line-through' : 'none'
              }}
              key={itm._id}
            ><p style={{
              margin: '.5em 0',
              overflow: 'hidden',
              maxWidth:'17vw',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{itm.name}</p></li>)
          )}
        </ul>
      </>
    );
}

export default function TaskDashboard() {
    const [dashBoardObj, setdashBoardObj] = React.useContext(DashBoardCntxt);
    const {tasksCompleted, totalTasks, latestTasks}= dashBoardObj;
    React.useEffect(()=>{
        GetMethod('dashboard', (data)=>{setdashBoardObj(data)});
    },[])
  return (
    <div className='taskdash-cont'>
      <div className="box-cont">
          {!!totalTasks &&
            <TaskCount completed={tasksCompleted} totalTasks={totalTasks}/>
          }
      </div>
      <div className="box-cont">
          {!!latestTasks &&
            <LatestTaskList latestTasks={latestTasks}/>
          }
      </div>
      <div style={{padding:'0'}} className="box-cont">
          <TaskChart completed={tasksCompleted} totalTasks={totalTasks}/>
      </div>
    </div>
  );
}
