class Ajax {
  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  }

  getHeaders = function(withToken) {
    var user = this.state.user || {};
    var authorization = user.authorization;

    if (authorization && authorization.length > 1 && withToken !== false)
      return new Headers({
        "Content-Type": "application/json",
        Authorization: authorization
      });
    else
      return new Headers({
        "Content-Type": "application/json"
      });
  };

  post = function({ path, body }) {
    const url = this.getURL(path);
    var status;
    var headers;
    return fetch(url, {
      headers: this.getHeaders(true),
      body: JSON.stringify(body),
      mode: "cors",
      method: "POST"
    })
      .then(function(response) {
        headers = response.headers;
        status = response.status;
        return response.json();
      })
      .then(response => {
        return this.handleResponse(status, response);
      })
      .catch(err => {
        if (err.handled === null)
          throw new Error(this.transformUnHandledError(err));
        throw err;
      });
  };

  handleResponse = function(status, response) {
    if (status < 400) return Promise.resolve(response);
    else if ((status > 403 && status <= 500) || status == 400) {
      return Promise.reject(this.transformHandledError({ response, status }));
    } else if (status === 401) {
      return this.dispatch({ type: "logout" }); //TODO: permission
    } else if (status === 402) {
      return this.dispatch({ type: "logout" });
    } else if (status === 403) {
      return this.dispatch({ type: "logout" });
    }
    return Promise.reject(this.transformUnHandledError({ status, response }));
  };

  transformHandledError = function({ response, status }) {
    var e = {
      status: status,
      handled: true,
      ...response
    };
    return e;
  };

  transformUnHandledError = function({ response, status }) {
    var e = {
      status: status,
      handled: false,
      ...response
    };
    return e;
  };

  getURL(path) {
    var realParts = [];

    path.split("/").forEach(part => {
      if (part && part.length > 0) realParts.push(part);
    });

    var fullPath;

    if (realParts.length === 2)
      fullPath = `api/${this.state.api}/${realParts[0]}/${realParts[1]}`;
    else if (realParts.length === 3)
      fullPath = `api/${realParts[0]}/${realParts[1]}/${realParts[2]}`;
    else throw new Error("Path is not in correct format " + path);

    if (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "development"
    ) {
      var port = this.state.port;

      return `http://localhost:${port}/${fullPath}`;
    } else return `/${fullPath}`;
  }
}

export default Ajax;
