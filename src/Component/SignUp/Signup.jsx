import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox, Select, message } from "antd";
import { Option } from "antd/es/mentions";
import "./style.scss";
// import { postEmployeeData } from '../../services/getEmployeeData';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [employeeForm, setEmployeeForm] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const type = employeeForm ? "Manager" : "Employee";
    values.type = type;
    if (values.type == "Employee") {
      axios
        .post("http://localhost:8081/employee", values)
        .then((res) => {
          console.log("res---------->", res);
          message.success("Employee created Successfully")
          setTimeout(()=>{
            navigate("/employee");
          },3000)
          
        })
        .catch((err) => console.log(err));
      console.log("Received values of form: ", values);
    } else {
      axios
        .post("http://localhost:8081/manager", values)
        .then((res) => {
          console.log("res---------->", res);
          message.success("Manager created Successfully")
          setTimeout(()=>{
            navigate("/");
          },3000)
        })
        .catch((err) => console.log(err));
      console.log("Received values of form: ", values);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-inner-container">
        <h1 className="form-title">{employeeForm ? "Manager " : "Employee "} SignUp</h1>
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input className="form-input-text" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input className="form-input-text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
                required: true,
                message: "Field is required",
              },
            ]}
          >
            <Input.Password type="password" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select className="form-input-select">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Hobbies"
            name="hobbies"
            rules={[{ required: true, message: "Please enter your hobbies" }]}
          >
            <Input className="form-input-text" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-submit-button"
              loading={loading}
            >
              Signup
            </Button>
            <div>
              <span
                onClick={() =>
                  employeeForm ? setEmployeeForm(false) : setEmployeeForm(true)
                }
                style={{
                  color: "blue",
                  // textDecoration: 'underline',
                  cursor: "pointer",
                }}
              >
                Click
              </span>{" "}
              here for {!employeeForm ? "Manager " : "Employee "}
              SignUp
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
