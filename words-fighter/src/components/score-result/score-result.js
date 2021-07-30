import React from 'react';
import './score-result.scss';

class ScoreResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }

  render() {
    return (
      <div className="exam-result">
        {this.state.data.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Score</th>
                <th>Total</th>
                <th>Answer Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((result, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{result.score}</td>
                    <td>{result.total}</td>
                    <td>{result.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default ScoreResult;