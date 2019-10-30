// import React from 'react';
import React, {Component} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import classes from './App.module.scss';

import ConferencesListLoader from "./components/ConferenceTable/ConferencesListLoader";
import ConferenceDetailsLoader from "./components/ConferenceTable/ConferenceDetailsLoader";

import FormComponent from './components/FormComponent/FormComponent';
import Content from './components/Content/Content';
import Home from './hoc/Home/Home';
import Blog from './components/Blog/Blog';
import BlogPost from './components/BlogPost/BlogPost';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config);

// const listConferences = `query listConferences {
//   listConferences{
//     items{
//       id
//       category
//       date
//       title
//       summary
//       image
//       video
//       description
//       link
//     }
//   }
// }`;

// const addConference = `mutation createConference($category:String! $date:String! $title:String! $summary:String! $image:String! $video:String! $description:String! $link:String!) {
//   createConference(input:{
//     category: $category
//     date: $date
//     title: $title
//     summary: $summary
//     image: $image
//     video: $video
//     description: $description
//     link: $link
//   }){
//     id
//     category
//     date
//     title
//     summary
//     image
//     video
//     description
//     link
//   }
// }`;


class App extends Component {
  // conferenceMutation = async () => {
  //   const conferenceDetails = {
      // title: "2019 Conference",
      // category: "Keynote",
      // date: "10/31/2019",
      // summary: "This is a summary for the event listed.",
      // image: "",
      // video: "",
      // description: "This is a description for this event. Pretend that it is longer.",
      // link: "http://react-forms-20191029132121-hostingbucket-reactforms.s3-website-us-east-1.amazonaws.com/blog"
  //   };

  //   const newConference = await API.graphql(graphqlOperation(addConference, conferenceDetails));
  //   alert(JSON.stringify(newConference));
  // };

  // listQuery = async () => {
  //   console.log('listing conferences');
  //   const allConferences = await API.graphql(graphqlOperation(listConferences));
  //   alert(JSON.stringify(allConferences));
  // };
  
  render() {
    let routes = (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/form-component" component={FormComponent} />
        <Route path='/blog/:blogPost' component={BlogPost}/>
        <Route path="/conferences" exact component={ConferencesListLoader} />
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
          </ul>
          <hr/>
        </div>
        <Content>
          {routes}
          
          <div className="qlSec">
            <div className={classes.inside}>
              <hr/>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;
