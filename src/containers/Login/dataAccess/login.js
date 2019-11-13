function Login(phone) {
  let promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 404) reject(404);
      else if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr);
      }
    };

    xhr.open("POST", `crm/login/login`);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ input: phone }));
  });
  return promise;
}

export default Login;
