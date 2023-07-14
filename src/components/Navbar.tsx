import {useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <nav className='nav'>
        <h1 onClick={ () => navigate('/home')}>Gallery-App</h1>
        <div className='container'>
            <div onClick={ () => navigate('/favorites')} className="icon favs_icon"></div>
        </div>
    </nav>
  )
}

export default Navbar