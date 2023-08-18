import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import bootstrapIcons from 'bootstrap-icons/font/bootstrap-icons.css'
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <div className="container py-5">
      <div className="row flex-column gap-3"> 
        <Post />
        <Post />
        <Post />
      </div>
      </div>
    </div>
  );
}

export default App;
