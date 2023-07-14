import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import {Suspense} from 'react'
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Favorites from '../components/Favorites';

const AppRouter = () => {

  return (
    <> 
      <Router>

      <Navbar/> 

        <Suspense fallback={ <h1>Loading...</h1> }>
            <Routes>
              
              <Route path="/home/" element={
                <Main/>
              }/> 

              <Route path='/search/:search/' element={
                <Main/>
              }/> 

              <Route path='/favorites' element={
                <Favorites/>
              }/>

              <Route path="*" element={
                <Navigate to='home/' />
              }/>

            </Routes>          
        </Suspense>

        
      </Router>    

      <footer className='nav'></footer>
    </>

  )
}

export default AppRouter