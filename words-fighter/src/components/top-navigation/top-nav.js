import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import './top-nav.scss';
import kanji from '../../img/kanji.png';
import { isNil } from 'lodash';

export default function TopNav() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const currentLoginUser = () => {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if (isNil(loginUser) || isNil(loginUser.jwt) || isNil(loginUser.user)) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    currentLoginUser();
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
    setAnchorEl(null);
  }

  const handleProfile = () => {
    history.push('/profile');
    setAnchorEl(null);
  }

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            <Link to="/top">
              <img className="top-image" src={kanji} alt={'top'}></img>
            </Link>
          </Typography>
          <div>
            <div>
              {auth ?
                <>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>

                  </Menu>
                </> :
                <Link to="signup">Sign Up</Link>
              }
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  );
}