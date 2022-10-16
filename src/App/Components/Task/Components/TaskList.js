import React from 'react'
import { ReactComponent as DeleteIcon } from '../img/trash-solid.svg';
import searchIcon from '../img/search-solid.svg';
import AddTaskDialog from './AddTaskDialog';
import EditTaskDialog from './EditTaskDialog';
import { TaskCntxt,DashBoardCntxt } from '../Context';
import { PutMethod, GetMethod, DeleteMethod } from '../../../utils/httpRequest';

const RenderTaskList =({taskData})=>{
    const [, setTaskList] = React.useContext(TaskCntxt);
    const [, setdashBoardObj] = React.useContext(DashBoardCntxt);
    const handleRefetch=()=>{
        GetMethod('tasks', (data)=>setTaskList(data.tasks));
        GetMethod('dashboard', (data)=>{setdashBoardObj(data);});
    }
    const handleCheckTask = (task)=>{
        PutMethod(
            `tasks/${task._id}`,
            {completed : !task.completed},
            ()=>{handleRefetch()},
        );
    }
    const handleDeleteTask =(id)=>{
        DeleteMethod(
            `tasks/${id}`,
            ()=>{ handleRefetch()},
        );
    }
    return(
        <>
            {!!taskData.length ? taskData.map((itm)=>(
                <div key={itm._id} className='task-list'>
                    <div>
                        <input
                            type="checkbox"
                            id={itm._id}
                            name={`task_${itm._id}`}
                            checked={itm.completed}
                            onChange={()=>handleCheckTask(itm)}
                        /></div>
                    <div>
                        <label
                            htmlFor={itm._id}
                            style={{
                                textDecoration: !!itm.completed  ? 'line-through' : 'none',
                                color: !!itm.completed  ? '#537178' : '#5285EC',

                            }}
                            > {itm.name}
                        </label>
                    </div>
                    <div>
                        <EditTaskDialog taskId={itm._id}/>
                        <button style={{background: 'none'}} onClick={()=>handleDeleteTask(itm._id)}><DeleteIcon/></button>
                    </div>
                </div>
                ))
                :
                <h3>No Data</h3>
            }
        </>
    );
}

 const TaskList =()=> {
    const [taskList] = React.useContext(TaskCntxt);
    const [taskData, setTaskData] = React.useState(taskList);
    const searchInObject=(searchTxt)=>{
        const rslt = taskList.filter(obj => obj.name.toLowerCase().includes(searchTxt.toLowerCase()));
        setTaskData(rslt);
    }
    React.useEffect(()=>{setTaskData(taskList)},[taskList])
  return (
    <div className="tasklist-cont">
        <div className='tool-bar'>
            <div>
                <h3>Task</h3>
            </div>
            <div style={{textAlign: 'right'}}>
                <input
                    type='text'
                    onChange={(e)=>searchInObject(e.target.value)} placeholder='Search by task name'
                    style={{
                        marginRight:'1em',
                        paddingLeft: '25px',
                        background: `#D9DFEB url(${searchIcon}) no-repeat left`,
                        backgroundSize: '20px'
                    }}
                />
                <AddTaskDialog/>
            </div>
        </div>
        <div className='box-cont'>
            <RenderTaskList taskData={taskData}/>
        </div>
    </div>
  );
}

export default TaskList;
