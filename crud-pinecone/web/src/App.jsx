import { useEffect, useRef, useState } from 'react';
import axios from 'axios'

const baseUrl = "http://localhost:5001"

function App() {
  const titleInputRef = useRef(null)
  const bodyInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState("")
  const [data, setData] = useState([])
  
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
      setData(resp.data?.response?.matches);

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
        text: bodyInputRef.current.value,
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
    <div className='p-10'>
      <h1 className='text-center text-5xl mb-5 font-bold'>Social Stories</h1>

      <form onSubmit={postStory} className='md:w-1/2 mx-auto mb-10'>
        <label htmlFor="titleInput" className='w-full'>Title: </label>
        <input type="text" id="bodyInput" maxLength={20} minLength={2} required ref={titleInputRef} className='w-full border-2 mb-5 rounded-md p-2'/>
        <label htmlFor="bodyInput" className='w-full'>What's on your mind: </label>
        <textarea type="text" id="bodyInput" rows="5" maxLength={999} minLength={10} required ref={bodyInputRef} className='p-2 border border-2 rounded-md w-full mb-5'></textarea>
        <button type="submit" className='bg-slate-500 rounded-md px-8 py-2 text-white'>Post</button>
      </form>

      {alert && <div className='alert'>{alert}</div>}
      {isLoading ? <div className='text-white w-fit bg-slate-500 p-2 rounded-md'>Loading...</div>: ''}

    
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, i)=>(
          <div className='shadow-xl p-5 bg-slate-50' key={i}>
          <h2>{item?.metadata?.title}</h2>
          <p>{item?.metadata?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
