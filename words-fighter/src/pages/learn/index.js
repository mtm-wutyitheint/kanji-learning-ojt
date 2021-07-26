import React from 'react';
import kanjiPic from '../../img/kanji.png';
import "./learn.scss";
import KanjiDetail from '../../components/kanji-detail';
import { withRouter } from 'react-router-dom';

class Learn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedIndex: null,
      data: []
    }
    const { level } = this.props.location.state;
    this.kind = level;
    // this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  
  componentDidMount(){
    const apiUrl = 'http://localhost:1337/kanjis';
    const { level } = this.props.location.state;
    const arrData = [];
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(element => {
          if(element.level === level){
            arrData.push(element);
          }
        });
        this.setState({data: arrData})
      })
      .catch((error) => console.log(error));
  }
  openDialog(id) {
    this.setState({ dialogOpen: true, selectedIndex: id });
  }
  closeDialog() {
    this.setState({ dialogOpen: false, selectedIndex: null });
  }
  render() {
    return (
      <div className="learn">
        <h1 className="header">Learn {this.kind} kanji</h1>
        <div className="chapter-selection clearFix">
          <p className="next-chap">Next Chapter <i className="arrow right"></i></p>
        </div>
        <div className="container">
          <form className="clearFix">
            <input
              className='find'
              type="text"
              placeholder="Find"></input>
          </form>
          {this.state.data.map((words) => {
            return (
              <div
                onClick={() => this.openDialog(words.id)}
                key={words.id}
                className="block clearFix">
                  <p className="mean">
                    <span className="kanji">{words.kanji}</span>
                    ({words.kunRomaji}) = {words.meaning}</p>
                  <img className="logo" src={kanjiPic} alt="kanji logo"></img>
              </div>
            )
          })}
        </div>
        <div className="chapter-selection clearFix">
          <p className="next-chap">Next Chapter <i className="arrow right"></i></p>
        </div>
        <KanjiDetail
          open={this.state.dialogOpen}
          close={this.closeDialog}
          data={this.state.data}
          index={this.state.selectedIndex} />
      </div>
    )
  }
}

export default withRouter(Learn);