const public_page_element = document.querySelector('.public_page')
const URL = 'http://127.0.0.1/api/report/?format=json'
const NUM_HEALTH_CENTER = 5
const DAYS_TO_VISUALIZE = 9

async function fetch_report(
  url
){
  const data = await fetch(url,{
    method:'get',
  })
  const obj = await data.json();
  return obj
}

async function main(){
  //エンドポイントからjsonオブジェクトを取得
  const json_obj= await fetch_report(URL);

  //forループでjsonの要素ごとにアクセスし、保健所ごとの時系列感染者データ配列を作成
  const end = Object.keys(json_obj).length
  const report_of_A = new Array()
  const report_of_B = new Array()
  const report_of_C = new Array()
  const report_of_D = new Array()
  const report_of_E = new Array()

  for(var i=0;i<end;i++){
    switch(json_obj[i]["health_center"]){
      case "A":
        report_of_A.push(json_obj[i]["number_infected"])
        break
      case "B":
        report_of_B.push(json_obj[i]["number_infected"])
        break
      case "C":
        report_of_C.push(json_obj[i]["number_infected"])
        break
      case "D":
        report_of_D.push(json_obj[i]["number_infected"])
        break
      case "E":
        report_of_E.push(json_obj[i]["number_infected"])
        break
    }
  }

  const input_data = {
    'A':report_of_A,
    'B':report_of_B,
    'C':report_of_C,
    'D':report_of_D,
    'E':report_of_E,
  }

  //draw_canvas('graph_A',5,5,280,160,input_data.A)
  //draw_canvas('graph_B',5,5,280,160,input_data.B)
  //draw_canvas('graph_C',5,5,280,160,input_data.C)
  //draw_canvas('graph_D',5,5,280,160,input_data.D)
  //draw_canvas('graph_E',5,5,280,160,input_data.E)

  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(function(){
    drawMultSeries('A_chart',input_data.A)
  });
  google.charts.setOnLoadCallback(function(){
    drawMultSeries('B_chart',input_data.B)
  });
  google.charts.setOnLoadCallback(function(){
    drawMultSeries('C_chart',input_data.C)
  });
  google.charts.setOnLoadCallback(function(){
    drawMultSeries('D_chart',input_data.D)
  });
  google.charts.setOnLoadCallback(function(){
    drawMultSeries('E_chart',input_data.E)
  });

}

function drawMultSeries(
  id,
  input_data
) {
  //see  https://jsfiddle.net/api/post/library/pure/
  //https://developers.google.com/chart/interactive/docs/gallery/columnchart
  const chart_element = document.createElement('div');
  chart_element.setAttribute('id',id);
  public_page_element.appendChild(chart_element)

  var data = new google.visualization.arrayToDataTable([
    ['day','infected'],
    ['1',input_data[0]],
    ['2',input_data[1]],
    ['3',input_data[2]],
    ['4',input_data[3]],
    ['5',input_data[4]],
    ['6',input_data[5]],
    ['7',input_data[6]],
    ['8','3'],
    ['9','10'],
    ['10',input_data[0]],
    ['11',input_data[0]-1],
    ['12',input_data[1]],
    ['13',input_data[2]],
    ['14',input_data[3]],
    ['15',input_data[4]],
    ['16',input_data[5]],
    ['17',input_data[6]],
    ['18','11'],
    ['19','20'],
    ['20',input_data[0]],
    ['21',input_data[0]+1],
    ['22',input_data[1]],
    ['23',input_data[2]],
    ['24',input_data[3]],
    ['25',input_data[4]],
    ['26',input_data[5]],
    ['27',input_data[6]],
    ['28','31'],
    ['29','22'],

  ])

  var options = {
    title: id[0]+'病院における感染者の推移',
    hAxis: {
      title: '観測日',
      viewWindow:{
        min: [0,0,0],
        max: [100,100,100]
      }
    },
    vAxis: {
      title: '感染者数'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById(id));
  chart.draw(data, options);


}














main()
//
