import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import UsersList from './Users/List';
import UsersNew from './Users/New';
import EventsNew from './Events/New';
import './App.scss';
import Nav from "./Nav";
import Feed from "./Feed";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
	  <Feed />
	</Route>
	<Route path="/users" exact>
          <UsersList />
	</Route>
	<Route path="/users/new" exact>
          <UsersNew />
	</Route>
      </Switch>
    </Container>
  );
}

export default App;
