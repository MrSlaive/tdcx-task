import React from 'react';

export const AlertCntxt = React.createContext();
export const AlertCntxtProvider = props =>{
    const [alert, setAlert] = React.useState({
        isErr: false,
        errMsg: '',
    });
    return(
        <AlertCntxt.Provider value={[alert, setAlert]}>
            {props.children}
        </AlertCntxt.Provider>
    );
};