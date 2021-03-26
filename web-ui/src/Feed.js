import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Event({event}) {
  return (
    <Col>
      <Card>
        <Card.Text>
          Organized by {event.user.name}<br />
          {event.description}
        </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({events}) {
  let cards = events.map((event) => <Event event={event} key={event.id} />);
  return (
    <h2>Feed</h2>
    <p><Link to="/posts/new">New Post</Link></p>
    <Row>
      { cards }
    </Row>
  );
}

export default connect(({events}) => ({events}))(Feed);
