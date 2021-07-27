import React from 'react';
import kanjiPic from '../../img/kanji.png';
import "./learn.scss";
import KanjiDetail from '../../components/kanji-detail';
import { withRouter } from 'react-router-dom';
import Pagination from "./Pagination";

const defaultProps = {
  data: [],
  pageOfItems: []
}

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedIndex: null,
      data: [],
      pageOfItems: [],
      inputvalue: ''
    }
    const { level } = this.props.location.state;
    this.kind = level;
    // this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.search = this.search.bind(this)
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
        defaultProps.data = arrData;
      })
      .catch((error) => console.log(error));
  }
  openDialog(id) {
    this.setState({ dialogOpen: true, selectedIndex: id });
  }
  closeDialog() {
    this.setState({ dialogOpen: false, selectedIndex: null });
  }
  search = (event) => {
    const data = this.state.data.filter(item =>{
      return item.kunRomaji.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({pageOfItems: data, data: data})
    if(event.target.value.length < 1){
      this.setState({pageOfItems: defaultProps.pageOfItems, data: defaultProps.data})
    }
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
    defaultProps.pageOfItems = pageOfItems;
  }
  render() {
    return (
      <div className="learn">
        <h1 className="header">Learn {this.kind} kanji </h1>
        <div className="chapter-selection clearFix">
           <input
              className="find clearFix"
              type="text"
              placeholder="Search"
              onChange={this.search} 
              ></input>
        </div>
        <div className="container">
          {this.state.pageOfItems.map((words) => {
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
        <div>
          {this.state.data.length > 0 ? (
            <>
            <Pagination data={this.state.data} onChangePage={this.onChangePage} />
            </>
          ) : (
          <h1>No Posts to display</h1> 
            )}
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