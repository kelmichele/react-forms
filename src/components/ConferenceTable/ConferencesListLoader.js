import React, { Component } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import ConferencesList from './ConferencesList';
import classes from './Conferences.module.scss';


const ListConferences = `query ListConferences(
  $filter: ModelConferenceFilterInput
  $limit: Int
  $nextToken: String
) {
  listConferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      category
      date
      summary
      image
      video
      description
      link
    }
    nextToken
  }
}
`;


const SubscribeToNewConferences = `
  subscription OnCreateConference {
    onCreateConference {
      id
      title
      category
      date
      summary
      image
      video
      description
      link
    }
  }
`;


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
      <Connect
        query={graphqlOperation(ListConferences)}
        subscription={graphqlOperation(SubscribeToNewConferences)}
        onSubscriptionMsg={this.onNewConference}
      >
        {({ data, loading }) => {
          if (loading) { return <div className={classes.medDef}>Loading...</div>; }
          if (!data.listConferences) return;
          return <ConferencesList conferences={data.listConferences.items} />;
        }}
      </Connect>
    )
  }
}
export default ConferencesListLoader;