import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {AlertCntxtProvider, AlertCntxt} from './Context';
import Login from './Components/Login';
import Task from './Components/Task';
import ModalDialog from './Components/ModalDialog';
import './App.scss';

const RenderRoute = ()=>{
  const [alert, setAlert] = React.useContext(AlertCntxt);
  const PrivateRoute = ({children}) => {
    return !!sessionStorage.getItem('loginData') ? children : <Navigate to="/" />;
  };

  return(
    <>
      <ModalDialog
        modalState = {alert.isErr}
        setModalState = {(state)=>setAlert({isErr: state, errMsg: ''})}
        modalCont = {
            <>
                <h3 style={{textAlign:'center', color:'#f2790e'}}>
                  Oops, Something went wrong<br/>
                  <small style={{fontSize:'70%'}}>{alert.errMsg}</small>
                </h3>
            </>
        }
      />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/task" element={<PrivateRoute><Task /></PrivateRoute>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="app-cont">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AlertCntxtProvider>
          <RenderRoute/>
        </AlertCntxtProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
