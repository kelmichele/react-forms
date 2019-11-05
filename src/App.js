// import React from 'react';
import React, {Component} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import classes from './App.module.scss';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, S3Album } from 'aws-amplify-react';

import SignIn from "./SignIn";
import ConferencesListLoader from "./components/ConferenceTable/ConferencesListLoader";
import ConferenceDetailsLoader from "./components/ConferenceTable/ConferenceDetailsLoader";
import NewConferencePage from "./components/ConferenceTable/NewConferencePage";
// import ConferenceCreate from "./components/ConferenceTable/ConferenceCreate";
import FormComponent from './components/FormComponent/FormComponent';
import Content from './components/Content/Content';
import Home from './hoc/Home/Home';
import Blog from './components/Blog/Blog';
import BlogPost from './components/BlogPost/BlogPost';
import Album from './components/Album/Album';
Amplify.configure(awsconfig);

class App extends Component {  
  render() {
    let routes = (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/form-component" component={FormComponent} />
        <Route path='/blog/:blogPost' component={BlogPost}/>
        <Route path='/album' component={Album}/>
        {/* <Route path="/new-conference" component={NewConferencePage} /> */}
        {/* <Route path="/create-conference" component={ConferenceCreate} /> */}
        <Route path="/conferences" exact component={NewConferencePage} />
        <Route path="/all-conferences" exact component={ConferencesListLoader} />
        <Route
          path='/conferences/:conferenceId'
          render={props => <ConferenceDetailsLoader id={props.match.params.conferenceId} />}
        />
      </Switch>
    );
    
    return (
      <div className={classes.App}>
        <div className={classes.inside}>
          <ul className={classes.navUl}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/form-component">Form</NavLink></li>
            <li><NavLink to="/conferences">Conferences</NavLink></li>
            <li><NavLink to="/album">Album</NavLink></li>
            <li><a href="http://react-forms-20191029132121-hostingbucket-reactforms.s3-website-us-east-1.amazonaws.com" target="_blank" rel="noopener noreferrer">Live App</a></li>
            {/* <li className={classes.LoginLink}>
              <NavLink to="/sign-in">Sign In</NavLink>
              <Authenticator />    
            </li> */}
          </ul>
          <hr/>
        </div>
        
        <Content>
          {routes}
          
          <div className="qlSec">
            <div className={classes.inside}>
              <hr style={{opacity:'.2'}}/>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
