// 11-8 DETAILS PAGE -- BEFORE EDITS
import React, { Component } from 'react';
import { S3Image, withAuthenticator } from 'aws-amplify-react';
import classes from './Puppys.module.scss';
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify";
import awsconfig from '../../aws-exports';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import * as mutations from '../../graphql/mutations';
Amplify.configure(awsconfig);
// Storage.configure({ level: 'private' });
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = awsconfig

class PuppyDetails extends Component {
  // everything before render was added for delete/edit
  state = {
    openDel: false,
    openEdit: false,
    openPhotoEdit: false,
    puppyName: '',
    puppyImage: '',
    puppyDescription: '',
    puppyFact: ''
  };
  
  handleClickOpenDel = () => {
    console.log("Current Puppy: " + this.props.puppy.name);
    this.setState({ openDel: true });
  };
  handleCloseDel = () => {
    this.setState({ openDel: false });
  };
  handleDelete = () => {
    this.setState({ openDel: false });
    var puppyDetails = {
      id: this.props.puppy.id,
    }
    API.graphql(graphqlOperation(mutations.deletePuppy, { input: puppyDetails }));
    window.location.reload();
  };
  
  // added this and edited solo
  handleClickOpenEdit = () => {
    // console.log("Show Edit for " + this.props.puppy.name);
    this.setState({ openEdit: true });
  };
  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };
  
  handleClickOpenPhotoEdit = () => {
    this.setState({ openPhotoEdit: true });
  };
  handleClosePhotoEdit = () => {
    this.setState({ openPhotoEdit: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    // console.log(name + ": " + event.target.value)
  };
  
  // KPKP
    consoleState = () => {
      console.log("Image Key: " + this.props.puppy.image.key + '. pupImage:' + this.state.puppyImage + ".");
    };
    
    replacePhoto = name => event => {
      const file = event.target.files[0];
      const fileName = file.name
      
      this.setState({ 
        [name]: fileName
      })
      console.log(event.target.name + ": " + fileName + ". pupImage.state: " + this.state.puppyImage)
    }
      
    handlePhotoSubmit = (event) => {
      this.setState({ openEdit: false });
      var files = document.getElementById("puppyImage").files;
      const fileName = this.state.puppyImage
      const file = files[0];
      const key = `${fileName}`
      const fileForUpload = {
        bucket,
        region,
        key
      }
      const imageData = {
        id: this.props.puppy.id,
        image: fileForUpload
      }

      // try {
        Storage.put(fileName, file, {
          contentType: 'image/jpeg'
        })
        API.graphql(graphqlOperation(mutations.updatePuppy, { input: imageData }))
        console.log("state: " + this.state.puppyImage + ". props: " + this.props.puppy.image.key);
      // } catch (err) {
      //   console.log('error: ', err)
      // }      
    }
  // KPKP

  handleSubmit = (e) => {
    this.setState({ openEdit: false });    
    var puppyInfo = {
      id: this.props.puppy.id,
      name: this.state.puppyName || this.props.puppy.name,
      image: this.state.puppyImage || this.props.puppy.image,
      description: this.state.puppyDescription || this.props.puppy.description,
      fact: this.state.puppyFact || this.props.puppy.fact
    }
    
    API.graphql(graphqlOperation(mutations.updatePuppy, {input: puppyInfo}));
    alert('Puppy updated. Refresh page to see the changes.');
  }
  

  render() {
    return (
      <div className={classes.PuppyDetails}>
        <div className={classes.med2Def}>
          <div className={classes.pupCallout}>
            <h1>{this.props.puppy.name}</h1>
            {this.props.puppy.description ? <h2>{this.props.puppy.description}</h2> : ''}
            {this.props.puppy.image.key ? 
              <div className={classes.pupImage}><S3Image imgKey={this.props.puppy.image.key} level="private" /></div>
              : ''}
            
            {this.props.puppy.fact ? <h3><b>Fun Fact:</b> {this.props.puppy.fact}</h3> : ''}
          </div>

          <div className={classes.adminRow}>
            <button className={classes.editPup} aria-label="Edit" onClick={this.handleClickOpenEdit}>Edit Puppy</button>
            <Dialog
              open={this.state.openEdit}
              onClose={this.handleCloseEdit}
              aria-labelledby="edit-dialog-name"
            >
              <DialogTitle id="edit-dialog-name">Edit {this.props.puppy.name} Details</DialogTitle>
              
              <DialogContent>
                <div className={classes.editForm}>
                  <label>Name:</label><br />
                  <input
                    className={classes.formStyle}
                    name='name'
                    id='puppyName'
                    defaultValue={this.props.puppy.name}
                    placeholder={this.props.puppy.name}
                    onChange={this.handleChange('puppyName')}
                  />

                  <label>Description:</label><br />
                  <textarea
                    className={classes.formStyle}
                    name='description'
                    id='puppyDescription'
                    defaultValue={this.props.puppy.description}
                    placeholder={this.props.puppy.description}
                    onChange={this.handleChange('puppyDescription')}
                  />
                  
                  <label>Fact:</label><br />
                  <textarea
                    className={classes.formStyle}
                    name='fact'
                    id='puppyFact'
                    defaultValue={this.props.puppy.fact}
                    placeholder={this.props.puppy.fact}
                    onChange={this.handleChange('puppyFact')}
                  />
                </div>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
              </DialogActions>
            </Dialog>
                 
          
            <button className={classes.editImg} onClick={this.handleClickOpenPhotoEdit}>Change Image</button>
            <Dialog
              open={this.state.openPhotoEdit}
              onClose={this.handleClosePhotoEdit}
              aria-labelledby="edit-photo-name"
            > 
              <DialogTitle id="edit-photo-name">Select a new photo</DialogTitle>
              <DialogContent>
                <div className={classes.editForm}>
                  {/* <label>Image:</label><br /> */}
                  <input
                    type="file"
                    name="image"
                    id='puppyImage'
                    onChange={this.replacePhoto('puppyImage')}
                  />
                  {/* <button onClick={this.handlePhotoSubmit}>Submit</button> */}
                </div>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={this.handlePhotoSubmit} color="primary">Submit</Button>
                <Button onClick={this.handleClosePhotoEdit} color="primary">Cancel</Button>
              </DialogActions>
            </Dialog>

                    
            <button className={classes.deletePup} onClick={this.handleClickOpenDel}>Delete Puppy</button>
            <Dialog
              open={this.state.openDel}
              onClose={this.handleCloseDel}
              aria-labelledby="delete-dialog-name"
            >
              <DialogTitle id="delete-dialog-name">Are you sure you want to delete puppy: {this.props.puppy.name}?</DialogTitle>
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
export default withAuthenticator(PuppyDetails);
// export default PuppyDetails;