import React from 'react';
import { Link } from 'react-router-dom';
import classes from './BlogPost.module.scss';
import * as Markdown from 'react-markdown'

// const blogPost = (props) => (
const blogPost = ({ location: { state: { props } }}) => {
  return (
    <div className={classes.BlogPostPage}>
      <div className={classes.BlogHeader}>
        <h1>{props.title}</h1>
      </div>
      
      <div className={classes.BlogBod}>
        <div className={classes.med2Def}>      
          {props.mainImage ? <img src={props.mainImage.fields.file.url} alt={props.mainImage.fields.title} className={classes.imgResponsive} /> : ''}
          
          <Markdown source={props.postcontent} className={classes.blogBodyText} />
          
          <Link className={classes.linkBack} to="/blog"> ~ Back to Blog</Link>        
        </div>
      </div>
    </div>
)}
// )
export default blogPost;