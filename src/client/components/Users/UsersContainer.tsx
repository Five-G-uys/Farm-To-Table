import React from 'react';
import UserCard from './UserCard';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '40px',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
});

const UsersContainer = ({ users, handleEditClick, inEditMode }: any) => {
  // console.log('LINE 15 || USERSCONTAINER', users);
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      // justify='center'
    >
      {users.map((user: any) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}f
            key={user.name + user.id}
          >
            <UserCard
              user={user}
              key={user.name + user.id}
              handleEditClick={handleEditClick}
              inEditMode={inEditMode}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UsersContainer;
