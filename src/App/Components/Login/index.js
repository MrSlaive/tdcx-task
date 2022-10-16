import React from 'react';
import {useNavigate} from 'react-router-dom';
import { PostMethod } from '../../utils/httpRequest';
import { AlertCntxt } from '../../Context';
import './loginStyle.scss';

export default function LoginPage() {
  const [, setAlert] = React.useContext(AlertCntxt);
  // const [loginObj, setLoginObj] = React.useState({apiKey:'35223f17179b0a2e',name:'John Doe'});
  const [loginObj, setLoginObj] = React.useState({apiKey:'',name:''});
  const {apiKey, name} = loginObj;
   let navigate = useNavigate();
    const handleLogin = ()=>{
        PostMethod(
            'login',
            {name, apiKey},
            (data)=>{
                sessionStorage.setItem('loginData', JSON.stringify({...data.token,img: data.image}));
                setTimeout(()=> navigate('/task'), 500);
            },
            (err)=> setAlert({isErr: true, errMsg:`${err.status}: ${err.statusText}`})
        );
    }
    const handleInput=(e)=>{
      setLoginObj({...loginObj, [e.target.name] : e.target.value});
    }
  return (
    <div className="box-cont login-cont">
        <h3>Login</h3>
        <input type='text' name='apiKey' value={apiKey} onChange={handleInput} placeholder='Id'/>
        <input type='text' name='name' value={name} onChange={handleInput} placeholder='Name'/>
        <button onClick={handleLogin}>Login</button>
    </div>
  );
}

