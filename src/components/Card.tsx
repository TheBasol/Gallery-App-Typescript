import { Dispatch, SetStateAction, useState } from "react"
import { Img } from "../interfaces"

interface propsCard {
  img: Img,
  modal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>,
  setImg: Dispatch<SetStateAction<Img>>,
  selectedImg: Img;
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

const Card = ({img = initialState,modal,setModal,setImg,selectedImg}:propsCard) => {

  const handleModal = () => {
    setModal(!modal)
    setImg(img)
    
  }

  return (
    
    <div onClick={ handleModal} className={ img.size.width > img.size.height ? "grid_item wide": "grid_item"}>
      <img src={img.urls.regular } alt="" />
    </div>

  )
}

export default Card