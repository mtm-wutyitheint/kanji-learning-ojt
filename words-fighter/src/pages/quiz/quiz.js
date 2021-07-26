import React from 'react';
import './quiz.scss';
import axios from 'axios';
import _ from 'lodash';
import { env } from '../../env/development';

const checkBoxItems = [
  { name: "Answer with meaning", value: "answerWithMeaning" },
  { name: "Answer with kanji", value: "answerWithKanji" },
  { name: "Answer with kunyoumi", value: "answerWithKunyoumi" },
  { name: "Answer with onyoumi", value: "answerWithOnyoumi" },
  { name: "Answer with pictures", value: "answerWithPictures" }
]

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      level: 'N5',
      data: [],
      mode: 'test',
      kind: 'random',
      rangeStart: 1,
      rangeEnd: 10,
      options: [
        'answerWithMeaning',
        'answerWithKanji',
        'answerWithKunyoumi',
        'answerWithOnyoumi',
        'answerWithPictures'
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForCheck = this.handleChangeForCheck.bind(this);
    this.handeleSubmit = this.handeleSubmit.bind(this);
  }

  getQuizKenji() {
    return axios.get(env.apiEndPoint + '/quiz/answer/meaning');
  }

  componentDidMount() {
    if (this.props.location.levelProps) {
      if (this.props.location.levelProps.level) {
        this.setState({ level: this.props.location.levelProps.level });
      }
    }
    console.log('initial state : ', this.state);
  }

  chooseAnswer(correct, ans, mainIndex, childIndex) {
    let changeState = _.cloneDeep(this.state.data);
    const restToFalse = changeState[mainIndex].answer_list.map(lst => {
      if (correct === lst.meaning) {
        lst.isCorrect = true;
      }
      lst.disable = true;
      return lst;
    });
    changeState[mainIndex].answer_list = restToFalse;
    changeState[mainIndex].answer_list[childIndex].ischoose = !(ans.ischoose);
    this.setState({ data: changeState });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeForCheck(event, i) {
    const index = this.state.options.indexOf(event.target.value);
    let checkItem = _.cloneDeep(this.state.options);
    if (!event.target.checked) {
      checkItem.splice(index, 1);
      this.setState({
        options: checkItem
      });
    } else {
      checkItem.push(event.target.value);
      this.setState({
        options: checkItem
      });
    }
  }

  handeleSubmit() {
    console.log('hello');
    this.getQuizKenji().then(res => {
      this.setState({
        data: res.data,
        showForm: false
      });
      console.log(this.state);
    }).catch(error => console.error('Error in setState : ', error));
  }

  render() {
    return (
      <div className="quiz">
        <div className="main">
          <h1 className="head">Quiz</h1>
          {this.state.showForm &&
            <form className="form">
              <div>
                <label className="form-label">Mode</label>
                <label className="form-field"
                  htmlFor="test">
                  <input
                    type="radio"
                    id="test"
                    name="mode"
                    checked={this.state.mode === "test"}
                    onChange={this.handleChange}
                    value="test" />
                  Test
                </label>
                <label
                  className="form-field"
                  htmlFor="practise">
                  <input
                    type="radio"
                    id="practise"
                    name="mode"
                    checked={this.state.mode === "practise"}
                    onChange={this.handleChange}
                    value="practise" />
                  Practise
                </label>
                <label
                  className="form-field"
                  htmlFor="exam">
                  <input
                    type="radio"
                    id="exam"
                    name="mode"
                    checked={this.state.mode === "exam"}
                    onChange={this.handleChange}
                    value="exam" />
                  Exam
                </label>
              </div>

              {this.state.mode !== "exam" &&
                <div>
                  <div>
                    <label className="form-label">Kind</label>
                    <label className="form-field" htmlFor="random">
                      <input
                        type="radio"
                        id="random"
                        name="kind"
                        checked={this.state.kind === "random"}
                        onChange={this.handleChange}
                        value="random" />
                      Random
                    </label>
                    <label className="form-field" htmlFor="custom">
                      <input
                        type="radio"
                        id="custom"
                        name="kind"
                        checked={this.state.kind === "custom"}
                        onChange={this.handleChange}
                        value="custom" />
                      Custom
                    </label>
                  </div>

                  <div>
                    <label className="form-label">Start ~ End</label>
                    <input type="number"
                      className="form-field input-range"
                      name="rangeStart"
                      disabled={this.state.kind === 'random' ? true : false}
                      value={this.state.rangeStart}
                      onChange={this.handleChange}></input>
                    <input type="number"
                      className="form-field input-range"
                      name="rangeEnd"
                      disabled={this.state.kind === 'random' ? true : false}
                      value={this.state.rangeEnd}
                      onChange={this.handleChange}></input>
                  </div>


                  <div>
                    <label className="form-label">Options</label>
                    {checkBoxItems.map((opt, i) => {
                      return (
                        <label key={opt.value} className="form-field check-btn" htmlFor={opt.value}>
                          <input
                            type="checkbox"
                            id={opt.value}
                            name="options"
                            disabled={this.state.kind === 'random' ? true : false}
                            checked={this.state.options.indexOf(opt.value) === -1 ? false : true}
                            onChange={(e) => this.handleChangeForCheck(e, i)}
                            value={opt.value} />
                          {opt.name}
                        </label>
                      )
                    })}
                  </div>
                </div>
              }
              <button className="btn-submit" type="button" onClick={this.handeleSubmit}>Let Start</button>
            </form>
          }
          {this.state.data.length > 0 &&
            <div className="container">
              {this.state.data.map((snap, index) => {
                return (
                  <div className="block" key={index}>
                    <div className="question">{snap.kanji}</div>
                    <div className="answer-list">
                      {snap.answer_list.map((ans, i) => {
                        let choose = 'choose-btn';
                        let correct = 'correct-btn';
                        let normal = 'normal-btn';
                        let btn;
                        if (!ans.ischoose && !ans.isCorrect) {
                          btn = normal;
                        } else if (!ans.isCorrect && ans.ischoose) {
                          btn = choose;
                        } else if (ans.isCorrect && !ans.ischoose) {
                          btn = correct;
                        } else if (ans.isCorrect && ans.ischoose) {
                          btn = correct;
                        }
                        return (
                          <button className={"answer " + btn}
                            key={i}
                            disabled={ans.disable}
                            onClick={() => this.chooseAnswer(snap.correct, ans, index, i)}>
                            {ans.meaning}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Quiz;