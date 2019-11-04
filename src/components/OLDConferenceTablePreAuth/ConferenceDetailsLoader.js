import React, { Component } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import classes from './Conferences.module.scss';
import ConferenceDetails from "./ConferenceDetails";
import { getConference } from '../../graphql/queries';

// const GetConference = `query GetConference($id: ID!) {
//   getConference(id: $id) {
//     id
//     title
//     category
//     date
//     summary
//     image
//     video
//     description
//     link
//   }
// }
// `;

class ConferenceDetailsLoader extends Component {
  render() {
    return (
      <Connect query={graphqlOperation(getConference, { id: this.props.id })}>
        {({ data, loading }) => {
          if (loading) { return <div className={classes.medDef}>Loading...</div>; }
          if (!data.getConference) return;

          return <ConferenceDetails conference={data.getConference} />;
        }}
      </Connect>      
    )
  }
}
export default ConferenceDetailsLoader;