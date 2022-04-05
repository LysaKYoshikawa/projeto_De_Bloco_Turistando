/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from "react";
import { AreaLogin } from "./styled";
import { AreaInteira } from "./styled";
import { BtnGet } from "../../components/Styled";
import { BtnSocial } from "../../components/Styled";
import logo from "../../img/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <AreaInteira>
      

      <AreaLogin>

      <div>
        <img src={logo} />
      </div>
        <Link to="https://www.google.com.br/">
          <BtnSocial>
            <GoogleIcon />
          </BtnSocial>
        </Link>

        <Link to="https://www.google.com.br/">
          <BtnSocial>
            <FacebookOutlinedIcon />
          </BtnSocial>
        </Link>

        <br></br>

        <label className="ou">ou</label>

        <form>
          <div className="form--imput">
            <label>E-mail</label>
            <input type="email" />
          </div>

          <div className="form--imput">
            <label>senha</label>
            <input type="password" />
          </div>

          <Link to="/turistando">
            <BtnGet>Entrar</BtnGet>
          </Link>
        </form>
      </AreaLogin>
    </AreaInteira>
  );
};
