import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import kanjiPic from '../../img/kanji.png';
import './kanji-detail-dialog.scss';
import _ from 'lodash';

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
  let currentIndex = _.findIndex(data, d => d.id === index);
  let pageCount = String(currentIndex + 1) + "/" + String(data.length)

  let mock = showList.length === 0 ? null : showList[0];
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
          <DialogTitle id="alert-dialog-slide-title">{mock.kanji} [ {mock.kunRomaji} ]</DialogTitle>
          <DialogContent>
            <div className="clearFix">
              <ul className="meaning-lst">
                <li>Meaning</li>
                <ul>
                  <li>{mock.meaning}</li>
                </ul>
                <li>Onyomi</li>
                <ul>
                  <li>{mock.onyomi}</li>
                  <li>{mock.onRomaji}</li>
                </ul>
                <li>Kunyomi</li>
                <ul>
                  <li>{mock.kunyomi}</li>
                  <li>{mock.kunRomaji}</li>
                </ul>
                <li>Examples</li>
                <ul>
                  <li>This is an example text.</li>
                  <li>This is an example text.</li>
                </ul>
              </ul>
              <img className="kanji-example" src={kanjiPic} alt={mock.kunRomaji}></img>
            </div>
            <p className="page-count">
              {pageCount}
            </p>

          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog> : <div></div>}
    </div>
  );
}
