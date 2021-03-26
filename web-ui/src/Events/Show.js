import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fetch_event } from '../api';

export default function EventsShow({ eve }) {
  const [event, setEvent] = useState({});
  let history = useHistory();
  let ev = eve.params.id;

  async function getEvent() {
    let response = await fetch_event(ev);
    console.log("efffffff");
    console.log(response);
    setEvent(response);
  }

  useEffect(() => {
    getEvent();
  }, [])

  return (
    <div>
      <h2>Yo</h2>
    </div>
  );
}
