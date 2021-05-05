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
  //const sidebar_and_contents_element=document.querySelector('.row')
  //console.log('size',sidebar_and_contents_element.clientWidth)

  //ウインドウサイズが小さくなる時に必要な挙動なので、handleWindowSizeChange関数内に記述した。
  menu_icon.addEventListener('click',()=>{
    sidebar_element.classList.toggle('is_hiding')
  })

  //ウインドウサイズに応じてsidebar と　menuアイコン　の表示非表示切り替え
  //どういう時に何が表示になるか、非表示になるかのロジックが読み取りにくいかもしれない。書き方改善できるかもしれない。
  const sidebar_element = document.querySelector('.sidebar');
  window.addEventListener('resize',()=>{
    menu_icon.classList.toggle('is_hiding',window.innerWidth>=420);
    sidebar_element.classList.toggle('is_hiding',window.innerWidth<420);
    if(sidebar_element.clientWidth<120){
      sidebar_element.classList.toggle('is_hiding',true)
      menu_icon.classList.toggle('is_hiding',false)
    }
  })

  //リサイズ時だけではなく、ページロード時においてもメニューバーの表示非表示を取り扱う。
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
  <label><label><input type='password' id='password_input' placeholder='password'></input><br/>
  <label></label><button class='loginBtn'>Login</button>
  <div class='message' id='loginBtnMessage'></div>
  `;

  //モーダルウインドウ、その中身を表示できるようにする。
  modalElement.appendChild(innerElement);
  document.body.appendChild(modalElement);
  improveInputUI()

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

function improveInputUI(message){
  const inputEl =document.querySelectorAll('input')

  inputEl.forEach(node=>node.addEventListener('keydown',(event)=>{
    const inputed_char = node.value
    const key_code = String(event.code)
    //入力する文字(node.value.slice(-1))は、setTimeout関数の中で、時間差でputting_charに代入しないと、nullが代入されてしまう。
    setTimeout(()=>{
      const putting_char = node.value.slice(-1)
      switch(key_code.slice(0,3)){
        case 'Ent'://'enter'
          break
        case 'Esc'://'escape'
          break
        case 'Tab':
          break
        case 'Cap'://'caps lock'
          break
        case 'Shi'://'shift'
          break
        case 'Con'://'control'
          break
        case 'Alt'://'option'
          break
        case 'Met'://'command'
          break
        case 'Arr'://'Arrow(left, right, up, or down)'

        case 'Bac'://'backspace' or 'delete' button
          if (key_code ==='backspace'){
            return 0;//node.value = inputed_char.slice(0,-1)等と処理を書かなくても、デフォルトで文字がバックされる。
          }else if(key_code === 'backquote'){
            node.value = inputed_char + putting_char
          }
          break
        default :
          node.value = inputed_char + putting_char
      }
    },50)
  }))
}
improveInputUI()
