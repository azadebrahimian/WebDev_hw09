import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Feed({events}) {
  return (
    <div>
      <h2>Feed</h2>
      <p><Link to="/events/new">New Event</Link></p>
    </div>
  );
}

export default connect(({events}) => ({events}))(Feed);
