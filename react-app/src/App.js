import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import bootstrapIcons from 'bootstrap-icons/font/bootstrap-icons.css'
import Post from './components/Post';

function App() {
 const data = [
    {
        name : "Ahmed",
        time: "a minute ago",
        img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        name : "Hamza",
        time: "5 minutes ago",
        img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        name : "Shaheer",
        time: "15 minutes ago",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        name : "Atif",
        time: "16 minutes ago",
        img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
  ]
  return (
    <div className="App">
      <div className="container py-5">
      <div className="row flex-column gap-3"> 
      {data.map((item, i) => (
        <Post key={i} name={item.name} time={item.time} img={item.img} />
      ))}
      </div>
      </div>
    </div>
  );
}

export default App;
