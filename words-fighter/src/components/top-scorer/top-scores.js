import React from 'react';
import { env } from '../../env/development';
import axios from 'axios';

class TopScorers extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const level = localStorage.getItem('level');
    const data = {
      _limit: 3
    };
    if (level === 'N4') {
      data._sort = 'current_n4_score:DESC';
    } else if (level === 'N5') {
      data._sort = 'current_n5_score:DESC';
    } else { }
    axios.get(env.apiEndPoint + '/users', { params: data })
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.data.map((top, i) => {
          return (

            <div key={i}>{top.username}</div>
          )
        })}
      </div>
    )
  }
}

export default TopScorers;