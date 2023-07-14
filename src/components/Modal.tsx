import { Dispatch, SetStateAction,MouseEvent, useContext } from "react"
import { ImageController } from '../contex/ImageController'
import { Img } from "../interfaces"
import { click } from "@testing-library/user-event/dist/click"

interface propsCard {
  img: Img,
  modal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>,
}

const initialState = {
  id: "string",
  urls: [],
  created_at: "03/25/2015",
  user: [],
  likes: 0,
  download:"",
  size: []
}

const Modal = ({img = initialState,modal,setModal}:propsCard) => {

  const likesImagesList = useContext(ImageController)

  let { pathname } = window.location

  let exitInFavs = false
  likesImagesList.forEach(item => {
    if (item.id === img.id) {
      exitInFavs = true
    }
  })

  const closeModal = ( ) => {
    setModal(!modal)
  }

  const addImageToFavs = (e:MouseEvent<HTMLSpanElement>) => {
    
    let includesImg = likesImagesList.filter(imagen => imagen.id === img.id)

    if (includesImg.length < 1) {
      likesImagesList.push(img)
      localStorage.setItem('favs',JSON.stringify(likesImagesList))
      e.currentTarget.className = "icon favs_icon_full_read"
    } else {
      likesImagesList.forEach((like_img,index) => {
        if (like_img.id === img.id) {
          likesImagesList.splice(index,1)
          exitInFavs = false
        }
      })
      e.currentTarget.className = "icon favs_icon_red"
    }    
  }

  return (
    <div className="modal_container">
      <div className="main_modal">
      <header className="header_modal">
        <div className="header_left">
          <span onClick={closeModal} className="close_icon icon"></span>
          <h4>Upload for {img.user['username']}</h4>
        </div>
        <div>
          {
            !pathname.includes('favorites') && !exitInFavs ? <span onClick={ addImageToFavs  } className="icon favs_icon_red"></span> : <span onClick={ addImageToFavs } className="icon favs_icon_full_read"></span>
          }
          <a target="_blank" href={img.download+'&force=true'} className="icon download_icon_black"></a>       
        </div>
      </header>
      <div className="image_container">
        <img src={img.urls.regular} alt="image" />        
      </div>
      <div className="bottom_container">
        <p>{img.likes} Likes</p> 
        <p>Published in {img.created_at.substr(0,10)}</p>        
      </div>

      </div>
    </div>
  )
}

export default Modal