import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create_event, fetch_events } from '../api';
import flatpickr from 'flatpickr';
import pick from 'lodash/pick';

export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({ name: "", description: "", date: "" });

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(event);
    
    let data = pick(event, ['name', 'description', 'date']);
    create_event(data).then(() => {
      fetch_events();
      history.push("/events");
    });
  }

  function check_name(name) {
    return (!name) ? "Must enter a name" : "";
  }

  function updateName(ev) {
    let p1 = Object.assign({}, event);
    p1["name"] = ev.target.value;
    p1.name_msg = check_name(p1.name);
    setEvent(p1);
  }

  function updateDescription(ev) {
    let p1 = Object.assign({}, event);
    p1["description"] = ev.target.value;
    setEvent(p1);
  }

  function updateDate(ev) {
    let p1 = Object.assign({}, event);
    p1["time"] = ev.target.value;
    setEvent(p1);
  }

  function check_date(date) {
    return (!date) ? "Must enter a date" : "";
  }

  flatpickr('.date', {
    enableTime: true,
    onChange: function(_selected, d, _inst) {
      let p1 = Object.assign({}, event);
      p1["date"] = d;
      p1.date_msg = check_date(p1.date);
      setEvent(p1);
    }
  });

  // Note: File input can't be a controlled input.
  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={onSubmit}>
	  <Form.Group>
	    <Form.Label>Name</Form.Label>
	    <Form.Control type="text"
	                  onChange={updateName}
	                  value={event.name} />
	    <p>{event.name_msg}</p>
	  </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDescription}
                          value={event.description} />
          </Form.Group>
	  <Form.Group>
	    <Form.Label>Date</Form.Label>
	    <Form.Control type="text"
	                  className="date"
	                  onChange={updateDate}
	                  value={event.date} />
	  <p>{event.date_msg}</p>
	  </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
