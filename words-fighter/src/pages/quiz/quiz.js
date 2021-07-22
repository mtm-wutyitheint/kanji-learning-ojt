import React from 'react';
import './quiz.scss';
import axios from 'axios';
import _ from 'lodash';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  getQuizKenji() {
    return axios.get('http://localhost:1337/quiz/answer/meaning');
  }

  componentDidMount() {
    this.getQuizKenji().then(res => {
      this.setState({ data: res.data });
      // console.log(this.state);
    }).catch(error => console.error('Error in setState : ', error));
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

  render() {
    return (
      <div className="quiz">
        <div className="main">
          <h1 className="head">Quiz</h1>
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