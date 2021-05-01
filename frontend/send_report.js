function get_report_data(){
  const health_center = document.querySelector('.health_center').value
  const date = document.querySelector('.date').value
  const infected_people = document.querySelector('.number').value
  const report_data={
    'health_center':health_center,
    'date':date,
    'number_infected':infected_people
  }
  return report_data;
}

function validate(report_data){
  //report_data = {'health_center':String,'date':date,'number_infected':Int}
  return 1;
}

async function send_report(url,report_data){
  //report_data = {'health_center':String,'date':date,'number_infected':Int}

　//djangoが受け付ける形式に変換する。本当はdjango側のモデルの定義を年月日で受け付けられるように直したい。
  report_data.date=report_data.date+'T00:00:00+00:00'
  const cookies = document.cookie;
  const csrftoken = getValueFromCookies(cookies,'csrftoken');

  const param = {
    method : 'POST',
    headers : new Headers({'Content-Type': 'application/json','X-CSRFToken': csrftoken}),
    body:JSON.stringify(report_data)
  }

  await fetch(url,param)
  .then(data=>{
    if(data.status===401){
      document.querySelector('.message').innerHTML = '送信されました。'
    }else(
      document.querySelector('.message').innerHTML = '送信できませんでした。'
    )
  })
  .catch((error)=>{console.log('error',error)})

}

function main(){
  const sendBtn_element=document.querySelector('.sendBtn')
  sendBtn_element.addEventListener('click',()=>{
    report_data = get_report_data();
    if(!validate(report_data)){
      return 0;
    }
    send_report(URL,report_data);
  })
}

main()
