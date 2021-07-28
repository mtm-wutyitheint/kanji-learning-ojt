import React from 'react';
import _ from 'lodash';
import './quiz-component.scss'

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      header: '',
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      header: this.props.header
    })
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
      <div className="quiz-component">
        {this.state.data.length > 0 &&
          <div className="container">
            <h2 className="quiz-header">{this.state.header}</h2>
            <div className="container-flex">
              {this.state.data.map((snap, index) => {
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
          </div>
        }
      </div>
    )
  }
}

export default QuizComponent;