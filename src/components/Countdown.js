import React, { Component } from 'react';
import Clock from './Clock';
import CountdownForm from './CountdownForm';
import Controls from './Controls';
/* eslint-disable */
class Countdown extends Component {
  constructor(props){
    super(props);

    this.state = {
      count: 0,
      countdownStatus: 'stopped'
    }

  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.countdownStatus !== prevState.countdownStatus){
      switch (this.state.countdownStatus){
        case 'started':
          this.startCountdown();
          break;
        case 'stopped':
          this.setState({
            count: 0
          });
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = undefined;
  }

  startCountdown(){
    this.timer = setInterval(() => {
      let newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if(newCount === 0){
        this.setState({
          countdownStatus: 'stopped'
        });
      }
    }, 1000);
  }

  setCountdown = (seconds) => {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  }
  handleStatusChange = (newStatus) => {
    this.setState({
      countdownStatus: newStatus
    })
  }
  render(){
    const { count, countdownStatus } = this.state;
    const renderControlArea = () => {
      if (countdownStatus !== 'stopped'){
        return <Controls countdownStatus={countdownStatus} handleStatusChange={this.handleStatusChange}/>
        } else {
          return <CountdownForm setCountdown={this.setCountdown}/>
        }
      }
    return (
      <div>
        <h1 className="page-title">倒计时</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
}

export default Countdown;
