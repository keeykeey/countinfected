function get_value_from_cookies(cookies,search_by_this_key){
  const cookieItems = cookies.split(';');
  const obj = [];
  cookieItems.forEach((item)=>{
    const elem = item.split('=');
    const key = elem[0].trim();
    const val = decodeURIComponent(elem[1]);
    obj[key]=val
  })
  return String(obj[search_by_this_key])
}
