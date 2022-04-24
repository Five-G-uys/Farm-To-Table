import * as React from 'react';
import axios from 'axios';
import { KeyboardEvent, MouseEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { IoClose, IoMenu } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#55bfbf'
  },
  fullList: { width: 'auto' }
});

type Anchor = 'left';

const TemporaryDrawer = (): React.ReactElement => {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const [currentStatus, setCurrentStatus] = useState(true);
  const [logoutStatus, setLogoutStatus] = useState();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: KeyboardEvent | MouseEvent,
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor): React.ReactElement => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <ul>
        <li><div className='menu-icon-close'>
          <IconContext.Provider value={{size: '3em', color: '#fff'}}>
            <IoClose />
          </IconContext.Provider>
        </div></li>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>Edit Profile</Link></li>
        <li><Link to='/stats'>Enter Stats</Link></li>
        <li><Link to='/showers'>Shower Timer</Link></li>
        <li><Link to='/graphs'>View Individual Stats</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
        <li><Link to='/leaderboard'>Leaderboard</Link></li>
        <li><Link to='/notifications'>Notifications</Link></li>
        <li><Link to='/statsBreakdown'>Points Breakdown</Link></li>
        <li onClick={(): Promise<void> => axios.delete('/logout')
          .then(({ data }) => {
            setLogoutStatus(data);
            setCurrentStatus(false);
            location.reload();
          })
          .catch((err) => console.warn(err))}>
          <Link to='/'>Log out</Link>
        </li>
      </ul>

    </div>
  );

  const anchor = 'left';

  return (
    <div>
      <Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>
          <div className='menu-icon'>
            <IconContext.Provider value={{size: '3em', color: '#525252'}}>
              <IoMenu />
            </IconContext.Provider>
          </div>
        </Button>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
          {list(anchor)}
        </Drawer>
      </Fragment>
    </div>
  );
};

export default TemporaryDrawer;