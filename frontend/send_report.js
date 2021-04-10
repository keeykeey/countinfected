const sendBtn_element=document.querySelector('.sendBtn')
sendBtn_element.addEventListener('click',()=>{
  const health_center = document.querySelector('.health_center').value
  const date = document.querySelector('.date').value
  const infected_people = document.querySelector('.number').value
  console.log(health_center,date,infected_people)
})
