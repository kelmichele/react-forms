import React, { useState, useReducer, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
// import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import classes from './Conferences.module.scss';
import { createConference as CreateConference } from '../../graphql/mutations';
import { listConferences } from '../../graphql/queries';
import { onCreateConference } from '../../graphql/subscriptions';
import config from '../../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

const initialState = {
  conferences: []
}

function reducer(state, action) {
  switch(action.type) {
    case 'SET_CONFERENCES':
      return { ...state, conferences: action.conferences }
    case 'ADD_CONFERENCE':
      return { ...state, conferences: [action.conference, ...state.conferences] }
    default:
      return state
  }
}

function NewConferencePage() {
  const [file, updateFile] = useState(null)
  const [title, updateTitle] = useState('')
  const [category, updateCategory] = useState('')
  const [date, updateDate] = useState('')
  const [description, updateDescription] = useState('')
  const [link, updateLink] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [imageUrl, updateImageUrl] = useState('')
  const catList = [
  { id: 10976, name: 'Keynote' },
  { id: 20976, name: 'Fireside' },
  { id: 30976, name: 'Panel' },
  { id: 40976, name: 'Other' }
];
  

  function handleChange(event) {
    const { target: { value, files } } = event
    const [image] = files || []
    updateFile(image || value)
  }
  
  async function fetchImage(key) {
    try {
      const imageData = await Storage.get(key)
      updateImageUrl(imageData)
    } catch(err) {
      console.log('error: ', err)
    }
  }

  async function fetchConferences() {
    try {
     let conferences = await API.graphql(graphqlOperation(listConferences))
     conferences = conferences.data.listConferences.items
     dispatch({ type: 'SET_CONFERENCES', conferences })
    } catch(err) {
      console.log('error fetching conferences')
    }
  }

  async function createConference(event) {
    event.preventDefault()
    if (!title) return alert('please complete the form')
    if (file && title) {
        const { name: fileName, type: mimeType } = file  
        const key = `${fileName}`
        // const key = `${uuid()}${fileName}`
        const fileForUpload = {
            bucket,
            key,
            region,
        }
        const inputData = { title, category, date, description, link, image: fileForUpload}

        try {
          await Storage.put(key, file, {
            contentType: mimeType
          })
          await API.graphql(graphqlOperation(CreateConference, { input: inputData }))
          updateTitle('')
          updateCategory('')
          updateDate('')
          updateDescription('')
          updateLink('')
          console.log('successfully stored data!')
        } catch (err) {
          console.log('error: ', err)
        }
    }
  }
  useEffect(() => {
    fetchConferences()
    const subscription = API.graphql(graphqlOperation(onCreateConference))
      .subscribe({
        next: async conferenceData => {
          const { onCreateConference } = conferenceData.value.data
          dispatch({ type: 'ADD_CONFERENCE', conference: onCreateConference })
        }
      })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className={[classes.NewConfPage, classes.newVersion].join(' ')}>
      <div className={classes.medDef}>
        <div className={classes.BodyGrid}>
          <div className={classes.FormSide}>
            <h3>Create a New Conference</h3>
            <input
              placeholder='Title'              
              value={title}
              onChange={e => updateTitle(e.target.value)}
            />
            
            <select value={category} onChange={e => updateCategory(e.target.value)}>
              <option value="">Select a Category</option>
               {catList.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            
            <input
              type="date"
              value={date}
              placeholder='Date'
              onChange={e => updateDate(e.target.value)}
            />
            
            <textarea
              placeholder='Description'              
              value={description}
              onChange={e => updateDescription(e.target.value)}
            />
            
            <input
              label="File to upload"
              type="file"
              onChange={handleChange}
              className={classes.inputFile}
            />
            
            <input
              placeholder='Link'              
              value={link}
              onChange={e => updateLink(e.target.value)}
            />
            
            <button
              onClick={createConference}>Create Conference</button>
          </div>
            
          <div className={classes.ListSide}>
            <h3>All Conferences</h3>
            <ul>
              {state.conferences.map((conf, i) => {
                return(
                // <li key={i} className={classes.newItem}>
                <li key={i} className={classes.confLink}>
                  {/* <img
                    src={imageUrl}
                    style={{ width: '300' }}
                    alt="alternative"
                  /> */}
                  <Link to={{pathname: `/conferences/${conf.id}`}} className={classes.newItemLink}>{conf.title}</Link>
                  <div className={classes.clearfix} />
                  {conf.category ? <small>{conf.category}<br /></small> : ''}
                  {conf.date ? <small>{conf.date}<br /></small> : ''}
                  {conf.description ? <small>{conf.description}<br /></small> : ''}
                  {conf.link ? <small>{conf.link}<br /></small> : ''}
                </li>
              )})}  
            </ul>
          </div>
        </div> 
      </div>
    </div>
  )
}
export default withAuthenticator(NewConferencePage, { includeGreetings: true })