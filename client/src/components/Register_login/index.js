import React from "react";
import MyButton from "../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus dolorum, tempore sapiente ea quasi dolores quod
              quibusdam perspiciatis numquam neque, quae consequatur reiciendis
              dignissimos! Est placeat autem natus quia praesentium!
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
