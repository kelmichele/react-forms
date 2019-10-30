import React, { Component } from 'react';
import classes from './Conferences.module.scss';

class ConferenceDetails extends Component {
  render() {
    return (
      <div className={classes.ConferenceDetails}>
        <div className={classes.med2Def}>
          <h3>{this.props.conference.title}</h3>
          <p><b>Category:</b> {this.props.conference.category}</p>
          <p><b>Date:</b> {this.props.conference.date}</p>
          <p><b>Summary:</b> {this.props.conference.summary}</p>
          <p><b>Image:</b> {this.props.conference.image}</p>
          <p><b>Video:</b> {this.props.conference.video}</p>
          <p><b>Description:</b> {this.props.conference.description}</p>
          <a href={this.props.conference.link} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
      </div>
    )
  }
}
export default ConferenceDetails;