import React from 'react';

const authContext = React.createContext({
    //default values onl apply when no ther values are set
    autheticated: false,
    login: () => { }
});

export default authContext;