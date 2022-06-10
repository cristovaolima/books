import React from 'react';
import Routes from './routes';
import BookProvider from './contexts';

export default function App() {
  return (
    <BookProvider>
      <Routes/>
    </BookProvider>    
  );
}