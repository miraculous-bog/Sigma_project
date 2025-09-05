// src/features/auth/SignIn.jsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import {
  Container,
  Paper,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => { userRef.current?.focus(); }, []);
  useEffect(() => { setErrMsg(''); }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: username
      }));
      setUsername('');
      setPassword('');
      navigate('/environment');
    } catch (err) {
      const status = err?.status;
      const detail = err?.data?.message || err?.data?.detail;

      if (!status) setErrMsg('No Server Response');
      else if (status === 400) setErrMsg('Missing username or password');
      else if (status === 401) setErrMsg('Unauthorized');
      else setErrMsg(detail || 'Login failed');

      errRef.current?.focus();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 700 }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h4" fontWeight={600} color="text.primary">
              Вхід
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Увійдіть, щоб продовжити
            </Typography>
          </Box>

          {errMsg ? (
            <Alert
              ref={errRef}
              severity="error"
              variant="outlined"
              sx={{ '& .MuiAlert-message': { width: '100%' } }}
            >
              {errMsg}
            </Alert>
          ) : null}

          <TextField
            id="username"
            label="Username"
            type="text"
            required
            inputRef={userRef}
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ maxWidth: 500, mx: 'auto' }}
          />

          <TextField
            id="password"
            label="Password"
            required
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ maxWidth: 500, mx: 'auto' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPw((s) => !s)}
                    edge="end"
                  >
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            sx={{ borderRadius: 2, py: 1.2, maxWidth: 500, mx: 'auto' }}
          >
            {isLoading ? <CircularProgress size={22} /> : 'Sign In'}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
