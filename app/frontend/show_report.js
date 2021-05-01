async function fetch_report(
  url
){
  const data = await fetch(url,{
    method:'get',
  })
  const obj = await data.json();
  return obj
}

function drawMultSeries(
  id,
  input_data
) {
  //see  https://jsfiddle.net/api/post/library/pure/
  //https://developers.google.com/chart/interactive/docs/gallery/columnchart

  const public_page_element = document.querySelector('.public_page')
  const chart_element = document.createElement('div');
  chart_element.setAttribute('class','chart_element')
  chart_element.setAttribute('id',id);
  public_page_element.appendChild(chart_element)

  const data = new google.visualization.arrayToDataTable([
    ['day','感染者数'],
    ['1',input_data[0]],
    ['2',input_data[1]],
    ['3',input_data[2]],
    ['4',input_data[3]],
    ['5',input_data[4]],
    ['6',input_data[5]],
    ['7',input_data[6]],
    ['8',input_data[7]],
    ['9',input_data[8]],
    ['10',input_data[9]],
    ['11',input_data[10]],
    ['12',input_data[11]],
    ['13',input_data[12]],
    ['14',input_data[13]],
    ['15',input_data[14]],
    ['16',input_data[15]],
    ['17',input_data[16]],
    ['18',input_data[17]],
    ['19',input_data[18]],
    ['20',input_data[19]],
    ['21',input_data[20]],
    ['22',input_data[21]],
    ['23',input_data[22]],
    ['24',input_data[23]],
    ['25',input_data[24]],
    ['26',input_data[25]],
    ['27',input_data[26]],
    ['28',input_data[27]],
    ['29',input_data[28]],
    ['30',input_data[29]],
    ['31',input_data[30]],
  ])

  //月末の31日など、存在しない日数を削除。
  var i =30;
  while (!input_data[i]){
    data.removeRow(i)
    i--;
    if(i<0){
      break;
    }
  }

  var options = {
    title: id+'の報告する感染者数の推移',
    hAxis: {
      title: '日',
      viewWindow:{
        min: [0,0,0],
        max: [100,100,100]
      },
    },
    vAxis: {
      title: '報告感染者数'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById(id));
  chart.draw(data, options);
}

async function main(){
  //エンドポイントからjsonオブジェクトを取得
  const json_obj= await fetch_report(URL);

  //JSONデータのうち、ユーザーが選択した年、月のデータをArrayに格納
  document.querySelectorAll('.ym_selector').forEach(node=>node.addEventListener('change',()=>{

    //forループでjsonの要素ごとにアクセスし、保健所ごとの時系列感染者データ配列を作成
    const end = Object.keys(json_obj).length
    const report_of_A = new Array(30).fill(0)
    const report_of_B = new Array(30).fill(0)
    const report_of_C = new Array(30).fill(0)
    const report_of_D = new Array(30).fill(0)
    const report_of_E = new Array(30).fill(0)

    const year_selected = document.getElementById('yyyy').value//'2021';
    const month_selected = document.getElementById('mm').value//'04';

    if(!(year_selected && month_selected)){
      return 0;//年、月どちらかが選択されていなければ終了
    }

    for(var i=0;i<end;i++){
      const year_in_array = String(json_obj[i]['date'].slice(0,4));
      const month_in_array = String(json_obj[i]['date'].slice(5,7));
      const day_in_array = Number(json_obj[i]['date'].slice(8,10));
      if(
        (year_selected===year_in_array) &&
        (month_selected===month_in_array)
      ){
        switch(json_obj[i]["health_center"]){
          case "A":
            report_of_A[day_in_array-1]=(json_obj[i]["number_infected"])
            break
          case "B":
            report_of_B[day_in_array-1]=(json_obj[i]["number_infected"])
            break
          case "C":
            report_of_C[day_in_array-1]=(json_obj[i]["number_infected"])
            break
          case "D":
            report_of_D[day_in_array-1]=(json_obj[i]["number_infected"])
            break
          case "E":
            report_of_E[day_in_array-1]=(json_obj[i]["number_infected"])
            break
        }
      }
    }

    const input_data = {
      'A':report_of_A,
      'B':report_of_B,
      'C':report_of_C,
      'D':report_of_D,
      'E':report_of_E,
    }

    google.charts.load('current', {packages: ['corechart', 'bar']});
    if(year_selected && month_selected){
      google.charts.setOnLoadCallback(function(){
        drawMultSeries('A保健所',input_data.A)});
      google.charts.setOnLoadCallback(function(){
        drawMultSeries('B保健所',input_data.B)});
      google.charts.setOnLoadCallback(function(){
        drawMultSeries('C保健所',input_data.C)});
      google.charts.setOnLoadCallback(function(){
        drawMultSeries('D保健所',input_data.D)});
      google.charts.setOnLoadCallback(function(){
        drawMultSeries('E保健所',input_data.E)});
    }
  }))
}

main()
