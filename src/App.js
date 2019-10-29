// import React from 'react';
import React, {Component} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import classes from './App.module.scss';
import FormComponent from './components/FormComponent/FormComponent';
import Content from './components/Content/Content';
import Home from './hoc/Home/Home';
import Blog from './components/Blog/Blog';
import BlogPost from './components/BlogPost/BlogPost';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/form-component" component={FormComponent} />
        <Route path='/blog/:blogPost' component={BlogPost}/>
      </Switch>
    );

    return (
      <div className={classes.App}>
        <div className={classes.inside}>
          <ul className={classes.navUl}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/form-component">Form</NavLink></li>
          </ul>
          <hr/>
        </div>
        <Content>
          {routes}
        </Content>
      </div>
    );
  }
}

export default App;
