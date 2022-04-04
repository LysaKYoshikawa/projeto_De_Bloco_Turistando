import styled from "styled-components";

export const BtnGet = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 0px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  transition: 0.4s;

  &:hover {
    background-color: green;
  }

  .center {
    text-align: center;
    width: 100%;
  }
`;

export const BtnSocial = styled.div`
  color: #fff;
  display: inline;

  &:hover {
    background-color: #4e129c;
  }
`;
