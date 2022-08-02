import "../styles.css";
import List from "./List";
import Alert from "./Alert";
import { mobile } from "./responsive";

import React, { useEffect, useState } from "react";
import Styled from "styled-components";

function getLocalStorage() {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
}

export default function App() {
  //make states
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    //show alerts
    if (!name) {
      //show alert if the user tried to submit the form with no data
      // setAlert({ show: true, msg: "Please enter a task", type: "failed" });
      showAlert(true, "Please enter a task", "failed");
    } else if (name && isEditing) {
      // show edited alert if an item is edited
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "Task edited", "successful");
    } else {
      //show submitted alert if an item is submitted successfully
      const newItem = { id: new Date().getTime().toString(), title: name };
      // the new submitted item will be given an id and added to the lists array
      setList([...list, newItem]);
      showAlert(true, "Task added", "successful");
      // once item is added to the list, clear out name so that new items can be added
      setName("");
    }
  }

  //making a show Alert function so that there is no need to have setAlert at all places
  function showAlert(show = false, msg = "", type = "") {
    setAlert({ show, msg, type });
  }

  //function to clear the whole list
  function clearList() {
    showAlert(true, "All Tasks Cleared", "failed");
    setList([]);
  }

  //function to remove a specific task from the list
  function removeItem(id) {
    showAlert(true, "Task removed", "failed");
    setList(list.filter((item) => item.id !== id));
  }

  //function to edit a task
  function editTask(id) {
    const specificID = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(specificID.title);
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <Container>
      <Main>
        <Form onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <Heading>Today's Chores</Heading>
          <FormContent>
            <Input
              className="input"
              placeholder="e.g. Buy eggs"
              maxLength="30"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button>{isEditing ? "Edit" : "Submit"}</Button>
          </FormContent>
        </Form>
        {list.length > 0 && (
          <List items={list} removeItem={removeItem} editTask={editTask} />
        )}
        <ClearButton onClick={clearList}>Clear All Items</ClearButton>
      </Main>
    </Container>
  );
}

const Container = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;

  ${mobile({
    alignItems: "flex-start",
    backgroundColor: "#2B65EC",
    width: "100vw",
    height: "100vh",
    margin: "0"
  })}
`;

const Main = Styled.div`
  background-color: #2B65EC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 1em 3em;

  ${mobile({
    width: "100vw",
    borderRadius: "0"
  })}
`;

const Heading = Styled.h1`
  text-decoration: underline;
  margin-bottom: 1rem;
  color: white;
`;

const Form = Styled.form`
  text-align: center;
`;

const FormContent = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vh;
  margin-bottom: 1rem;

  ${mobile({
    width: "80vw",
    backgroundColor: "yellow"
  })}

`;

const Input = Styled.input`
  flex: 3;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0.6em 0.9em;
  
  

  :focus {
    border: none;
    outline: none;
  }
`;

const Button = Styled.button`
  border: none;
  padding: 0.625em 0.9em;
  flex: 1;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ClearButton = Styled.button`
  border: none;
  padding: 0.2em 0.6em;
  color: red;
  cursor: pointer;
  border-radius: 5px;
  background-color: black;
  color: white;
  margin-top: 10px;
`;
