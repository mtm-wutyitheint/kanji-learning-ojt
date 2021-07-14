import React from 'react';
import kanjiPic from '../../img/kanji.png';
import "./learn.scss";
import KanjiDetail from '../../components/kanji-detail';

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedIndex: null,
      data: [
        {
          id: 1,
          kanji: "日",
          meaning: "Day",
          onyomi: "ニチ, ジツ",
          kunyomi: "ひ, -び, -か",
          onRomaji: "nichi, jitsu",
          kunRomaji: "hi, -bi, -ka"
        },
        {
          id: 2,
          kanji: "一",
          meaning: "one",
          onyomi: "イチ",
          kunyomi: "ひと(つ)",
          onRomaji: "ichi",
          kunRomaji: "hito(tsu)"
        },
        {
          id: 3,
          kanji: "国",
          meaning: "country",
          onyomi: "コク",
          kunyomi: "くに",
          onRomaji: "koku",
          kunRomaji: "kuni"
        },
        {
          id: 4,
          kanji: "人",
          meaning: "Person",
          onyomi: "ジン、 ニン",
          kunyomi: "ひと",
          onRomaji: "jin, nin",
          kunRomaji: "hito"
        },
        {
          id: 5,
          kanji: "年",
          meaning: "years",
          onyomi: "ネン",
          kunyomi: "とし",
          onRomaji: "toshi",
          kunRomaji: "hito"
        }
      ]
    }
    this.kind = 'N5';
    // this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
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

export default Learn;