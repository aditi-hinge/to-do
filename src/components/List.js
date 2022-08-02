import React from "react";
import Styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { mobile } from "./responsive";

export default function List({ items, removeItem, editTask }) {
  return (
    <Container>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <ItemContainer key={id}>
            <Title>{title}</Title>
            <ButtonContainer>
              <EditButton type="button">
                <FaEdit onClick={() => editTask(id)} />
              </EditButton>
              <DeleteButton type="button">
                <FaTrash onClick={() => removeItem(id)} />
              </DeleteButton>
            </ButtonContainer>
          </ItemContainer>
        );
      })}
    </Container>
  );
}

const Container = Styled.div`
`;

const ItemContainer = Styled.div`
  background-color: white;
  width: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4em;
  border-radius: 7px;
  margin-bottom: 5px;
  font-size: 1.3rem;

  ${mobile({
    width: "80vw"
  })}
`;

const EditButton = Styled.button`
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  color: green;
  margin-right: 0.7em;
`;
const DeleteButton = Styled.button`
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  color: red;
`;

const ButtonContainer = Styled.div`
  
`;

const Title = Styled.div``;
