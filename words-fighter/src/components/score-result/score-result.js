import React from 'react';
import './score-result.scss';

class ScoreResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mode: ''
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      mode: this.props.mode
    })
  }

  render() {
    return (
      <div className="exam-result">
        {(this.state.data.length > 0 && this.state.mode === "exam") &&
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
                    <td>{new Date(result.answer_date).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        }

        {(this.state.data.length > 0 && this.state.mode === "practise") &&
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Score</th>
                <th>Total</th>
                <th>Kind</th>
                <th>Chapters</th>
                <th>Random Words</th>
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
                    <td>{result.kind}</td>
                    <td>
                      {result.chapters.length > 0 &&
                        <select>
                          {result.chapters.map((r, i) => {
                            return (
                              <option key={i} value={r}>{r}</option>
                            )
                          })}
                        </select>
                      }
                    </td>
                    <td>{result.random_count}</td>
                    <td>{new Date(result.answer_date).toLocaleDateString()}</td>
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