function whileLogined(){
  //サイドバー
  const to_public_pageBtn = document.querySelector('#to_public_page');
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');
  const to_login_Btn = document.querySelector('#to_login');
  const to_logout_Btn = document.querySelector('#to_logout');

  to_admin_pageBtn.classList.toggle('is_hiding',false);
  to_reporting_pageBtn.classList.toggle('is_hiding',false);
  to_login_Btn.classList.toggle('is_hiding',true);
  to_logout_Btn.classList.toggle('is_hiding',false);
}

function yetToLogin(){
  //サイドバー
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');
  const to_login_Btn = document.querySelector('#to_login');
  const to_logout_Btn = document.querySelector('#to_logout');

  to_admin_pageBtn.classList.toggle('is_hiding',true);
  to_reporting_pageBtn.classList.toggle('is_hiding',true);
  to_login_Btn.classList.toggle('is_hiding',false);
  to_logout_Btn.classList.toggle('is_hiding',true);

  //content
  const contents_element = document.querySelector('.contents_title');
  const public_page = document.querySelector('.public_page');
  const reporting_page = document.querySelector('.reporting_page');
  const admin_page = document.querySelector('.admin_page');
  public_page.classList.toggle('is_hiding',false);
  reporting_page.classList.toggle('is_hiding',true);
  admin_page.classList.toggle('is_hiding',true);
  contents_element.innerHTML='表示年月を選択';

  return 0
}

listenTokenChange(whileLogined,yetToLogin)

//
//ページロード時の画面表示は一般公開向けのページのみとする
function loadWindow(){
  //sidebar
  const to_public_pageBtn = document.querySelector('#to_public_page');
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');
  const to_login_Btn = document.querySelector('#to_login');
  const to_logout_Btn = document.querySelector('#to_logout');

  to_admin_pageBtn.classList.toggle('is_hiding',true);
  to_reporting_pageBtn.classList.toggle('is_hiding',true);
  to_login_Btn.classList.toggle('is_hiding',false);
  to_logout_Btn.classList.toggle('is_hiding',true);


  //content
  const contents_element = document.querySelector('.contents_title');
  const public_page = document.querySelector('.public_page');
  const reporting_page = document.querySelector('.reporting_page');
  const admin_page = document.querySelector('.admin_page');
  public_page.classList.toggle('is_hiding',false);
  reporting_page.classList.toggle('is_hiding',true);
  admin_page.classList.toggle('is_hiding',true);
  contents_element.innerHTML='表示年月を選択';
}

loadWindow()

//
//handle window size change
function handleWindowSizeChange(){
  const menu_icon = document.querySelector('.menu')
  const sidebar_and_contents_element=document.querySelector('.row')

  //ウインドウサイズが小さくなる時に必要な挙動なので、handleWindowSizeChange関数内に記述した。
  menu_icon.addEventListener('click',()=>{
    sidebar_element.classList.toggle('is_hiding')
  })

  //ウインドウサイズに応じてsidebar と　menuアイコン　の表示非表示切り替え
  const sidebar_element = document.querySelector('.sidebar');
  window.addEventListener('resize',()=>{
    menu_icon.classList.toggle('is_hiding',window.innerWidth>=420)
    sidebar_element.classList.toggle('is_hiding',window.innerWidth<420);
  })

  //ページロード時のメニューバーの表示非表示を取り扱う。
  menu_icon.classList.toggle('is_hiding',window.innerWidth>=420)
}

handleWindowSizeChange()

//
//sidebar click
function handleSwitchContentPage(){
  const to_public_pageBtn = document.querySelector('#to_public_page');
  const to_admin_pageBtn = document.querySelector('#to_admin_page');
  const to_reporting_pageBtn = document.querySelector('#to_reporting_page');

  const contents_element = document.querySelector('.contents_title');
  const public_page = document.querySelector('.public_page');
  const reporting_page = document.querySelector('.reporting_page');
  const admin_page = document.querySelector('.admin_page');

  to_public_pageBtn.addEventListener('click',()=>{
    public_page.classList.toggle('is_hiding',false)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='表示年月を選択'
  })

  to_reporting_pageBtn.addEventListener('click',()=>{
    public_page.classList.toggle('is_hiding',true)
    reporting_page.classList.toggle('is_hiding',false)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='保健所担当者用ページ'
  })

  to_admin_pageBtn.addEventListener('click',()=>{
    public_page.classList.toggle('is_hiding',true)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',false)
    contents_element.innerHTML='管理者用ページ'
  })
}

handleSwitchContentPage()

//
//ログインボタン、ログアウトボタン
function handleLoginBtn(){
  const loginBtn = document.querySelector('#to_login')
  loginBtn.addEventListener('click',()=>{
    if(checkAuthenticated()){
      return 0;
    }else{
      displayAuthModalWindow()
    }
  })
}

handleLoginBtn()

function handleLogoutBtn(){
  const logoutBtn = document.querySelector('#to_logout')
  logoutBtn.addEventListener('click',()=>{
    if(checkAuthenticated()){
      tokenLogout()
    }else{
      return 0;
    }
  })
}

handleLogoutBtn()

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
  <label></label><div class='message' id='loginBtnMessage'></div>
  `;

  //モーダルウインドウ、その中身を表示できるようにする。
  modalElement.appendChild(innerElement);
  document.body.appendChild(modalElement);

  //モーダルウィンドウ内部の機能を実装,ログイン
  const login_button_element = document.querySelector('.loginBtn')
  login_button_element.addEventListener('click',()=>{
    const promise = new Promise(function(resolve,reject){
    })
    promise.then(
      tokenAuthentication()
    ).then(
      setTimeout(function(){
        if(checkAuthenticated()){
          document.body.removeChild(modalElement)
        }
      },500)
    )
  })

  //モーダルウィンドウを閉じる
  modalElement.addEventListener('click',()=>{
    document.body.removeChild(modalElement);
  })

}
