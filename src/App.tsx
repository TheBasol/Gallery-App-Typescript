import './App.css';
import AppRouter from './router/AppRouter';
import { ImageController } from './contex/ImageController' 
import { Img } from "./interfaces"

function App() {

  const initialState: Img[] = [{
    id: "string",
    urls: [],
    created_at: "03/25/2015",
    user: [],
    likes: 0,
    size:[],
    download: ""
  }]

  const init = () => {
    return localStorage.getItem('favs') || JSON.stringify(initialState)
  }

  return (
    <>
      <ImageController.Provider value={  JSON.parse(init())  }>  
        <AppRouter></AppRouter>
      </ImageController.Provider>
      
    </>

  )
}

export default App;
