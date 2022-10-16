export const domain = 'https://dev-dl.tdcx.com:3092';

export const PostMethod =(endpoint, bodyContent, returnData, returnErr)=>{
    const key = JSON.parse(sessionStorage.getItem('loginData')) && JSON.parse(sessionStorage.getItem('loginData')).token;
    FetchData(
        endpoint,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${key ?? ''}`,
            },
            body:JSON.stringify(bodyContent)
        }
    )
    .then(data=>returnData(data))
    .catch((err)=> typeof returnErr === 'function' && returnErr(err))
};

export const GetMethod =(endpoint,returnData, callback,returnErr)=>{
    FetchData(
        endpoint,
        {
            headers: {
              'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('loginData')).token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
    )
    .then(data=>returnData(data))
    .catch((err)=> typeof returnErr === 'function' && returnErr(err))
    .finally(()=> typeof callback === 'function' && callback())
}

export const PutMethod =(endpoint, bodyContent, returnData,returnErr)=>{
    FetchData(
        endpoint,
        {
            method:'PUT',
            headers: {
              'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('loginData')).token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body:JSON.stringify(bodyContent)
        }
    )
    .then(data=>returnData(data))
    .catch((err)=> typeof returnErr === 'function' && returnErr(err))
}

export const DeleteMethod =(endpoint, returnData, returnErr)=>{
    FetchData(
        endpoint,
        {
            method:'DELETE',
            headers: {
              'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('loginData')).token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
    )
    .then(data=>returnData(data))
    .catch((err)=> typeof returnErr === 'function' && returnErr(err))
}

function FetchData(endpoint,param) {
    return new Promise((resolve, reject) => {
        fetch(
            `${domain}/${endpoint}`,
            param
        )
        .then(res => {
            if(res.status === 200){resolve(res.json())}
            else reject(res);
            
        })
        .catch((err)=> reject(err));
    });
}