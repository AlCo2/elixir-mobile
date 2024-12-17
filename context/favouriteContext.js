import { createContext, useState } from "react";
import { addProductToFavourit, getFavouritProducts } from "../api/favourit";
import { isAuth } from "../utils/user/isAuth";
export const FavouritContext = createContext(null);

export const FavouritProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    async function fetchFavourites()
    {
        if (isAuth)
        {
            const response = await getFavouritProducts();
            setFavourites(response.data);
        }
    }
    
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
    <FavouritContext.Provider value={{favourites, setFavourites, deleteFromFavourites, addToFavourites, fetchFavourites}}>
        {children}
    </FavouritContext.Provider>
)}