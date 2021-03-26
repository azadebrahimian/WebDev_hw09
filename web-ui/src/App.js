import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import UsersList from './Users/List';
import UsersNew from './Users/New';
import EventsNew from './Events/New';
import EventsShow from './Events/Show';
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
	<Route path="/events/new" exact>
	  <EventsNew />
	</Route>
	<Route path="/events/:id" component={EventsShow} exact />
      </Switch>
    </Container>
  );
}

export default App;
