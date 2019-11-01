import React, { Component } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import ConferencesList from './ConferencesList';
import classes from './Conferences.module.scss';
import { listConferences } from '../../graphql/queries';
import { onCreateConference } from '../../graphql/subscriptions';

class ConferencesListLoader extends Component {
  onNewConference = (prevQuery, newData) => {
    // When we get data about a new conference, we need to put in into an object 
    // with the same shape as the original query results, but with the new data added as well
    let updatedQuery = Object.assign({}, prevQuery);
    updatedQuery.listConferences.items = prevQuery.listConferences.items.concat([newData.onCreateConference]);
    return updatedQuery;
  }
  
  render() {
    return (
      <div className={classes.ConferenceListPage}>
        <div className={classes.CLpageHead}>
          <div className={classes.medDef}>
            <h1>Conferences</h1>
            <Link to="/new-conference" className={classes.button}>Add a Conference</Link>
          </div>
        </div>
      
        <Connect
          query={graphqlOperation(listConferences)}
          subscription={graphqlOperation(onCreateConference)}
          onSubscriptionMsg={this.onNewConference}
        >
          {({ data, loading }) => {
            if (loading) { return <div className={classes.medDef} style={{marginTop:'15px'}}>Loading...</div>; }
            if (!data.listConferences) return;
            return <ConferencesList conferences={data.listConferences.items} />;
          }}
        </Connect>
      </div>
    )
  }
}
export default ConferencesListLoader;