import styled from "styled-components";

export const AreaInteira = styled.div`
  background-image: url(https://user-images.githubusercontent.com/64383080/161445906-8bcc064b-b060-4b73-ba9e-084a8de405ec.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

export const AreaLogin = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.3rem 0;
  max-width: 100px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  border-color: black;
  border-radius: 5px;
  box-shodow: 0px 0px 10px #ccc;

  h1 {
    font-size: 24px;
  }

  img {
    width: 30vw;
    height: 50vh;
  }

  .ou {
    color: white;
  }

  .form--imput {
    text-align: left;
    color: white;

    label {
      display: block;
    }

    input {
      margin-bottom: 20px;
      padding: 10px;
      font-size: 16px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 250px;
      transition: 0.3s;

      &:hover {
        border: 1px solid #7d2ae8;
      }
    }
  }
`;
