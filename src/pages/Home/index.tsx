import { FormEvent, useEffect, useState } from "react";
// import Modal from "../../components/Modal";
import { NotesService } from "../../services/notes/note-service";
import { ContainerFooter, ContainerNotes } from "./styles";
import { Note } from "../../services/notes/types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Card from "react-bootstrap/Card";
import { formatDate } from "../../services/utils";
import { Placeholder } from "react-bootstrap";

import Form from "react-bootstrap/Form";

function Home() {
  const [notes, setNotes] = useState<Note[]>([] as Note[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await NotesService.getNotes();

      setNotes(response.data);
      setIsLoading(false);
    })();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Nota</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Digite o texto da nota"
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
              <Form.Check type="checkbox" label="Urgent" />
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

          <Button onClick={() => handleShow()}>Nova Nota</Button>
        </Container>
      </Navbar>
      <ContainerNotes fluid>
        {isLoading ? (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                <Placeholder as={Card.Subtitle} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </Card.Header>
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                </Placeholder>
              </Card.Body>
              <ContainerFooter>
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              </ContainerFooter>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                <Placeholder as={Card.Subtitle} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </Card.Header>
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                </Placeholder>
              </Card.Body>
              <ContainerFooter>
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              </ContainerFooter>
            </Card>
          </>
        ) : (
          notes.map((note) => (
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                <Card.Subtitle>
                  {formatDate(new Date(note?.date))}
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
                <span className="material-icons"> delete_forever </span>
              </ContainerFooter>
            </Card>
          ))
        )}
      </ContainerNotes>
    </>
  );
}

export default Home;
