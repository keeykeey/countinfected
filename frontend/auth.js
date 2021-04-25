var is_login=false
const loginBtn = document.querySelector('#to_login')

loginBtn.addEventListener('click',()=>{
  //サイドバー
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');
  //メインコンテンツ
  const contents_element = document.querySelector('.contents_title');
  const public_page = document.querySelector('.public_page');
  const reporting_page = document.querySelector('.reporting_page');
  const admin_page = document.querySelector('.admin_page');


  if(is_login){
    is_login=false

    //サイドバー
    to_admin_pageBtn.classList.toggle('is_hiding',true);
    to_reporting_pageBtn.classList.toggle('is_hiding',true);
    loginBtn.innerHTML="ログイン<img class='login_in_icon' src='./icon/login32.png'/>"

    //メインコンテンツ
    public_page.classList.toggle('is_hiding',false)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='最新動向'


  }else{
    displayAuthModalWindow();
    is_login=true

    //サイドバー
    to_admin_pageBtn.classList.toggle('is_hiding',false);
    to_reporting_pageBtn.classList.toggle('is_hiding',false);
    loginBtn.innerHTML="ログアウト<img class='login_out_icon' src='./icon/logout.png'/>"

    //メインコンテンツ
    public_page.classList.toggle('is_hiding',false)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='最新動向'
  }
})

function displayAuthModalWindow(){
  //モーダルウィンドウを作成
  const modalElement = document.createElement('div');
  modalElement.classList.add('modal');

　//モーダルウィンドウの内部を作成
  const innerElement = document.createElement('div');
  innerElement.classList.add('inner');
  innerElement.onclick = function(e){e.stopPropagation()}
  innerElement.innerHTML = `
  <p>ログイン画面</p>
  <label><label><input id='name_input' placeholder='name'></input><br/>
  <label><label><input id='password_input' placeholder='password'></input><br/>
  <label></label><button class='loginBtn'>Login</button><br/>
  `;

  //モーダルウインドウ、その中身を表示できるようにする。
  modalElement.appendChild(innerElement);
  document.body.appendChild(modalElement);

  //モーダルウィンドウ内部の機能を実装,ログイン
  const login_button_element = document.querySelector('.loginBtn')
  login_button_element.addEventListener('click',()=>{
    //closeModalWindow(modalElement);
    const name = document.querySelector('#name_input').value
    const password = document.querySelector('#password_input').value
    console.log('name',name,', password',password)
  })

  //モーダルウィンドウを閉じる
  modalElement.addEventListener('click',()=>{
    document.body.removeChild(modalElement);
  })
}



{/*
var is_login =true;

function main(is_login){
  const loginBtn = document.querySelector('#to_login');
  loginBtn.addEventListener('click',()=>{
    displayAuthModalWindow();
    switchAuthDisplayMode();
  });
}

function displayAuthModalWindow(){
  //モーダルウィンドウを作成
  const modalElement = document.createElement('div');
  modalElement.classList.add('modal');

　//モーダルウィンドウの内部を作成
  const innerElement = document.createElement('div');
  innerElement.classList.add('inner');
  innerElement.innerHTML = `
  <p>ログイン画面</p>
  <label><label><input id='name_input' placeholder='name'></input><br/>
  <label><label><input id='password_input' placeholder='password'></input><br/>
  <label></label><button class='loginBtn'>click</button><br/>
  <label></label><button class='closeBtn'>close</button>
  <div>modal sentence</div>`;

  //モーダルウインドウ、その中身を表示できるようにする。
  modalElement.appendChild(innerElement);
  document.body.appendChild(modalElement);

  //モーダルウィンドウ内部の機能を実装,ログイン
  const login_button_element = document.querySelector('.loginBtn')
  login_button_element.addEventListener('click',()=>{
    //closeModalWindow(modalElement);
    const name = document.querySelector('#name_input').value
    const password = document.querySelector('#password_input').value
    is_login = true;
    console.log(is_login)
  })

  //モーダルウィンドウを閉じる
  const close_button_element = document.querySelector('.closeBtn')
  close_button_element.addEventListener('click',()=>{
    document.body.removeChild(modalElement);
  })
}

function switchAuthDisplayMode(){
  //サイドバー
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');
  //メインコンテンツ
  const contents_element = document.querySelector('.contents_title');
  const public_page = document.querySelector('.public_page');
  const reporting_page = document.querySelector('.reporting_page');
  const admin_page = document.querySelector('.admin_page');


  console.log('switched')
}


main(is_login)

*/}
