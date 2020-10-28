import React, { useEffect, useState } from 'react';

const TheContext = React.createContext({
    searchString: '',
    currentUrl: '',
    setSearchString: () => {},
    categoryString: '',
    setCategoryString: () => {},
});

function TheContextProvider({ children }) {
    const [searchStringCtx, setSearchStringCtx] = useState('');
    const [categoryStringCtx, setCategoryStringCtx] = useState('');
    const [currentUrlCtx, setCurrentUrlCtx] = useState('');

    let newUrl;
    if (searchStringCtx.length > 0) {
        newUrl = 'http://younnite.com/api/recipes?search=' + searchStringCtx;
    } else {
        if (categoryStringCtx.length > 0 && categoryStringCtx != 'All') {
            newUrl =
                'http://younnite.com/api/recipes?filter[categories.name]=' +
                categoryStringCtx;
        } else {
            newUrl =
                'http://younnite.com/api/recipes?sort=-id&include=ingredients';
        }
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
                categoryString: categoryStringCtx,
                setCategoryString: setCategoryStringCtx,
            }}
        >
            {children}
        </TheContext.Provider>
    );
}

export { TheContext, TheContextProvider };
