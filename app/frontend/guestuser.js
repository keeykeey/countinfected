function guestuser(){
  const sidebar = document.querySelector('.sidebar')
  const guestLoginBtn = document.createElement('button')
  guestLoginBtn.classList.add('switch_content')
  guestLoginBtn.innerText='Guest Login'
  guestLoginBtn.addEventListener('click',()=>{
    guestLogin('testuser1','pwofguest1')
  })

  if(!checkAuthenticated()){
    sidebar.appendChild(guestLoginBtn)
  }

  function hideEl(){
    guestLoginBtn.classList.toggle('is_hiding',true)
  }
  function showEl(){
    guestLoginBtn.classList.toggle('is_hiding',false)
  }

  listenTokenChange(hideEl,showEl,500)
}

function guestLogin(name,password){
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
  .catch((error)=>{console.log('fetch function failed...',error);return 0;})

}

guestuser()
