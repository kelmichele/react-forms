import React, { Component } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import classes from './Puppys.module.scss';
import PuppyDetails from "./PuppyDetails";
import { getPuppy } from '../../graphql/queries';

class PuppyDetailsLoader extends Component {
  render() {
    return (
      <Connect query={graphqlOperation(getPuppy, { id: this.props.id })}>
        {({ data, loading }) => {
          if (loading) { return <div className={classes.medDef}>Loading...</div>; }
          if (!data.getPuppy) return;

          return <PuppyDetails puppy={data.getPuppy} />;
        }}
      </Connect>      
    )
  }
}
export default PuppyDetailsLoader;