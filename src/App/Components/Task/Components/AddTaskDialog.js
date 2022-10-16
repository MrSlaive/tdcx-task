import React from 'react'
import { TaskCntxt, DashBoardCntxt} from '../Context';
import { LoadCntxt } from '../../../Context';
import { PostMethod, GetMethod } from '../../../utils/httpRequest';
import ModalDialog from '../../ModalDialog'

const AddTaskDialog =()=>{
    const [addTask, setAddTask] = React.useState(false);
    const [, setTaskList] = React.useContext(TaskCntxt);
    const [, setdashBoardObj] = React.useContext(DashBoardCntxt);
    const [, setLoad] = React.useContext(LoadCntxt);
    const taskName = React.useRef();
    const handleCreateTask =()=>{
        setLoad(true);
        PostMethod(
            'task',
            {name: taskName.current.value},
            ()=>{
                GetMethod('tasks', (data)=>setTaskList(data.tasks));
                GetMethod('dashboard', (data)=>{setdashBoardObj(data)});
                setAddTask(false);
                setLoad(false);
            },
        );
    }
    return(
        <>
            <button onClick={()=>setAddTask(true)}>+ New Task</button>
            <ModalDialog
                modalState = {addTask}
                setModalState = {(state)=>setAddTask(state)}
                modalCont = {
                    <>
                        <h3 style={{marginTop:0,textAlign:'left'}}>+ New Task</h3>
                        <input type='text' placeholder='Task Name' ref={taskName}/>
                        <button onClick={handleCreateTask}>+ New Task</button>
                    </>
                }
            />
        </>
    )
}

export default AddTaskDialog;
