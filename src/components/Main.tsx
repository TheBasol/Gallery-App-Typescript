import { useEffect, useState,ChangeEvent, FormEvent, } from "react"
import { Img, ResponseSearch, Welcome } from "../interfaces/index";
import Card from "./Card";
import { useParams, useNavigate } from 'react-router-dom'
import Modal from "./Modal";
type ArrayImg = Array<Img>

const Main = () => {

    const {search = "home"} = useParams()

    const [images, setImages] = useState<ArrayImg>([{
        id: "string",
        urls: [],
        created_at: "03/25/2015",
        user: [],
        likes: 0,
        size:[],
        download: ""
    }])
    const [inputValue,setInputValue] = useState("");
    const [modal, setModal] = useState(false)
    const [selectedImg, setSelectedImg] = useState(images[0])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
  
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value)
    }
  
    const handleSubmit= (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/search/${inputValue}`)
    } 

    const access_key = 'sjYUoQHXMRd7R-gyov0OQ4iWz-wrvDmo2Go3X8REnkc'

    type ApiResponseType =  Welcome[] | ResponseSearch


    useEffect(() =>  {

        const fetchImg = async (): Promise<Welcome[]> => {

            let route = ""

            if (search.trim() !== ""){
                if ( search === "home" ){
                    route = `https://api.unsplash.com/photos/?client_id=${access_key}&per_page=12`;  
                }   else {
                    route = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${search}&per_page=12&page=1`
                }                 
            } 

            setLoading(true)

            return await fetch(route).then( res =>res.json() );
   
        }

        const mapImgData = (apiResponse: ApiResponseType)  => {

            let resultsSearch = apiResponse.hasOwnProperty('results') ? Object.values(apiResponse)[2] : Object.values(apiResponse)

            setLoading(false)

            return resultsSearch.map( (img: Welcome) => {

                const { id, urls, created_at, user, likes, height, width, links } = img

                console.log(img)
            
                return {
                    id,
                    urls,
                    created_at,
                    user,
                    likes,
                    size : {height,width},
                    download : links.download 
                }
            })
        }

        fetchImg()
        .then(mapImgData)
        .then(setImages)

    },[search])
    
  return (
    <>
        <form className="search_container" onSubmit={handleSubmit}>
            <label>
                <div className="icon search_icon"></div>
                <input type="text" onChange={handleChange} value={inputValue}/>

            </label>
            <button>Search</button>            
        </form>

        {
            loading &&
            <div className="container_spinner">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>  
            </div>              
        }
      

        <div className={Object.values(images).length !== 0 ? "grid_container" : "without"}>
 
            {
                Object.values(images).length !== 0 ?

                    Object.values(images).map((img:Img ,index) => (
                        <Card img={img} 
                            key={index} 
                            modal={modal} 
                            setModal={setModal} 
                            setImg={setSelectedImg} 
                            selectedImg={selectedImg}
                        /> 
                    ))   
                    :
                    <div className="without">
                        <h2>Without results</h2>
                        <div className="not_results_icon not_icon" ></div>
                    </div>
            }

        </div>

        {
            modal && <Modal img={selectedImg} modal={modal} setModal={setModal}/>
        }

    </>
  )
}

export default Main