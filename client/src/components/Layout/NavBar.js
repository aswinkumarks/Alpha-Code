import { useContext, useState } from "react";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import AuthContext from "../../store/Auth-Context";
import ColorModeContext from "./ThemeWrapper";

function NavBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const authCtx = useContext(AuthContext);
  const firstname = localStorage.getItem("name");
  const username = firstname ? firstname : authCtx.username;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Alpha Code</Link>
          </Typography>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <Avatar>{username[0]}</Avatar>
          </IconButton>
          <Menu sx={{ mt : 1,}}
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <Box sx={{ p: 1, }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {username}
              </Typography>
            </Box>
            <Stack>
              <Box sx={{ml:2}}>
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={authCtx.logout}>Log Out</MenuItem>
            </Stack>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
