import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import Loader from './components/Loader';
import Alert from './components/Alert';

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
      console.log(e.message);
      setAlert(e.message)
    }

  }

  const postStory = async (e)=>{
    e.preventDefault()

    try{
      setIsLoading(true)
      const response = await axios.post(`${baseUrl}/api/v1/story`, {
        title: titleInputRef.current.value,
        text: bodyInputRef.current.value,
      });

      console.log('response: ', response.data)
      setIsLoading(false)
      getAllStories()
      setAlert(response?.data?.message)
      e.target.reset()
      console.log(data)
    } catch (e){
      setIsLoading(false)
      console.log(e.message)
    }
  }
  const deleteStory = async (id)=>{
    try{
      setIsLoading(true)
      const response = await axios.delete(`${baseUrl}/api/v1/story/${id}`)
      console.log("response: ", response.data)
      setIsLoading(false)
      setAlert(response?.data?.message)
      getAllStories()
    }catch(e){
      console.log(e.message)
    }
  }
  const updateStory = async (e, id)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
      const response = await axios.put(`${baseUrl}/api/v1/story/${id}`, {
        title: e.target.titleInput.value,
        text: e.target.bodyInput.value
      })
      console.log("response: ", response.data)
      setIsLoading(false)
      getAllStories()
      setAlert(response?.data?.message)

    } catch(e){
      setIsLoading(false)
      console.log(e.message)
    }
    
  } 
  return (
    <div className='p-10'>
      <h1 className='text-center text-5xl mb-5 font-bold'>Social Stories</h1>

      <form onSubmit={postStory} className='md:w-1/2 mx-auto mb-10'>
        <label htmlFor="titleInput" className='w-full'>Title: </label>
        <input type="text" id="titleInput" maxLength={20} minLength={2} required ref={titleInputRef} className='w-full bg-gray-100 border-transparent focus:border-0 mb-5 rounded-md p-2'/>
        <label htmlFor="bodyInput" className='w-full'>What's on your mind: </label>
        <textarea type="text" id="bodyInput" rows="3" maxLength={999} minLength={10} required ref={bodyInputRef} className='p-2 bg-gray-100 rounded-md w-full mb-5'></textarea>
        <button type="submit" className='bg-slate-500 rounded-md px-8 py-2 text-white'>Post</button>
      </form>

      {alert && <Alert msg={alert}/>}
      {isLoading ? <Loader/> : ''}
    
      <div className="md:w-1/2 mx-auto">
        {data.map((eachStory, i)=>(
          <div className='card p-5' key={i}>
            { 
              eachStory.isEdit ? (
             
                <>
                  <form onSubmit={(e)=>{updateStory(e, eachStory?.id)}} className='w-3/4 mx-auto'>
                    <label htmlFor="titleInput" className='w-full'>Title: </label>
                    <input type="text" id="titleInput" name="titleInput" maxLength={20} minLength={2} required defaultValue={eachStory?.metadata?.title} className='w-full bg-gray-100 border-transparent focus:border-0 mb-5 rounded-md p-2'/>
                    <label htmlFor="bodyInput" className='w-full'>What's on your mind: </label>
                    <textarea type="text" id="bodyInput" name='bodyInput' rows="3" maxLength={999} minLength={10} required defaultValue={eachStory?.metadata?.text} className='p-2 bg-gray-100 rounded-md w-full mb-5'></textarea>
                    <button type="submit" className='bg-slate-500 rounded-md px-8 py-2 text-white'>Post</button>
                  </form>
                </>
               ) : 
               (
                // Simple Card */
                <>
                  <select className='bg-slate-100 text-sm p-2 border-0 rounded-md float-right'>
                    <option>...</option>
                    <option onClick={()=>{deleteStory(eachStory?.id)}}>Delete</option>
                    <option onClick={() => {
                        eachStory.isEdit = true;
                        console.log(eachStory.isEdit)
                        setData([...data]);
                      }}>Edit </option>
                  </select>
                  <h2>{eachStory?.metadata?.title}</h2>
                  <p>{eachStory?.metadata?.text}</p>
                </>

            )
               }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
