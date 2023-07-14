import { useContext, useState } from "react"
import { ImageController } from "../contex/ImageController"
import { Img } from "../interfaces"
import Modal from "./Modal"


const Favorites = () => {

  let likesImagesList = useContext(ImageController)

  const [images, setImages] = useState(likesImagesList)

  const [modal, setModal] = useState(false)
  const [selectedImg, setSelectedImg] = useState(likesImagesList[0])

  const deleteImage = (selectedImg:Img) => {
    let newListImages = images.filter(image => image.id !== selectedImg.id)
    likesImagesList.splice(likesImagesList.indexOf(selectedImg),1)
    setImages(newListImages)
    localStorage.setItem('favs',JSON.stringify(likesImagesList))
  }

  const handleModal = (img:Img) => {
    setModal(!modal)
    setSelectedImg(img)
  }

  return (
    <>

    <div className="container_favs">
      {
        images.map((img,index) => img.id !== 'string' &&(
          <div key={index} className="fav_content">
            <div className="container_img">
              <img onClick={ () => handleModal(img)} src={img.urls.small} alt="imagen" />
            </div>
            <div className="content_text">
              <h4>Upload for {img.user['username']}</h4>
              <p>likes: {img.likes}</p>
              <a target="_blank" href={img.download} className="icon download_icon_black"></a>  
            </div>
            <span onClick={ () => deleteImage(img)} className="icon trash_icon"></span>
          </div>
        ))
      }      
    </div>
    {
      modal && <Modal img={selectedImg} modal={modal} setModal={setModal}/>
    }    
    </>

  )
}

export default Favorites