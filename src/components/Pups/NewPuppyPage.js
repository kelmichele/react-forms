import React, { useState, useReducer, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
// import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import classes from './Puppys.module.scss';
import { createPuppy as CreatePuppy } from '../../graphql/mutations';
import { listPuppys } from '../../graphql/queries';
import { onCreatePuppy } from '../../graphql/subscriptions';
import config from '../../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

const initialState = {
  puppys: []
}

function reducer(state, action) {
  switch(action.type) {
    case 'SET_PUPPYS':
      return { ...state, puppys: action.puppys }
    case 'ADD_PUPPY':
      return { ...state, puppys: [action.puppy, ...state.puppys] }
    default:
      return state
  }
}

function NewPuppyPage() {
  const [file, updateFile] = useState(null)
  const [name, updateName] = useState('')
  const [description, updateDescription] = useState('')
  const [fact, updateFact] = useState('')
  // const [video, updateVideo] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [ imageUrl, updateImageUrl] = useState('')

  function handleChange(event) {
    const { target: { value, files } } = event
    const [image] = files || []
    updateFile(image || value)
  }
  
  // async function fetchImage(key) {
  //   try {
  //     const imageData = await Storage.get(key)
  //     updateImageUrl(imageData)
  //   } catch(err) {
  //     console.log('error: ', err)
  //   }
  // }

  async function fetchPuppys() {
    try {
     let puppys = await API.graphql(graphqlOperation(listPuppys))
     puppys = puppys.data.listPuppys.items
     dispatch({ type: 'SET_PUPPYS', puppys })
    } catch(err) {
      console.log('error fetching puppys')
    }
  }

  async function createPuppy(event) {
    event.preventDefault()
    if (!name) return alert('Please complete the form.')
    if (file && name) {
        const { name: fileName, type: mimeType } = file  
        const key = `${fileName}`

        const fileForUpload = {
            bucket,
            key,
            region,
        }
        const inputData = { name, description, fact, image: fileForUpload}

        try {
          await Storage.put(key, file, {
            contentType: mimeType
          })
          await API.graphql(graphqlOperation(CreatePuppy, { input: inputData }))
          updateName('')
          updateDescription('')
          updateFact('')
          // updateVideo('')
          console.log('Successfully added puppy!')
        } catch (err) {
          console.log('error: ', err)
        }
    }
  }
  useEffect(() => {
    fetchPuppys()
    const subscription = API.graphql(graphqlOperation(onCreatePuppy))
      .subscribe({
        next: async puppyData => {
          const { onCreatePuppy } = puppyData.value.data
          dispatch({ type: 'ADD_PUPPY', puppy: onCreatePuppy })
        }
      })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className={[classes.NewPupPage, classes.newVersion].join(' ')}>
      <div className={classes.medDef}>
        <div className={classes.BodyGrid}>
          <div className={classes.FormSide}>
            <h3>Create a New Puppy</h3>
            <input
              placeholder='Name'              
              value={name}
              onChange={e => updateName(e.target.value)}
            />
            
            <input
              label="File to upload"
              type="file"
              onChange={handleChange}
              className={classes.inputFile}
            />
         
            <textarea
              placeholder='Description'              
              value={description}
              onChange={e => updateDescription(e.target.value)}
            />
            
            <textarea
              placeholder='Fact'              
              value={fact}
              onChange={e => updateFact(e.target.value)}
            />
            
            {/* <input
              placeholder='Video'              
              value={video}
              onChange={e => updateVideo(e.target.value)}
            /> */}
            
            <button
              onClick={createPuppy}>Create Puppy</button>
          </div>
            
          <div className={classes.ListSide}>
            <h3>All Puppys</h3>
            <ul>
              {state.puppys.map((pup, i) => {
                return(
                  <li key={i} className={classes.pupLink}>
                    <Link to={{pathname: `/pups/${pup.id}`}} className={classes.newItemLink}>{pup.name}</Link>
                  </li>
                )
              })}  
            </ul>
          </div>
        </div> 
      </div>
    </div>
  )
}
export default withAuthenticator(NewPuppyPage, { includeGreetings: true })