import React, { useEffect, useState } from 'react';

const TheContext = React.createContext({
    searchString: '',
    currentUrl: '',
    setSearchString: () => {},
});

function TheContextProvider({ children }) {
    const [searchStringCtx, setSearchStringCtx] = useState('');
    const [currentUrlCtx, setCurrentUrlCtx] = useState('');

    let newUrl;
    if (searchStringCtx.length > 0) {
        newUrl =
            'https://www.themealdb.com/api/json/v1/1/search.php?s=' +
            searchStringCtx;
    } else {
        newUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    }

    if (newUrl != currentUrlCtx) {
        setCurrentUrlCtx(newUrl);
    }

    return (
        <TheContext.Provider
            value={{
                searchString: searchStringCtx,
                currentUrl: currentUrlCtx,
                setSearchString: setSearchStringCtx,
            }}
        >
            {children}
        </TheContext.Provider>
    );
}

export { TheContext, TheContextProvider };
