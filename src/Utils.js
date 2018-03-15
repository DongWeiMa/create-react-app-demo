export function parseJSON(response) {
    return response.json();
}

export function checkStatus(response) {
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
        /*  let result = response.json();
          let code = result.code;
          console.log(result);
          console.log("code"+code);
          if (code === "200"||code===200) {
              return response;
          }*/
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function  getTime(d) {
    let date = new Date(d);
    console.log(date.getUTCDate());
    let Y = date.getUTCFullYear() + '-';
    let M = (date.getUTCMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getUTCDate() + ' ';
    let h = date.getUTCHours() + ':';
    let m = date.getUTCMinutes() + ':';
    let s = date.getUTCSeconds();
    console.log(Y+M+D+h+m+s); //呀麻碟
    return Y+M+D+h+m+s;
}


