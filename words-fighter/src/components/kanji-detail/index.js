import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function KanjiDetail(props) {

  const { open, close, data, index } = props;

  let showList = [];
  if (data && data.length > 0) {
    showList = data.filter(list => {
      return list.id === index;
    })
  }
  console.log(showList);

  const mock = showList.length === 0 ? null : showList[0];
  return (
    <div>
      {mock ?
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={close}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{mock.kanji}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {mock.meaning}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog> : <h1>No Data Found</h1>}
    </div>
  );
}
