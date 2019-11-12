import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { S3Image } from 'aws-amplify-react';
import classes from "./Puppys.module.scss";

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
// /public/images/*"

class PuppysList extends Component {
  puppyItems() {
    return this.props.puppys.sort(makeComparator('name')).map(puppy =>
      <li key={puppy.id} className={classes.pup}>
        <Link to={{pathname: `/pups/${puppy.id}`}} className={classes.pupLink}>
          {puppy.image.key ? 
            <div className={classes.pupImage}><S3Image imgKey={puppy.image.key} level="private" /></div>
            : ''}
          <h4>{puppy.name}</h4>
        </Link>
      </li>
    );
  }
  

  render() {
    return (
      <div className={classes.PuppysList}>
        <div className={classes.PupListBody}>
          <div className={classes.medDef}>
            <ul className={classes.PupListings}>
              {this.puppyItems()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PuppysList;