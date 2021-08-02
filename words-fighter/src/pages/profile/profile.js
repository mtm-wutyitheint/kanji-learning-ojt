import React from 'react';
import ScoreResult from '../../components/score-result/score-result';
import "./profile.scss"

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'naing aung lwin',
      password: '',
      n5Score: 0,
      n4Score: 0,
      image: {},
      examRecord: [
        {
          id: 1,
          score: 30,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 2,
          score: 35,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 3,
          score: 34,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 4,
          score: 10,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 5,
          score: 30,
          total: 40,
          level: 'N4',
          date: '7/29/2021'
        },
        {
          id: 6,
          score: 35,
          total: 40,
          level: 'N4',
          date: '7/29/2021'
        },
        {
          id: 7,
          score: 34,
          total: 40,
          level: 'N4',
          date: '7/29/2021'
        },
        {
          id: 5,
          score: 10,
          total: 40,
          level: 'N4',
          date: '7/29/2021'
        }
      ],
      practiseRecord: [
        {
          id: 1,
          score: 30,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 2,
          score: 35,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 3,
          score: 34,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 4,
          score: 10,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 5,
          score: 30,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 6,
          score: 35,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 7,
          score: 34,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        },
        {
          id: 8,
          score: 10,
          total: 40,
          level: 'N5',
          date: '7/29/2021'
        }
      ],
      examRecordN5: [],
      examRecordN4: [],
      practiseRecordN5: [],
      practiseRecordN4: []
    };
    this.fileChooser = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentDidMount() {
    let examN5 = [];
    let examN4 = [];
    let practiseN5 = [];
    let practiseN4 = [];
    if (this.state.examRecord && this.state.examRecord.length > 0) {
      examN5 = this.state.examRecord.filter(e => e.level === 'N5');
      examN4 = this.state.examRecord.filter(e => e.level === 'N4');
    }
    if (this.state.practiseRecord && this.state.practiseRecord.length > 0) {
      practiseN5 = this.state.practiseRecord.filter(e => e.level === 'N5');
      practiseN4 = this.state.practiseRecord.filter(e => e.level === 'N4');
    }
    this.setState({
      examRecordN5: examN5,
      examRecordN4: examN4,
      practiseRecordN5: practiseN5,
      practiseRecordN4: practiseN4,
    })
  }
  handleOnChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    })
  }
  fileImageChange(files) {
    console.log('file : ', files);
  }
  handleSubmit() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="profile">
        <div className="profile-container">
          <div className="user-image">
            <div className="profile-image">
              <div className="image"></div>
            </div>
            <button
              className="img-change-btn"
              onClick={() => this.fileChooser.click()}>
              <i className="fa fa-camera camera"></i>
            </button>
          </div>
          <input
            type="file"
            ref={(ref) => this.fileChooser = ref}
            className="file-chooser"
            accept="image/*"
            onChange={(e) => this.fileImageChange(e.target.files)}></input>
          <div className="user-profile-info">
            <form onSubmit={this.handleSubmit}>
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-field"
                value={this.state.name}
                onChange={this.handleOnChange}></input>
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-field"
                value={this.state.password}
                onChange={this.handleOnChange}></input>

              <label className="form-label">Current N5 Score</label>
              <input
                type="text"
                name="n5"
                className="form-field"
                value={this.state.n5Score}
                disabled></input>
              <label className="form-label">Current N4 Score</label>
              <input
                type="text"
                name="n4"
                className="form-field"
                value={this.state.n4Score}
                disabled></input>
              <div className="form-btn">
                <button
                  type="submit"
                  className="btn-save">save</button>
              </div>
            </form>
          </div>
        </div>
        <div className='record'>
          <div className="record-container">
            {this.state.examRecordN5.length > 0 &&
              <div className="record-sub-container">
                <h2>Exam result of N5</h2>
                <ScoreResult data={this.state.examRecordN5}></ScoreResult>
              </div>
            }
          </div>
          <div className="record-container">
            {this.state.examRecordN4.length > 0 &&
              <div className="record-sub-container">
                <h2>Exam result of N4</h2>
                <ScoreResult data={this.state.examRecordN4}></ScoreResult>
              </div>
            }
          </div>
          <div className="record-container">
            {this.state.practiseRecordN5.length > 0 &&
              <div className="record-sub-container">
                <h2>Practise result of N5</h2>
                <ScoreResult data={this.state.practiseRecordN5}></ScoreResult>
              </div>
            }</div>
          <div className="record-container">
            {this.state.practiseRecordN4.length > 0 &&
              <div className="record-sub-container">
                <h2>Practise result of N4</h2>
                <ScoreResult data={this.state.practiseRecordN4}></ScoreResult>
              </div>
            }</div>
        </div>
      </div>
    )
  }
}

export default Profile;