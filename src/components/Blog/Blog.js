import React from 'react';
import * as contentful from 'contentful';
import BlogItem from './BlogItem';
import classes from './Blog.module.scss';

const CONTENTAK = process.env.REACT_APP_API_CONTENTAK;
const CONTENT_SPACE = process.env.REACT_APP_API_CONTENT_SPACE;

class Blog extends React.Component {  
  state = {
    posts: []
  }
    
  client = contentful.createClient({
    space: CONTENT_SPACE,
    accessToken: CONTENTAK
  })
    
  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
    this.fetchPosts().then(entries => {
      entries.items.forEach(entry => {
        if(entry.fields) {
          console.log(entry.fields)
        }
      })
    });
  }  
  
  // fetchPosts = () => this.client.getEntries();
  fetchPosts = () => this.client.getEntries({
    content_type: 'blog',
    include: 2
  })

  setPosts = response => {
    this.setState({
      posts: response.items
    })
  }  
  
  render() {
    return (
      <div className={classes.BlogPage}>
        <div className={classes.BlogHeader}>
          <h1>Welcome to Our Blog</h1>
        </div>
        
        <div className={classes.med2Def}>
          {this.state.posts.map(({fields}, i) =>
            <BlogItem key={i} {...fields} />
          )}
        </div>
      </div>
    )
  }
}
export default Blog;