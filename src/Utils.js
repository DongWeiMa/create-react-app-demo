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


