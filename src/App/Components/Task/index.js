
import React from 'react';
import {TaskCntxtProvider, TaskCntxt, DashBoardCntxtProvider} from './Context';
import TaskList from './Components/TaskList';
import TaskDashboard from './Components/TaskDashboard';
import Header from './Components/Header';
import AddTaskDialog from './Components/AddTaskDialog';
import { GetMethod } from '../../utils/httpRequest';
import './taskStyle.scss';

const RenderTaskPage =()=> {
  const [taskList, setTaskList] = React.useContext(TaskCntxt);
  React.useEffect(()=>{
    GetMethod('tasks', (data)=>{setTaskList(data.tasks)});
},[])
  return (
    <div style={{margin: '1em auto', maxWidth:'60em'}}>
      {!!taskList.length ?
        <>
          <TaskDashboard/>
          <TaskList/>
        </>
        :
        <div className="box-cont no-task">
            <h3>You have no task.</h3>
            <AddTaskDialog/>
        </div>
      }
    </div>
  );
}

const TaskPage =()=>{
  return (
    <>
      <Header/>
        <TaskCntxtProvider>
          <DashBoardCntxtProvider>
            <RenderTaskPage/>
          </DashBoardCntxtProvider>
        </TaskCntxtProvider>
    </>
  );
}


export default TaskPage;

