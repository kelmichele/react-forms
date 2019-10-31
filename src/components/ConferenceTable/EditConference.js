import React, { Component } from 'react';
import classes from './Conferences.module.scss';
import { API, graphqlOperation } from "aws-amplify";
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as mutations from '../../graphql/mutations';

class EditConference extends Component {
  state = {
    open: false,
    conferenceTitle: '',
  };
  
  handleClickOpen = () => {
    console.log("Current Conference: " + this.props.currentConference.title)
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleSubmit = (e) => {
    this.setState({ open: false });
    var conferenceDetails = {
      id: this.props.currentConference.id,
      title: this.state.conferenceTitle || this.props.currentConference.title,
      description: this.state.conferenceDescription || this.props.currentConference.description
    }
    API.graphql(graphqlOperation(mutations.updateConference, {input: conferenceDetails}));
  }
  render() {
    return (
      <div className={classes.EditConf}>
        <div className={classes.medDef}>
          <h3>Edit {this.props.conference.title}</h3>
          <small>{this.props.conference.id}</small>
          {/* <Button size='small' color="inherit" aria-label="Edit" onClick={this.handleClickOpen}>
            EDIT!
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          > */}
            {/* <DialogTitle id="form-dialog-title">Edit Item: {this.props.currentItem.name}</DialogTitle> */}
            {/* <DialogContent> */}
              <TextField
                style={{marginRight: 10}}
                id="conferenceTitle"
                placeholder={this.props.currentConference.title}
                label="Title"
                type="string"
                onChange={this.handleChange('conferenceTitle')}
              />
              <TextField
                style={{marginTop: 10}}
                multiline
                id="conferenceDescription"
                placeholder={this.props.currentConference.description}
                label="Description"
                type="string"
                rows="4"
                fullWidth
                onChange={this.handleChange('conferenceDescription')}
              />
            {/* </DialogContent> */}
            
            {/* <DialogActions> */}
              <Button onClick={this.handleClose} color="primary">Cancel</Button>
              <Button onClick={this.handleSubmit} color="primary">Submit</Button>
            {/* </DialogActions> */}
          {/* </Dialog> */}
        </div>
      </div>
    );
  }
}
export default EditConference;
  
          
          // <p><b>Category:</b> {this.props.conference.category}</p>
          // <p><b>Date:</b> {this.props.conference.date}</p>
          // <p><b>Summary:</b> {this.props.conference.summary}</p>
          // <p><b>Image:</b> {this.props.conference.image}</p>
          // <p><b>Video:</b> {this.props.conference.video}</p>
          // <p><b>Description:</b> {this.props.conference.description}</p>
          // <a href={this.props.conference.link} target="_blank" rel="noopener noreferrer">Learn More</a>
          // <div className={classes.adminRow}>