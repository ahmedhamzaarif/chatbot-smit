import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'

const baseUrl = "http://localhost:5001"

function App() {
  const titleInputRef = useRef(null)
  const bodyInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState("")
  const [data, setdata] = useState([])
  
  useEffect(() => {
    if(alert){
      setTimeout(()=>{
        setAlert("")
        console.log("TimeOut!")
      }, 5000)
      console.log("Effect!")
    }
  }, [alert])

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.get(`${baseUrl}/api/v1/stories`)
      console.log(resp.data);
      setData(resp.data);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }

  }

  const postStory = async (e)=>{
    e.preventDefault()

    try{
      setIsLoading(true)

      // const response = await axios.post(`${baseUrl}/api/v1/story`)
      const response = await axios.post(`${baseUrl}/api/v1/story`, {
        title: titleInputRef.current.value,
        body: bodyInputRef.current.value,
      });

      console.log('response: ', response.data)
      setIsLoading(false)
      setAlert(response?.data?.message)
      e.target.reset()
      console.log(data)
    } catch (e){
      setIsLoading(false)
      console.log(e.message)
    }

  }
  return (
    <>
      <h1>Social Stories</h1>
      <form onSubmit={postStory}>
        <label htmlFor="titleInput">Title: </label>
        <input type="text" id="bodyInput" maxLength={20} minLength={2} required ref={titleInputRef}/>

        <br />

        <label htmlFor="bodyInput">What's on your mind: </label>
        <textarea type="text" id="bodyInput" cols="30" rows="10" maxLength={999} minLength={10} required ref={bodyInputRef}></textarea>
        
        <br />

        <button type="submit">Post</button>
      </form>
      {alert && <div className='alert'>{alert}</div>}
      {isLoading ? <div>Loading...</div>: ''}
    </>
  );
}

export default App;
