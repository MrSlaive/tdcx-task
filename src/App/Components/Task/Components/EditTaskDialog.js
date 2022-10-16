import React from 'react';
import { ReactComponent as EditIcon } from '../img/pen-solid.svg';
import { TaskCntxt, DashBoardCntxt} from '../Context';
import { PutMethod, GetMethod } from '../../../utils/httpRequest';
import ModalDialog from '../../ModalDialog'

const EditTaskDialog =({taskId})=>{
    const [openEdit, setOpenEditTask] = React.useState(false);
    const [taskName, setTaskName] = React.useState('');
    const [taskList, setTaskList] = React.useContext(TaskCntxt);
    const [, setdashBoardObj] = React.useContext(DashBoardCntxt);
    const handleEditTask =()=>{
        PutMethod(
            `tasks/${taskId}`,
            {name : taskName},
            ()=>{
                GetMethod('tasks', (data)=>setTaskList(data.tasks));
                GetMethod('dashboard', (data)=>{setdashBoardObj(data)});
                setOpenEditTask(false);
            },
        );
    }
    const searchObj=(taskId)=>{
        const rslt = taskList.filter(obj => obj._id.includes(taskId));
        setTaskName(rslt[0].name)
    }
    const handleOpenModal=()=>{
        searchObj(taskId);
        setOpenEditTask(true);
    }
    return(
        <>
            <button style={{background: 'none'}} onClick={handleOpenModal}><EditIcon/></button>
            <ModalDialog
                modalState = {openEdit}
                setModalState = {(state)=>setOpenEditTask(state)}
                modalCont = {
                    <>
                        <h3 style={{marginTop:0,textAlign:'left'}}>Edit Task</h3>
                        <input type='text' value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
                        <button onClick={handleEditTask}>+ Edit Task</button>
                    </>
                }
            />
        </>
    )
}

export default EditTaskDialog;