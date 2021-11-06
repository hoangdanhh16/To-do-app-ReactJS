import { useReducer, useRef } from 'react'

//Initial State
const initialState = {
  job: '', 
  jobs: []
}


//Actions
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DEL_JOB = 'delele_job'

const setJob = payload => {
  return {
    type: SET_JOB,
    payload
  }
}

const addJob = payload => {
  return {
    type: ADD_JOB,
    payload
  }
}

const delJob = payload => {
  return {
    type: DEL_JOB,
    payload
  }
}

//Reducer
const reducer = (state, action) => {
  
  console.log('Action:', action );
  console.log('Prev State', state);

  let newState

  switch(action.type) {
    case SET_JOB:
      newState =  {
        ...state,
        job: action.payload
      }
      break
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
      break
    case DEL_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)
      newState = {
        ...state,
        jobs: newJobs
      }
      break
    default: 
      throw new Error(`Invalid action`)
  }

  console.log('New State: ', newState);
  return newState
}


function App() {

  

  const [state, dispatch] = useReducer(reducer, initialState)

  const {job, jobs} = state

  const inputRef = useRef()

  const handleSubmit = () => {
    dispatch(addJob(job))
    dispatch(setJob(''))
    inputRef.current.focus()
  }

  return (
    <div style = {{ padding: '0 20px' }}>
      <h1>To do list</h1>
      <input 
        ref = {inputRef}
        value = {job} 
        onChange = { e => { 
          dispatch(setJob(e.target.value))
        }}
        placeholder = 'Enter what to to...'
      />
      <button onClick = {handleSubmit}>
        Add
      </button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job} 
            <span onClick = {() => dispatch(delJob(index))}>&times;</span>  
          </li>

        ))}
      </ul>
    </div>
  )
}
export default App