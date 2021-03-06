import store from './store';

export async function api_get(path) {
    let token = store.getState().session.token;
    let ops = {
      method: 'GET',
      headers: {
        'x-auth': token,
      }
    };
    let text = await fetch("http://events-spa-server.wumbo.casa/api/v1" + path, ops);

    let resp = await text.json();
    return resp.data;
}

export async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://events-spa-server.wumbo.casa/api/v1" + path, opts);
  return await text.json();
}

export function api_login(email, password) {
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function fetch_users() {
    api_get("/users").then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function fetch_events() {
  api_get("/events").then((data) => store.dispatch({
    type: 'events/set',
    data: data,
  }));
}

export function fetch_event(id) {
  api_get("/events/${id}")
}

export function create_user(user) {
  return api_post("/users", {user});
}

export async function create_event(event) {
  let state = store.getState();
  let token = state.session.token;

  let data = new FormData();
  data.append("name", event.name);
  data.append("description", event.description);
  data.append("date", event.date);
  let ops = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    }
  }
  
  let text = await fetch("http://events-spa-server.wumbo.casa/api/v1/events", ops);
  return await text.json();
}

export function load_defaults() {
  fetch_users();
  fetch_events();
}
