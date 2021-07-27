import React from 'react';
import './quiz.scss';
import axios from 'axios';
import _ from 'lodash';
import { env } from '../../env/development';
import QuizComponent from '../../components/quiz-component/quiz-component';
import qs from 'qs';

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
      showQuiz: false,
      totalKanji: 0,
      level: 'N5',
      answerWithMeaning: [],
      answerWithKanji: [],
      answerWithKunyomi: [],
      answerWithOnyomi: [],
      mode: 'test',
      kind: 'random',
      count: 20,
      allChapters: [],
      remainChapters: [],
      selectedChapters: [],
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
    this.checkValidation = this.checkValidation.bind(this);
    // this.handleSelectRemove = this.handleSelectRemove.bind(this);
    this.handleSelectAdd = this.handleSelectAdd.bind(this);
  }

  componentDidMount() {
    axios.get(env.apiEndPoint + '/kanjis/count',
      {
        params: {
          _limit: -1
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then(res => {
        this.setState({
          // totalKanji: 200
          totalKanji: Number(res.data)
        });
        const chaps = [];
        const first = [];
        const remain = [];
        let countChapter = this.state.totalKanji / 10;
        countChapter = parseInt(countChapter, 10);
        if (this.state.totalKanji % 10 !== 0) {
          countChapter += 1;
        }
        for (let i = 1; i <= countChapter; i++) {
          chaps.push({
            name: 'Chapter ' + i,
            value: i
          });
          if (i === 1) {
            first.push({
              name: 'Chapter ' + i,
              value: i
            });
          } else {
            remain.push({
              name: 'Chapter ' + i,
              value: i
            });
          }
        }
        this.setState({
          allChapters: chaps,
          selectedChapters: first,
          remainChapters: remain
        })
        // setTimeout(() => {
        //   console.log(this.state);
        // }, 3000);
      }).catch(error => console.error('Error in setState : ', error));
  }

  chooseAnswer(correct, ans, mainIndex, childIndex) {
    let changeState = _.cloneDeep(this.state.answerWithKanji);
    const restToFalse = changeState[mainIndex].answer_list.map(lst => {
      if (correct === lst.meaning) {
        lst.isCorrect = true;
      }
      lst.disable = true;
      return lst;
    });
    changeState[mainIndex].answer_list = restToFalse;
    changeState[mainIndex].answer_list[childIndex].ischoose = !(ans.ischoose);
    this.setState({ answerWithKanji: changeState });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectRemove(selectChap) {
    console.log(selectChap);
    if (selectChap) {
      const select = _.cloneDeep(this.state.selectedChapters);
      _.remove(select, s => { return s.value === selectChap.value });
      const remain = _.cloneDeep(this.state.remainChapters);
      remain.push(selectChap);
      this.setState({
        selectedChapters: select,
        remainChapters: remain
      })
    }
  }

  handleSelectAdd(event) {
    if (event.target.value !== '') {
      const value = parseInt(event.target.value);
      const remain = _.cloneDeep(this.state.remainChapters);
      const select = _.cloneDeep(this.state.selectedChapters);
      const addIndex = _.findIndex(remain, function (o) { return o.value === value; });
      select.push(remain[addIndex]);
      _.remove(remain, r => { return r.value === value });
      this.setState({
        selectedChapters: select,
        remainChapters: remain
      })
    }
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

  checkValidation() {
    if (this.state.options.length === 0) {
      return true;
    }
    return false;
  }

  handeleSubmit() {
    const para = {
      level: this.state.level,
      mode: this.state.mode,
      kind: this.state.kind,
      count: this.state.count,
      options: this.state.options,
    }
    axios.get(env.apiEndPoint + '/quiz',
      {
        params: para,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then(res => {
        this.setState({
          answerWithMeaning: res.data.answer_with_meaning,
          answerWithKanji: res.data.answer_with_kanji,
          answerWithKunyomi: res.data.answer_with_kunyomi,
          answerWithOnyomi: res.data.answer_with_onyomi,
          showForm: false,
          showQuiz: true
        });
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
                    <label className="form-field" htmlFor="chapter">
                      <input
                        type="radio"
                        id="chapter"
                        name="kind"
                        checked={this.state.kind === "chapter"}
                        onChange={this.handleChange}
                        value="chapter" />
                      Chapter
                    </label>
                  </div>

                  {this.state.kind === 'random' &&
                    <div>
                      <label className="form-label">Count</label>
                      <input type="number"
                        className="form-field input-range"
                        name="count"
                        value={this.state.count}
                        min={10}
                        max={50}
                        onChange={this.handleChange}></input>
                      {(this.state.count < 10 || this.state.count > 50) &&
                        <p className="error-message">*** Count must be number between 10 and 50 range ***</p>
                      }
                    </div>
                  }

                  {this.state.kind === 'chapter' &&
                    <div>
                      <label className="form-label">Chapters</label>
                      <select
                        name="chapters"
                        id="chapters"
                        onChange={this.handleSelectAdd}
                        defaultValue={'default'}
                        className="form-field input-range">
                        <option value="default"></option>
                        {this.state.remainChapters.map((cha, i) => {
                          return (
                            <option
                              key={i}
                              value={cha.value}>{cha.name}</option>
                          )
                        })}
                      </select>
                      <div>
                        {this.state.selectedChapters.map((selectedChapter, i) => {
                          return (
                            <p className="select-chapter-box" key={i}>
                              {selectedChapter.name}
                              <span
                                onClick={() => this.handleSelectRemove(selectedChapter)}
                                className="cross">&#10060;</span>
                            </p>
                          )
                        })}
                      </div>
                      {(this.state.selectedChapters.length === 0) &&
                        <p className="error-message">*** Choose at least one chapter ***</p>
                      }
                    </div>
                  }


                  <div>
                    <label className="form-label">Options</label>
                    {checkBoxItems.map((opt, i) => {
                      return (
                        <label key={opt.value} className="form-field check-btn" htmlFor={opt.value}>
                          <input
                            type="checkbox"
                            id={opt.value}
                            name="options"
                            checked={this.state.options.indexOf(opt.value) === -1 ? false : true}
                            onChange={(e) => this.handleChangeForCheck(e, i)}
                            disabled={opt.value === 'answerWithPictures'}
                            value={opt.value} />
                          {opt.name}
                        </label>
                      )
                    })}
                    {(this.state.options.length < 2) &&
                      <p className="error-message">*** Choose at least one option ***</p>
                    }
                  </div>
                </div>
              }
              <button
                className="btn-submit"
                type="button"
                disabled={(this.state.options.length < 2 || (this.state.count < 10 || this.state.count > 50))}
                onClick={this.handeleSubmit}>Let Start</button>
            </form>
          }
          {(this.state.showQuiz && this.state.answerWithMeaning) &&
            <QuizComponent data={this.state.answerWithMeaning} header="Answer with Meaning"></QuizComponent>
          }
          {(this.state.showQuiz && this.state.answerWithKanji) &&
            <QuizComponent data={this.state.answerWithKanji} header="Answer with Kanji"></QuizComponent>
          }
          {(this.state.showQuiz && this.state.answerWithKunyomi) &&
            <QuizComponent data={this.state.answerWithKunyomi} header="Answer with Kunyomi"></QuizComponent>
          }
          {(this.state.showQuiz && this.state.answerWithOnyomi) &&
            <QuizComponent data={this.state.answerWithOnyomi} header="Answer with Onyomi"></QuizComponent>
          }
        </div>
      </div>
    )
  }
}

export default Quiz;