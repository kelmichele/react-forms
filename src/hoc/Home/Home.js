import React from 'react';
import classes from '../../App.module.scss';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { S3Album } from 'aws-amplify-react';
Amplify.configure(awsconfig);

const home = (props) => (
  <div className={classes.homePage}>
    <div className={classes.medDef}>
      <h1>Welcome</h1>
      <S3Album level="public" path='' identityId='' picker='' />
      
    </div>
  </div>
);
export default home;