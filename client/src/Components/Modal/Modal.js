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
          {props.showRegister ? (
            <div>
              <form>
                <label>Username</label>
                <input
                  className="form-control"
                  type="username"
                  placeholder="JohnDoe"
                  name="sUsername"
                  onChange={props.change}
                />
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="email"
                  name="sEmail"
                  onChange={props.change}
                />
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="********"
                  name="sPassword"
                  onChange={props.change}
                />
                <label>Password Match</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="********"
                  name="sPasswordMatch"
                  onChange={props.change}
                />
                <Button
                  text="Register"
                  id="btnRegister"
                  onclick={props.register}
                />

                <p>
                  Already have an Account?
                  <button onClick={props.updateModal}>Login</button>
                </p>
              </form>
            </div>
          ) : (
            <div>
              <hr />
              <form action="/api/login" method="POST">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="username"
                    placeholder="JohnDoe"
                    name="username"
                  />
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="********"
                    name="password"
                  />
                  <Button
                    type="submit"
                    text="Login"
                    id="btnLogin"
                    onclick={props.login}
                  />
                </div>
              </form>
              <p>
                Don't have an account?
                <button onClick={props.updateModal}>Register</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
