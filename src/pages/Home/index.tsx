import { FormEvent, useContext, useEffect, useState } from "react";
import { ContainerFooter, ContainerNotes } from "./styles";
import { Note } from "../../services/notes/types";
import Dropdown from 'react-bootstrap/Dropdown';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Card from "react-bootstrap/Card";
import { formatDate } from "../../services/utils";
import { Placeholder } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import NotesContext from "../../contexts/notes";

type NotesType = {
  id: number;
  text: string;
  urgent: boolean;
  date: string;
};
function Home() {
  const { notes, setNotes } = useContext(NotesContext);
  const [editInfo, setEditInfo] = useState<NotesType | null>(null);
  const [formNoteText, setFormNoteText] = useState('');
  const [formNoteUrgent, setFormNoteUrgent] = useState(false);
  const [ sortBy, setSortBy ] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setFormNoteUrgent(false)
    setFormNoteText('');
    setEditInfo(null)
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleRemove = (id: number) => {
    const filteredNotes = notes.filter((notes: NotesType) => notes.id !== id)
    setNotes(filteredNotes);
  }

  const sorBydate = () => {
      // @ts-ignore: Unreachable code error
    return notes.sort((a: any, b: any) => new Date(b.date) - new Date(a.date))
  };

  const sorByPriority = () => notes.sort((a, b) => (a.urgent === true ? 0 : 1) - (b.urgent === true ? 0 : 1));

  const handleSort = (option: string) => {
    switch (option) {
      case 'priority':
        setSortBy('priority')
        setNotes(sorByPriority())
        break;
      case 'date':
        setSortBy('date');
        setNotes(sorBydate())
        break;
    }
  }

  const handleSearch = (value: string) => {
    const newNotes = notes.filter((note) => (note.text).includes(value));
    console.log(newNotes);

    if(newNotes.length > 0) {
      setNotes(newNotes);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editInfo !== null) {
      const newNote = { ...editInfo, text: formNoteText, urgent: formNoteUrgent };
      const filteredNotes = notes.filter((notes: NotesType) => notes.id !== newNote.id)
      setNotes([newNote, ...filteredNotes]);
    } else {
      const newNote = { id: 13, text: formNoteText, urgent: formNoteUrgent, date: '23/12/2022' };
      setNotes([newNote, ...notes])
    }
    handleClose();
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Nota</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Digite o texto da nota"
                value={formNoteText || editInfo?.text}
                onChange={(e) => setFormNoteText(e.currentTarget.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe um texto para a nota
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Text className="text-muted">
                Precisa ter no mínimo 5 caractéres
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Urgent" checked={formNoteUrgent || editInfo?.urgent}
                onChange={() => setFormNoteUrgent(!formNoteUrgent)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Fiap-Notes</Navbar.Brand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '30%' }}>
            <Form.Control
              placeholder="search"
              aria-label="search"
              aria-describedby="basic-addon1"
              onChange={(e) => handleSearch(e.currentTarget.value)}
            />
            <Dropdown onSelect={(e: any) => handleSort(e)} className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                { sortBy || 'sort by' }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="priority">priority</Dropdown.Item>
                <Dropdown.Item eventKey="date">date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button style={{ width: '200px' }} onClick={() => handleShow()}>Nova Nota</Button>
          </div>
        </Container>
      </Navbar>
      <ContainerNotes fluid>
        {
          notes.map((note) => (
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                <Card.Subtitle>
                  {note?.date}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>{note.text}</Card.Text>
              </Card.Body>
              <ContainerFooter>
                {note.urgent && (
                  <span className="material-icons" id="priority">
                    priority_high
                  </span>
                )}
                <span className="material-icons" onClick={() => handleRemove(note.id)}> delete_forever </span>
                <span className="material-icons" onClick={() => {
                  setEditInfo(note);
                  setShow(true);
                }}> edit </span>
              </ContainerFooter>
            </Card>
          ))}
      </ContainerNotes>
    </>
  );
}

export default Home;
