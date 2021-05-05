var right = 0;
var wrong = 0;

test()

function test(){
  testIfUrlHttps()
  testIfTokenUrlHttps()
  testIfCookieIsCorrectlyGreped()
  console.log('-------------------')
  console.log('test result...')
  console.log('success case :',right)
  console.log('failed case:',wrong)
  console.log('percentage :',right/(right + wrong))
  console.log('-------------------')
}

//config.js
function testIfUrlHttps(){
  if(URL.indexOf('https://')!==-1){
    right += 1
  }else{
    wrong += 1
    console.log('testIfHttps failed...',wrong/(wrong+right))
  }
}

function testIfTokenUrlHttps(){
  if(GET_TOKEN_URL.indexOf('https://')!==-1){
    right += 1
  }else{
    wrong += 1
    console.log('testIfTokenUrlHttps failed...',wrong/(wrong+right))
  }
}

//mylib.js
function testIfCookieIsCorrectlyGreped(){
  const cookieItems = ` cookie1=asdfasdfasdfasdf;
      cookie2=qwerqwerqwer; cookie3=zxcvzxcvzxcv ;
      cookie4=hslaeksmskaw`
  if(getValueFromCookies(cookieItems , 'cookie2')==='qwerqwerqwer'){
    right += 1
  }else{
    wrong += 1
    console.log('cookie was not correctly greped ...',wrong/(wrong+right))
  }
}

/*-------------------------
  handle_login.js
  ログイン用の関数のテストをどこで書くのがいいのか検討中
-------------------------*/

/*-------------------------
  handle_display.js
  ログインした時に関係する関数のテストをどこで書くのがいいのか検討中
-------------------------*/

/*-------------------------
  send_report.js
  どう書くべきか検討中
-------------------------*/

/*-------------------------
  show_report.js
  どう書くべきか検討中
-------------------------*/

/*-------------------------
  guestuser.js
  どう書くべきか検討中
-------------------------*/
