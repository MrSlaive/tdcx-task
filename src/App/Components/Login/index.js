import React from 'react';
import {useNavigate} from 'react-router-dom';
import { PostMethod } from '../../utils/httpRequest';
import { AlertCntxt } from '../../Context';
import { LoadCntxt } from '../../Context';
import Skeleton from 'react-loading-skeleton';
import './loginStyle.scss';

export default function LoginPage() {
  const [, setAlert] = React.useContext(AlertCntxt);
  const [load, setLoad] = React.useContext(LoadCntxt);
  // const [loginObj, setLoginObj] = React.useState({apiKey:'35223f17179b0a2e',name:'John Doe'});
  const [loginObj, setLoginObj] = React.useState({apiKey:'',name:''});
  const {apiKey, name} = loginObj;
   let navigate = useNavigate();
    const handleLogin = ()=>{
      setLoad(true);
        PostMethod(
            'login',
            {name, apiKey},
            (data)=>{
                sessionStorage.setItem('loginData', JSON.stringify({...data.token,img: data.image}));
                setTimeout(()=> navigate('/task'), 500);
                setLoad(false);
            },
            (err)=> {
              setAlert({isErr: true, errMsg:`${err.status}: ${err.statusText}`});
              setLoad(false);
            }
        );
    }
    const handleInput=(e)=>{
      setLoginObj({...loginObj, [e.target.name] : e.target.value});
    }
  return (
    <div className="box-cont login-cont">
        <h3>Login</h3>
        {!!load ?
          <>
          <Skeleton count={3} style={{height:'2.3em', margin:'.5em 0'}}/>
          </>
          :
          <>
            <input type='text' name='apiKey' value={apiKey} onChange={handleInput} placeholder='Id'/>
            <input type='text' name='name' value={name} onChange={handleInput} placeholder='Name'/>
            <button onClick={handleLogin}>Login</button>
          </>
        }
    </div>
  );
}

