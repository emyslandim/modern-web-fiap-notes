import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export const ContainerNotes = styled(Container)`
  height: fit-content;
  padding: 30px;
  flex: 1;

  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ContainerFooter = styled(Card.Footer)`
  display: flex;
  justify-content: space-between;
`;
