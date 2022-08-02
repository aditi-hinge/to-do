import React, { useEffect } from "react";
import Styled from "styled-components";
import "../styles.css";

export default function Alert({ msg, type, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);

  return <Container className={type}>{msg}</Container>;
}

const Container = Styled.div`
  margin-bottom: 10px;
`;
