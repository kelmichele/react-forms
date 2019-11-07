import React, { Component } from 'react';
import { S3Image } from 'aws-amplify-react';
// import { withAuthenticator } from 'aws-amplify-react';
import classes from './Conferences.module.scss';
// import DeleteConferencePage from './DeleteConferencePage';
import { API, graphqlOperation } from "aws-amplify";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as mutations from '../../graphql/mutations';

class ConferenceDetails extends Component {
  // everything before render was added for delete/edit
  state = {
    openDel: false,
    openEdit: false,
    conferenceTitle: '',
    conferenceCategory: '',
    conferenceDate: '',
    conferenceSummary: '',
    conferenceImage: '',
    conferenceVideo: '',
    conferenceDescription: ''
  };
  
  handleClickOpenDel = () => {
    console.log("Current Conference: " + this.props.conference.title);
    this.setState({ openDel: true });
  };
  handleCloseDel = () => {
    this.setState({ openDel: false });
  };
  handleDelete = () => {
    this.setState({ openDel: false });
    var conferenceDetails = {
      id: this.props.conference.id,
    }
    API.graphql(graphqlOperation(mutations.deleteConference, { input: conferenceDetails }));
    window.location.reload();
  };
  
  // added this and edited solo
  handleClickOpenEdit = () => {
    console.log("Show Edit for " + this.props.conference.title);
    this.setState({ openEdit: true });
  };
  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleSubmit = (e) => {
    this.setState({ openEdit: false });
    var conferenceInfo = {
      id: this.props.conference.id,
      title: this.state.conferenceTitle || this.props.conference.title,
      category: this.state.conferenceCategory || this.props.conference.category,
      date: this.state.conferenceDate || this.props.conference.date,
      summary: this.state.conferenceSummary || this.props.conference.summary,
      image: this.state.conferenceImage || this.props.conference.image,
      video: this.state.conferenceVideo || this.props.conference.video,
      description: this.state.conferenceDescription || this.props.conference.description
    }
    API.graphql(graphqlOperation(mutations.updateConference, {input: conferenceInfo}));
    // window.location.reload();
    alert('Conference updated. Refresh page to see the changes.');
  }
  

  render() {
    return (
      <div className={classes.ConferenceDetails}>
        <div className={classes.med2Def}>
          <h3>{this.props.conference.title}</h3>
          {/* <small>id: {this.props.conference.id}</small><div className={classes.clearfix}/><br/> */}
          
          {this.props.conference.image ? 
            <div className={classes.confImage}><S3Image imgKey={this.props.conference.image.key} level="private" className={classes.KPs3} /></div>
            : ''}
            
          {/* <img
            src={this.props.conference.image.key}
            className={classes.imgResponsive}
            style={{ width: '300' }}
            alt="alternative"
          /> */}
          
          {this.props.conference.category ? <p><b>Category:</b> {this.props.conference.category}</p> : ''}
          {this.props.conference.date ? <p><b>Date:</b> {this.props.conference.date}</p> : ''}
          {this.props.conference.image.key ? <p><b>Image Key:</b> {this.props.conference.image.key}</p> : '' }
          {this.props.conference.description ? <p><b>Description:</b> {this.props.conference.description}</p> : ''}
          {this.props.conference.link ? <a href={this.props.conference.link} target="_blank" rel="noopener noreferrer">Learn More</a> : ''}
          
          <div className={classes.adminRow}>
            <button className={classes.editConf} aria-label="Edit" onClick={this.handleClickOpenEdit}>Edit Conference</button>
            <Dialog
              open={this.state.openEdit}
              onClose={this.handleCloseEdit}
              aria-labelledby="edit-dialog-title"
            >
              <DialogTitle id="edit-dialog-title">Edit {this.props.conference.title} Details</DialogTitle>
              
              <DialogContent>
                <div className={classes.editForm}>
                  <label>Title:</label><br />
                  <input
                    className={classes.formStyle}
                    name='title'
                    id='conferenceTitle'
                    defaultValue={this.props.conference.title}
                    placeholder={this.props.conference.title}
                    onChange={this.handleChange('conferenceTitle')}
                  />
                  
                  <label>Category:</label><br />
                  <select id="conferenceCategory" name='category' defaultValue={this.props.conference.category} placeholder={this.props.conference.category} onChange={this.handleChange('conferenceCategory')} className={classes.formStyle}>
                    <option value="">Select a Category</option>
                    <option value="Keynote">Keynote</option>
                    <option value="Fireside">Fireside</option>
                    <option value="Panel">Panel</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <label>Date:</label><br />
                  <input
                    type="date"
                    className={classes.formStyle}
                    name='date'
                    id='conferenceDate'
                    defaultValue={this.props.conference.date}
                    placeholder={this.props.conference.date}
                    onChange={this.handleChange('conferenceDate')}
                  />                
                  {/* 
                  <label>Image:</label><br />
                  <input
                    className={classes.formStyle}
                    name='image'
                    id='conferenceImage'
                    defaultValue={this.props.conference.image}
                    placeholder={this.props.conference.image}
                    onChange={this.handleChange('conferenceImage')}
                  /> */}

                  <label>Description:</label><br />
                  <textarea
                    className={classes.formStyle}
                    name='description'
                    id='conferenceDescription'
                    defaultValue={this.props.conference.description}
                    placeholder={this.props.conference.description}
                    onChange={this.handleChange('conferenceDescription')}
                  />
                  
                  <label>Link:</label><br />
                  <input
                    className={classes.formStyle}
                    name='link'
                    id='conferenceLink'
                    defaultValue={this.props.conference.link}
                    placeholder={this.props.conference.link}
                    onChange={this.handleChange('conferenceLink')}
                  />
                </div>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
              </DialogActions>
            </Dialog>
          
          
            <button className={classes.deleteConf} onClick={this.handleClickOpenDel}>Delete Conference</button>
            <Dialog
              open={this.state.openDel}
              onClose={this.handleCloseDel}
              aria-labelledby="delete-dialog-title"
            >
              <DialogTitle id="delete-dialog-title">Are you sure you want to delete conference: {this.props.conference.title}?</DialogTitle>
              <DialogActions>
                <Button onClick={this.handleCloseDel} color="primary">Cancel</Button>
                <Button onClick={this.handleDelete} color="primary">Delete</Button>
              </DialogActions>
            </Dialog>
          
          
          
          </div>
        </div>
      </div>
    )
  }
}
// export default withAuthenticator(ConferenceDetails, { includeGreetings: true })
export default ConferenceDetails;