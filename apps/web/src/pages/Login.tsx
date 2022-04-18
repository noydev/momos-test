import {
  Button,
  CircularProgress,
  Container,
  InputLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { AUTHENTICATION_URL } from "../constants/auth";
import { useAuthDispatch, useAuthState } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const [errors, setErrors] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [formInput, setFormInput] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const {
    data,
    getData: login,
    loading,
    error,
  } = useFetch<{ token: string }>(AUTHENTICATION_URL, {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(formInput),
  });

  const validateField = (field: string, value: string) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} field is required`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    validateField(name, value);

    setFormInput((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleLogin = () => {
    validateField("username", formInput.username);
    validateField("password", formInput.password);

    if (!formInput.username || !formInput.password) {
      return;
    }

    login();

    if (data) {
      dispatch({ type: "LOGIN", token: data.token });
    }
  };

  if (loading) return <CircularProgress />;

  if (error) return <div>Something wrong happened: {error}</div>;

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <Container component="main" maxWidth="sm">
        <form>
          <InputLabel required error={Boolean(errors?.username)}>
            Username
          </InputLabel>
          <TextField
            fullWidth
            required
            autoComplete="username"
            error={Boolean(errors?.username)}
            helperText={errors?.username}
            id="username"
            margin="normal"
            name="username"
            variant="outlined"
            value={formInput.username}
            onChange={handleChange}
          />
          <InputLabel
            required
            error={Boolean(errors?.password)}
            style={{ marginTop: "10px" }}
          >
            Password
          </InputLabel>
          <TextField
            fullWidth
            required
            autoComplete="current-password"
            className="text-input"
            error={Boolean(errors?.password)}
            helperText={errors?.password}
            id="password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            value={formInput.password}
            onChange={handleChange}
          />

          <Button
            fullWidth
            className="submit-btn"
            color="primary"
            variant="contained"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
