import { createContext } from "react";

import { Img } from "../interfaces/index";

//type ArrayImg = Array<Img>

export const ImageController = createContext<Img[]>([]);