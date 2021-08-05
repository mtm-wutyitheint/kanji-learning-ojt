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
import { env } from '../../env/development';

export default function TopNav() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const currentLoginUser = () => {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if (!loginUser || loginUser.status !== 'success' ||
      !('name' in loginUser) || !('id' in loginUser) ||
      !loginUser.name || !loginUser.id) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    currentLoginUser();
  })

  let profilePic = JSON.parse(localStorage.getItem('loginUser'));
  profilePic = (profilePic) ? env.apiEndPoint + profilePic.image.url : null;

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
      {auth && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              <Link to="/top">
                <img className="top-image" src={kanji} alt={'top'}></img>
              </Link>
            </Typography>
            <div>
              <div>
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
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}