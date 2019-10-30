import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from "./Conferences.module.scss";

function makeComparator(key, order = 'asc') {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;

    return order === 'desc' ? (comparison * -1) : comparison
  };
}

// const listLink = () => {
//   "/conferences" + this.props.match.params.conferenceId
// }

class ConferencesList extends Component {
  conferenceItems() {
    return this.props.conferences.sort(makeComparator('title')).map(conference =>
      <li key={conference.id} className={classes[conference.category]}>
        <Link to={{pathname: `/conferences/${conference.id}`}}>{conference.title}-- Link</Link>
      </li>
    );
  }

  render() {
    return (
      <div className={classes.ConferencesList}>
        <div className={classes.ConfListHead}>
          <div className={classes.medDef}>
            <h1>Conferences</h1>
          </div>
        </div>

        <div className={classes.ConfListBody}>
          <div className={classes.medDef}>
            <ul className={classes.ConfListings}>
              {this.conferenceItems()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferencesList;