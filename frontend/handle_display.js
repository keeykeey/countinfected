//Header element　
const menu_icon = document.querySelector('.menu')
const sidebar_and_contents_element=document.querySelector('.row')
menu_icon.addEventListener('click',()=>{
  sidebar_element.classList.toggle('is_hiding')
})

//ページロード時のメニューバーの表示非表示を取り扱う
menu_icon.classList.toggle('is_hiding',window.innerWidth>=420)

//sidebar elements
const sidebar_element = document.querySelector('.sidebar');
const to_public_pageBtn = document.querySelector('#to_public_page');
const to_admin_pageBtn = document.querySelector('#to_admin_page');
const to_reporting_pageBtn = document.querySelector('#to_reporting_page');

//ページロード時のサイドバーの表示非表示を取り扱う
sidebar_element.classList.toggle('is_hiding',window.innerWidth<420)
//ページロード時は一般公開向けボタンのみを表示する。
if(!is_login){
  to_admin_pageBtn.classList.toggle('is_hiding',true);
  to_reporting_pageBtn.classList.toggle('is_hiding',true);
}

//content elements
const contents_element = document.querySelector('.contents_title');
const public_page = document.querySelector('.public_page');
const reporting_page = document.querySelector('.reporting_page');
const admin_page = document.querySelector('.admin_page');

//ページロード時は一般公開向けページのみを表示する.
public_page.classList.toggle('is_hiding',false);
reporting_page.classList.toggle('is_hiding',true);
admin_page.classList.toggle('is_hiding',true);
contents_element.innerHTML='表示年月を選択';

//ウインドウサイズに応じてsidebar と　menuアイコン　の表示非表示切り替え
window.addEventListener('resize',()=>{
  menu_icon.classList.toggle('is_hiding',window.innerWidth>=420)
  sidebar_element.classList.toggle('is_hiding',window.innerWidth<420);
})

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
