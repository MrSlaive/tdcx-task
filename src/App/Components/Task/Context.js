import React from 'react';

export const TaskCntxt = React.createContext();
export const TaskCntxtProvider = props =>{
    const [taskList, setTaskList] = React.useState([]);
    return(
        <TaskCntxt.Provider value={[taskList, setTaskList]}>
            {props.children}
        </TaskCntxt.Provider>
    );
};

export const DashBoardCntxt = React.createContext();
export const DashBoardCntxtProvider = props =>{
    const [dashBoardObj, setdashBoardObj] = React.useState({});
    return(
        <DashBoardCntxt.Provider value={[dashBoardObj, setdashBoardObj]}>
            {props.children}
        </DashBoardCntxt.Provider>
    );
};
