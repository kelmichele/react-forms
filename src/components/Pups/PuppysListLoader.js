import React, { Component } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import PuppysList from './PuppysList';
import classes from './Puppys.module.scss';
import { listPuppys } from '../../graphql/queries';
import { onCreatePuppy } from '../../graphql/subscriptions';

class PuppysListLoader extends Component {
  onNewPuppy = (prevQuery, newData) => {
    // When we get data about a new puppy, we need to put in into an object 
    // with the same shape as the original query results, but with the new data added as well
    let updatedQuery = Object.assign({}, prevQuery);
    updatedQuery.listPuppys.items = prevQuery.listPuppys.items.concat([newData.onCreatePuppy]);
    return updatedQuery;
  }
  
  render() {
    return (
      <div className={classes.PuppyListPage}>
        <div className={classes.medDef}>
          <div className={classes.CLpageHead}>
            <h1>Meet the Puppies</h1>
            <Link to="/new-puppy" className={classes.button}>Add a Puppy</Link>
          </div>
        </div>
      
        <Connect
          query={graphqlOperation(listPuppys)}
          subscription={graphqlOperation(onCreatePuppy)}
          onSubscriptionMsg={this.onNewPuppy}
        >
          {({ data, loading }) => {
            if (loading) { return <div className={classes.medDef} style={{marginTop:'15px'}}>Loading...</div>; }
            if (!data.listPuppys) return;
            return <PuppysList puppys={data.listPuppys.items} />;
          }}
        </Connect>
      </div>
    )
  }
}
export default PuppysListLoader;