import {useNavigate} from 'react-router-dom';
import {domain} from '../../../utils/httpRequest'

export default function TaskDashboard() {
    let navigate = useNavigate();
   const {name, img} = JSON.parse(sessionStorage.getItem('loginData'));
  return (

    <div className='header-cont'>
    <div
      style={{
        display:'flex',
        maxWidth:'60em',
        margin:'0 auto',
      }}
    >
        <div style={{display:'flex', flex:3, alignItems: 'center'}}>
          <div style={{
            width:'2.5em',
            height:'2.5em',
            backgroundColor:'#6D8187',
            borderRadius: '50%',
            background: `#337ab7 url(${`${domain}${img}`}) no-repeat left top`,
            backgroundSize:'cover',
          }}/>
          <p style={{marginLeft:'1em'}}>{name}</p>
        </div>
        <div style={{flex:1, textAlign:'right'}}>
          <button
            onClick={()=>{
              sessionStorage.clear();
              navigate('/')
            }}
            style={{
              background: 'none',
              color: '#6D8187'
            }}
            >Logout</button>
        </div>
      </div>
    </div>
  );
}
