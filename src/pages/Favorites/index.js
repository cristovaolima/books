import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import { 
  Container,
  Row,
  Col,
  CardGroup,
  Spinner
} from 'reactstrap';

import CardBook from '../../components/CardBook';

export default function Favorites() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {   
    loadBooks();
  }, []);

  function loadBooks(){
    const storageFavoriteBooks = localStorage.getItem('FavoriteBooks');
    if(storageFavoriteBooks){
      setBooks(JSON.parse(storageFavoriteBooks).reverse());
    }
    setLoading(false);    
  }

  return (
    <div>
      <Header/>
      <Container>
        <br/>
        <h1>Favorites</h1>
        <br/>
        <Row>
          {loading ? <Spinner/> 
            : books.length === 0 ? <p>Not a favorite book</p> 
            : <CardGroup>
              {books && books.map(book => 
                <Col key={book.id} sm="2">
                  <CardBook book={book}/>
                </Col>
              )}
            </CardGroup>
          }
        </Row>
        <br/>
      </Container>       
    </div>
  );
}