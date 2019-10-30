import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import classes from './Conferences.module.scss';
// import { listConferences } from '../../graphql/queries';
import { createConference } from '../../graphql/mutations';
import { onCreateConference } from '../../graphql/subscriptions';
import { Link } from 'react-router-dom';

// summary image video link

class NewConferencePage extends Component {
  state = { title: '', category: '', date: '', summary: '', image: '', video: '', description: '', link: '', conferences: [] }

  async componentDidMount() {
    this.subscription = API.graphql(
      graphqlOperation(onCreateConference)
    ).subscribe({
      next: conferenceData => {
        const conference = conferenceData.value.data.onCreateConference;
        const conferences = [
          ...this.state.conferences.filter(c => {
            return (
              c.title !== conference.title && c.category !== conference.category && c.date !== conference.date && c.summary !== conference.summary && c.image !== conference.image && c.video !== conference.video && c.description !== conference.description && c.link !== conference.link
            )
          }),
          conference
        ]
        this.setState({ conferences });
      }
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  createConference = async () => {
    const { title, category, date, summary, image, video, description, link } = this.state
    if (title === '' || category === '' || date  === '' || summary  === '' || image === '' || video === '' || description === '' || link === '') return
    try {
      const conference = {title, category, date, summary, image, video, description, link};
      const conferences = [...this.state.conferences, conference];
      this.setState({ conferences, title: '', category: '', date: '', summary: '', image: '', video: '', description: '', link: '' });
      await API.graphql(graphqlOperation(createConference, {input: conference}));
      console.log('Conference successfully created!');
    } catch (err) {
      console.log('error: ', err);
    }
  }
  
  render() {
    return (
      <div className={classes.NewConfPage}>
        <div className={classes.medDef}>
          <h1>Add a Conference</h1>
          
          <div className={classes.form}>
            <input
              className={classes.formStyle}
              name='title'
              placeholder='Conference title'
              onChange={this.onChange}
              value={this.state.title}
            />
            
            {/* <select name='category' className={classes.formStyle}>
              <option selected value=""></option>
              <option value="Keynote">Keynote</option>
              <option value="Fireside">Fireside</option>
              <option value="Panel">Panel</option>
              <option value="Other">Other</option>
            </select> */}
            
            <input
              className={classes.formStyle}
              name='category'
              placeholder='Conference category'
              onChange={this.onChange}
              value={this.state.category}
            />
            <input
            type="date"
              className={classes.formStyle}
              name='date'
              placeholder='Conference date'
              onChange={this.onChange}
              value={this.state.date}
            />
            <textarea
              className={classes.formStyle}
              name='summary'
              placeholder='Conference summary'
              onChange={this.onChange}
              value={this.state.summary}
            />
            <input
              className={classes.formStyle}
              name='image'
              placeholder='Conference image'
              onChange={this.onChange}
              value={this.state.image}
            />
            <input
              className={classes.formStyle}
              name='video'
              placeholder='Conference video'
              onChange={this.onChange}
              value={this.state.video}
            />
            <textarea
              className={classes.formStyle}
              name='description'
              placeholder='Conference description'
              onChange={this.onChange}
              value={this.state.description}
            />
            <input
              className={classes.formStyle}
              name='link'
              placeholder='Conference link'
              onChange={this.onChange}
              value={this.state.link}
            />
            <button
              onClick={this.createConference}
            >Create Conference</button>
          </div>
      
          {this.state.conferences.map((conf, i) => (
            <li key={conf.id} className={classes.newItem}>
              <Link to={{pathname: `/conferences/${conf.id}`}} className={classes.newItemLink}>{conf.title}</Link>
            </li>
          ))}              
        </div>
      </div>
    )
  }
}
export default NewConferencePage;