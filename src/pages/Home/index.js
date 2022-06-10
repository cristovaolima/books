import React, { useState, useEffect } from 'react';

import { 
  Container,
  InputGroup, 
  Input, 
  Button,
  Spinner,
  CardGroup,
  Row,
  Col
} from 'reactstrap';

import CardBook from '../../components/CardBook';
import Header from '../../components/Header';
import PaginationBook from '../../components/PaginationBook';

import { ApiService } from '../../api';

export default function Home() {
  const [seachBook, setSeachBook] = useState('');
  const [books, setBooks] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(-1);
  const [offSet, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let _books = initialBooks.slice(offSet, offSet + 11)
    setBooks(_books);       
  }, [offSet]);

  async function seach(){
    if(seachBook !== ''){
      const responseJson = await ApiService.book.searchList(seachBook);
      setInitialBooks(responseJson.items);
      setTotalBooks(responseJson.totalItems);
      setOffset(0);
      console.log(responseJson);
    }    
  }

  return (
   <div>
      <Header/>
      <br/>
      <Container>
          <InputGroup>                    
              <Input
                value={seachBook} 
                placeholder="Search book"
                onChange={e => setSeachBook(e.target.value)}
              />
              <Button 
                color="primary" 
                onClick={seach}
                disabled={loading ? true : false}>
                {loading ? <Spinner size="sm"></Spinner> : "Search"}
              </Button>
          </InputGroup>
          <br/>
          <p>{seachBook !== '' && totalBooks !== -1 ? "Results " + totalBooks : null }</p>
          <Row>
            <CardGroup>
              {books && books.map(book => 
                <Col key={book.id} sm="2">
                  <CardBook book={book}/>
                </Col>
              )}
            </CardGroup>
          </Row>
          <br/>
          <div className="Pagination">
          {seachBook !== '' && totalBooks !== -1 ? 
            <PaginationBook 
              limit={12} 
              total={totalBooks} 
              offset={offSet} 
              setOffset={setOffset}/> 
            : null}  
          </div>                    
      </Container>
   </div>
   );
}