import React from 'react';

const TenderContext = React.createContext();

export const ProductsProvider = TenderContext.Provider
export const ProductsConsumer = TenderContext.Consumer

export default TenderContext;