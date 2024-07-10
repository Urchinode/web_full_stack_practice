import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    display: flex;
    flex: 1, 1;
    background-color: grey;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
`

const TodoCard: React.FC = () => {
  return <>
   <CardContainer>
    <span>todo title</span>
   </CardContainer>
  </>;
};

export default TodoCard;
