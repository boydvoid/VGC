import React from 'react'
import Button from '../Button/Button';

const Modal = (props) => (
  <div class="modal fade" id={props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    {/* {props.type === 'login' ?
    <Login />
  : 
  
    <Register /> 
  } */}
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <label>Username</label>
          <input type="username" placeholder="JohnDoe" name="username" onChange={props.change}/>
          <label>Password</label>
          <input type="password" placeholder="********" name="password"  onChange={props.change}/>
          <input type="password" placeholder="********" name="passwordMatch"  onChange={props.change}/>
          <input type="email" placeholder="********" name="email"  onChange={props.change}/>
          <Button text="Register" id="btnLogin" onclick={props.action} />
        </div>
      </div>
    </div>
  </div>
)

export default Modal;