import React from 'react';

type MyContextType = { postDetails: any}

const LikeDislikeContext = React.createContext<MyContextType | undefined>(undefined);

export default LikeDislikeContext;