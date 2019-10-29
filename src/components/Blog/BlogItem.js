import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Blog.module.scss';
import * as Markdown from 'react-markdown';
    
const blogItem = (props) => (
  <div className={classes.BlogBox}>
    <h3>{props.title}</h3>
    {props.mainImage ? <img src={props.mainImage.fields.file.url} alt={props.mainImage.fields.title} className={classes.imgResponsive} /> : ''}

    {props.postcontent ? <Markdown source={props.postcontent.split(" ").splice(0,40).join(" ").concat('...')} className={classes.blogBodyBox} /> : '' }
    
    <Link className={classes.linkMore}
      to={{
        pathname: `/blog/${props.path}`,
        state: { props }
      }}
    >
      More >>
    </Link>
  </div>
);
export default blogItem;