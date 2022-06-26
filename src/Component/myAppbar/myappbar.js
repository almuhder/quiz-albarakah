import React from 'react';
import {
  defaultTheme,
  AppBar,
  ToggleThemeButton,
  Logout,
  UserMenu,
} from 'react-admin';
import { createTheme, Box, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

// dark them
const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

// coustom logout button
const MyLogoutButton = (props) => <Logout {...props} />;

// coustom cgange password button
const ChangPasswordButton = (props) => {
  const naveigate = useNavigate();
  return (
    <MenuItem
      {...props}
      onClick={() => naveigate('/admin/change')}
      sx={{ color: 'text.secondary' }}
    >
      Change Password
    </MenuItem>
  );
};

// coustom login button
const MyLoginButton = (props) => {
  const naveigate = useNavigate();
  return (
    <MenuItem
      {...props}
      onClick={() => naveigate('/admin/login')}
      sx={{ color: 'text.secondary' }}
    >
      Login
    </MenuItem>
  );
};

// user menue
const MyUserMenu = () => {
  const token = localStorage.getItem('tokenA');
  if (token) {
    return (
      <UserMenu>
        <ChangPasswordButton />
        <MyLogoutButton />
      </UserMenu>
    );
  } else {
    return (
      <UserMenu>
        <MyLoginButton />
      </UserMenu>
    );
  }
};

// coustom AppBar
const MyAppBar = (props) => (
  <AppBar
    userMenu={<MyUserMenu />}
    sx={{
      '& .RaAppBar-title': {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    }}
    {...props}
  >
    <Typography variant="h6" color="inherit" id="react-admin-title" />
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
  </AppBar>
);

export default MyAppBar;
