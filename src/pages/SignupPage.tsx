import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { signupAPI } from "../services/apis";
import { useNavigate } from "react-router-dom";
import { useToken } from "../tokenContext";

interface User {
  name: string;
  email: string;
  password: string;
}

const Container = styled(FormGroup)`
  width: 30%;
  margin: 5% auto 0 auto;
`;

const Form = styled(FormControl)`
  margin-top: 10%;
`;

const Signup: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();
  const { setToken } = useToken();
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrMessage("");
  };
  const handleSignup = async () => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const isValid = passwordRegex.test(user.password);
    if (isValid) {
      const response: any = await signupAPI(user);
      if (response?.response?.data?.error) {
        setErrMessage(response?.response.data.message);
      } else {
        setToken(response);
        navigate("/");
      }
    } else {
      setErrMessage(
        "Password must be at least 8 characters long and contain at least one digit and one special character."
      );
    }
  };

  return (
    <Container>
      <Typography variant="h4">Sign up</Typography>
      <Form>
        <InputLabel>Name</InputLabel>
        <Input onChange={(e: any) => onValueChange(e)} name="name" />
      </Form>
      <Form>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e: any) => onValueChange(e)} name="email" />
      </Form>
      <Form>
        <InputLabel>Password</InputLabel>
        <Input onChange={(e: any) => onValueChange(e)} name="password" />
      </Form>
      <Form>
        <Button variant="contained" onClick={() => handleSignup()}>
          Sign up
        </Button>
      </Form>
      <p
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "14px",
          marginTop: "5px",
        }}
      >
        {errMessage}
      </p>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </Container>
  );
};

export default Signup;
