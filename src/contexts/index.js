import React, { useState, createContext, useEffect } from 'react';

export const BookContext = createContext({});

export default function BookProvider({children}) {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        loadStorage();
    }, [])

    function loadStorage() {
        const storageFavoriteBooks = localStorage.getItem('FavoriteBooks');
        if(storageFavoriteBooks){
            setFavoriteBooks(JSON.parse(storageFavoriteBooks));
        }
    }

    function storageSaveFavorite(data) {
        localStorage.setItem('FavoriteBooks', JSON.stringify(data));
    }

    return(
        <BookContext.Provider 
            value={{ 
                favoriteBooks,
                storageSaveFavorite 
            }}>
            {children}
        </BookContext.Provider>
    )
}