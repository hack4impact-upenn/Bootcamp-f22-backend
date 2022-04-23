import React, { useState } from 'react';
import { TextField, Link, Button } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../util/redux/hooks';
import { login } from '../util/redux/slice';
import { GoogleLoginValidation, LoginValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
} from '../components/StyledComponents';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  async function onSubmit() {
    const result = await LoginValidation(email, password, setError);
    if (result === '') {
      alert(email + password);
      dispatch(login(email));
      navigate('/home');
    } else {
      alert('fail');
    }
  }

  async function googleLogin() {
    const result = await GoogleLoginValidation(setError);
    if (!result) {
      alert(email + password);
      dispatch(login(email));
      navigate('/home');
    } else {
      alert('fail');
    }
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
          <FormHeaderText>Welcome! Lets get started.</FormHeaderText>
        </FormField>
        <FormField>
          <TextField
            error={
              error === 'empty' || error === 'badEmail' || error === 'fail'
            }
            helperText={<ErrorMessage error={error} />}
            type="email"
            required
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'fail'}
            helperText={<ErrorMessage error={error} />}
            type="password"
            required
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormGridRow>
          <FormField>
            <MiniLinkText>
              <Link component={RouterLink} to="/forgot">
                Forgot password?
              </Link>
            </MiniLinkText>
          </FormField>
          <FormField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => onSubmit()}
            >
              Login
            </Button>
          </FormField>
        </FormGridRow>
        <FormField>
          <MiniLinkText>
            Need an account?{' '}
            <Link component={RouterLink} to="/register">
              Sign up
            </Link>
          </MiniLinkText>
        </FormField>
        <FormField>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => googleLogin()}
          >
            Login with Google
          </Button>
        </FormField>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default LoginView;
