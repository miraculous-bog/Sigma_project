// src/components/Header.jsx
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Logo from './components/Logo';

export default function Header({ user, onLogout }) {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Лого / бренд */}
        <Box
          component={NavLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
			<Logo />
          {/* <Typography variant="h6" fontWeight={700}>
            MyApp
          </Typography> */}
        </Box>

        {/* Центр — навігація */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{
              '&.active': {
                bgcolor: 'primary.dark',
                borderRadius: 2,
              },
            }}
          >
            Home
          </Button>
        </Box>

        {/* Справа — користувач і logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">{user}</Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
