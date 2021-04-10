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
    loginBtn.innerHTML="ログイン<img class='login_out_icon' src='./icon/login32.png'/>"

    //メインコンテンツ
    public_page.classList.toggle('is_hiding',false)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='最新動向'


  }else{
    is_login=true

    //サイドバー
    to_admin_pageBtn.classList.toggle('is_hiding',false);
    to_reporting_pageBtn.classList.toggle('is_hiding',false);
    loginBtn.innerHTML="ログアウト<img class='login_out_icon' src='./icon/login32.png'/>"

    //メインコンテンツ
    public_page.classList.toggle('is_hiding',false)
    reporting_page.classList.toggle('is_hiding',true)
    admin_page.classList.toggle('is_hiding',true)
    contents_element.innerHTML='最新動向'
  }
})
