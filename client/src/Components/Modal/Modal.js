import React from "react";
import Button from "../Button/Button";

const Modal = props => (
  <div
    className="modal fade"
    id={props.id}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    {/* {props.type === 'login' ?
    <Login />
  : 
  
    <Register /> 
  } */}
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <label>Username</label>
          <input
            type="username"
            placeholder="JohnDoe"
            name="sUsername"
            onChange={props.change}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            name="sPassword"
            onChange={props.change}
          />
          <input
            type="password"
            placeholder="********"
            name="sPasswordMatch"
            onChange={props.change}
          />
          <input
            type="email"
            placeholder="email"
            name="sEmail"
            onChange={props.change}
          />
          <Button text="Register" id="btnRegister" onclick={props.register} />

          <form action="/api/login" method="POST">
            <label>Username</label>
            <input type="username" placeholder="JohnDoe" name="username" />
            <label>Password</label>
            <input type="password" placeholder="********" name="password" />
            <Button
              type="submit"
              text="Login"
              id="btnLogin"
              onclick={props.login}
            />
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
