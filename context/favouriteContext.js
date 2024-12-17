import { createContext, useState } from "react";
import { addProductToFavourit } from "../api/favourit";

export const FavouritContext = createContext(null);

export const FavouritProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);
    function addToFavourites(product, isFavourite, setIsFavourite)
    {
        if (isFavourite)
        {
            const updatedFavourites = favourites.filter(p => p.id !== product.id);
            setFavourites(updatedFavourites);
        }
        else
        {
            setFavourites(favourites=>[...favourites, product]);
        }
        setIsFavourite(!isFavourite);
        addProductToFavourit(product.id).catch((error)=>{console.log(error)});
    }
    function deleteFromFavourites(product)
    {
        const updatedFavourites = favourites.filter(p => p.id !== product.id);
        setFavourites(updatedFavourites);
        addProductToFavourit(product.id).catch((error)=>{console.log(error)});
    }

    return (
    <FavouritContext.Provider value={{favourites, setFavourites, deleteFromFavourites, addToFavourites}}>
        {children}
    </FavouritContext.Provider>
)}