//ページをリフレッシュした時は必ずログオフ状態にする
tokenLogout()

function tokenAuthentication(){
  const name = document.querySelector('#name_input').value;
  const password = document.querySelector('#password_input').value;
  const data = {'username':name,'password':password};
  const cookies = document.cookie;
  const csrftoken = getValueFromCookies(cookies,'csrftoken')
  const param = {
    method : 'POST',
    mode : 'same-origin',//np-cors, *cors, same-origin
    cache : 'no-cache',//*default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers : new Headers({'Content-Type':'application/json','X-CSRFToken':csrftoken}),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があり
  }

  fetch(GET_TOKEN_URL,param)
  .then(
    res=>{
      if(res.status===200){
        return res.json()
      }else if(res.status!==200){
        console.log('failed, response : ',res.status)
      }
    })
  .then(
    res=>{
      document.cookie='access_token='+res.token//access_token => put into cookie
      return 1;
  })
  .catch((error)=>{
    console.log('fetch function failed...',error);
    //ログイン失敗時に画面にメッセージを表示するのは、handle_login.jsで書きたかった...
    const btn = document.querySelector('#loginBtnMessage')
    btn.innerHTML = 'ログイン失敗'
    return 0;
  })
}

function tokenLogout(){
  document.cookie = 'access_token=; max-age=0'
}

//1秒毎にログイン状態を確認し,ログインしていたら引数として与えた関数を実行
function listenTokenChange(whileLogined,yetToLogin,interval = 500) {
  setInterval(()=> {
    //var cookie = document.cookie;
    const access_token=getValueFromCookies(document.cookie,'access_token')
    if (checkAuthenticated() && (yetToLogin)){
      whileLogined()
    }else if(!checkAuthenticated() && (whileLogined)){
      yetToLogin()
    }
  }, interval);
}

function checkAuthenticated(){
  if(getValueFromCookies(document.cookie,'access_token')==='undefined'){
    return 0;
  }else if(getValueFromCookies(document.cookie,'access_token')!=='undefined'){
    return 1;
  }
}
