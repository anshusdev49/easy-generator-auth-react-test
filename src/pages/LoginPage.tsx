import {
    FormControl, FormGroup, Input, InputLabel,
    Typography, Button, Link
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import { loginAPI } from "../services/apis";
import { useToken } from "../tokenContext";

interface User {
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

const LoginPage: React.FC = () => {
    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const { setToken } = useToken();
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setMessage("");
    };

    const handleLogin = async () => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        const isValid = passwordRegex.test(user.password);
        if (isValid) {
            const resp = await loginAPI(user);
            console.log("=====0",resp)
            if (resp?.response?.data?.error) {
                setMessage(resp?.response.data.message);
            } else {
                setToken(resp) 
                navigate("/")
            }
        } else {
            setMessage("Password must be at least 6 characters long and contain at least one digit and one special character.")
        }
    };

    return (
        <Container>
            <Typography variant="h4">LOGIN</Typography>
            <Form>
                <InputLabel>Email</InputLabel>
                <Input onChange={(e: any) => onValueChange(e)} name="email" />
            </Form>
            <Form>
                <InputLabel>Password</InputLabel>
                <Input onChange={(e: any) => onValueChange(e)} name="password" />
            </Form>
            <Form>
                <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
            </Form>
            <p className="justify-center">Create an account <Link href="/signup">sign up</Link></p>
            <p style={{
                color: 'red', textAlign: 'center',
                fontSize: '14px', marginTop: '5px'
            }}>{message}</p>
        </Container>
    );
};

export default LoginPage;