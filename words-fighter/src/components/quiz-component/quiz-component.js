import React from 'react';
import _ from 'lodash';
import './quiz-component.scss';
import { Link } from 'react-router-dom';

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      data: [],
      showAnswer: false,
      listAnswer: []
    }
    this.allComplete = this.allComplete.bind(this);
    this.backToQuiz = this.backToQuiz.bind(this);
  }

  componentDidMount() {
    this.setDataToAllQiz();
  }

  setDataToAllQiz() {
    const quizData = [];
    if (this.props.answerWithMeaning && this.props.answerWithMeaning.length > 0) {
      quizData.push({
        head: "Answer with Meaning",
        data: this.props.answerWithMeaning
      });
    }

    if (this.props.answerWithKanji && this.props.answerWithKanji.length > 0) {
      quizData.push({
        head: "Answer with Kanji",
        data: this.props.answerWithKanji
      });
    }

    if (this.props.answerWithKunyomi && this.props.answerWithKunyomi.length > 0) {
      quizData.push({
        head: "Answer with Kunyomi",
        data: this.props.answerWithKunyomi
      });
    }

    if (this.props.answerWithOnyomi && this.props.answerWithOnyomi.length > 0) {
      quizData.push({
        head: "Answer with Onyomi",
        data: this.props.answerWithOnyomi
      });
    }
    this.setState({
      mode: this.props.mode,
      data: quizData
    });
  }

  chooseAnswer(correct, ans, mainIndex, index, childIndex) {
    let changeState = _.cloneDeep(this.state.data);
    const restToFalse = changeState[mainIndex].data[index].answer_list.map(lst => {
      if (correct === lst.meaning) {
        lst.isCorrect = true;
      }
      lst.disable = true;
      return lst;
    });
    changeState[mainIndex].data[index].answer_list = restToFalse;
    changeState[mainIndex].data[index].answer_list[childIndex].ischoose = !(ans.ischoose);
    this.setState({ data: changeState });
  }

  recordAnswer(ans, mainIndex, index, childIndex) {
    let changeState = _.cloneDeep(this.state.data);
    const restToFalse = changeState[mainIndex].data[index].answer_list.map(lst => {
      lst.ischoose = false;
      return lst;
    });
    changeState[mainIndex].data[index].answer_list = restToFalse;
    changeState[mainIndex].data[index].answer_list[childIndex].ischoose = !(ans.ischoose);
    this.setState({ data: changeState });
  }

  allComplete() {
    const stateData = _.cloneDeep(this.state.data);
    let total = 0;
    let correct = 0;
    // change style
    _.map(stateData, snap => {
      if (snap.data && snap.data.length > 0) {
        total += snap.data.length;
        _.map(snap.data, snapShot => {
          _.map(snapShot.answer_list, answer => {
            if (answer.ischoose && (answer.meaning === snapShot.correct)) {
              correct += 1;
              answer.isCorrect = true;
            }
            if (answer.meaning === snapShot.correct) {
              answer.isCorrect = true;
            }
            answer.disable = true;
          });
        });
      }
    });
    this.setState({
      data: stateData,
      showAnswer: true,
    })
    alert('You score is ' + correct + ' of total ' + total);
  }

  backToQuiz() {
    this.setState({
      mode: '',
      data: [],
      showAnswer: false,
      listAnswer: []
    });
  }

  render() {
    return (
      <div>
        {this.state.data.map((data, mainIndex) => {
          return (
            <div className="quiz-component" key={mainIndex}>
              {data.data.length > 0 &&
                <div className="container">
                  <h2 className="quiz-header">{data.head}</h2>
                  {this.state.mode === "test" &&
                    <div className="container-flex">
                      {data.data.map((snap, index) => {
                        return (
                          <div className="block" key={index}>
                            <div className="question">{snap.head}</div>
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
                                    onClick={() => this.chooseAnswer(snap.correct, ans, mainIndex, index, i)}>
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
                  {(this.state.mode !== "test" && !this.state.showAnswer) &&
                    <div className="container-flex">
                      {data.data.map((snap, index) => {
                        return (
                          <div className="block" key={index}>
                            <div className="question">{snap.head}</div>
                            <div className="answer-list">
                              {snap.answer_list.map((ans, i) => {
                                let choose = 'choose-record-btn';
                                let normal = 'normal-btn';
                                let btn;
                                if (!ans.ischoose && !ans.isCorrect) {
                                  btn = normal;
                                } else if (!ans.isCorrect && ans.ischoose) {
                                  btn = choose;
                                }
                                return (
                                  <button className={"answer " + btn}
                                    key={i}
                                    disabled={ans.disable}
                                    onClick={() => this.recordAnswer(ans, mainIndex, index, i)}>
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
                  {(this.state.mode !== "test" && this.state.showAnswer) &&
                    <div className="container-flex">
                      {data.data.map((snap, index) => {
                        return (
                          <div className="block" key={index}>
                            <div className="question">{snap.head}</div>
                            <div className="answer-list">
                              {snap.answer_list.map((ans, i) => {
                                let normal = 'normal-btn';
                                let choose = 'choose-btn'
                                let correct = 'correct-btn'
                                let btn;
                                if (!ans.ischoose && !ans.isCorrect) {
                                  btn = normal;
                                } else if (!ans.isCorrect && ans.ischoose) {
                                  btn = choose;
                                } else if (ans.isCorrect && ans.ischoose) {
                                  btn = correct
                                } else if (ans.isCorrect && !ans.ischoose) {
                                  btn = correct;
                                } else { }
                                return (
                                  <button className={"answer " + btn}
                                    key={i}
                                    disabled={ans.disable}
                                    onClick={() => this.recordAnswer(ans, mainIndex, index, i)}>
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
              }
            </div>
          )
        })}
        {(this.state.mode !== "test" && !this.state.showAnswer) &&
          <button
            className="complete-btn"
            onClick={this.allComplete}>Complete</button>
        }
        {(this.state.mode !== "test" && this.state.showAnswer) &&
          <Link to="/content">Back to content</Link>
        }
      </div>
    )
  }
}

export default QuizComponent;