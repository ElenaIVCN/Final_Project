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
            'http://younnite.com/api/recipes?sort=-id&include=ingredients?search=' +
            searchStringCtx;
    } else {
        newUrl = 'http://younnite.com/api/recipes?sort=-id&include=ingredients';
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
