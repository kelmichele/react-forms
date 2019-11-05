// import React from 'react';
import React, {Component} from 'react';
import classes from './Album.module.scss';

import Amplify, {Storage} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { S3Album } from 'aws-amplify-react';
Amplify.configure(awsconfig);
Storage.configure({ level: 'private' });

class Album extends Component {
  // these were all name, not filename
  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const filename = file.name;

    Storage.put(filename, file).then(() => {
      this.setState({ file: filename });
    })
  }
  
  deleteFile = () => {
    Storage.remove('imagename.jpg', {level: 'private'})
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }
    
  render() {
    return (
      <div className={classes.Album}>  
        <div className={classes.inside}>
          <div className={classes.album}>
            <input type="file" onChange={this.uploadFile} />
            <button 
              className={classes.delete}
              onClick={this.deleteFile}
            >Delete Image</button>
            <hr style={{opacity:'.2'}}/>
            <div className={classes.clearfix} /><br/>
            {/* Public:<br/> */}
            {/* <S3Album level="public" path='' identityId='' picker='' /> */}
            {/* <hr style={{opacity:'.2'}}/> */}
            {/* Private:<br/> */}
            <S3Album level="private" path='' identityId='' picker='' />
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
