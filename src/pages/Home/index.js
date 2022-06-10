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
  const [offSet, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    paginate();     
  }, [offSet, initialBooks]);

  function paginate(){
    let _books = initialBooks.slice(0, 12);
    setBooks(_books);
    setPage(initialBooks.length / page);
  }

  async function seach(){
    if(seachBook !== ''){
      setLoading(true);
      const responseJson = await ApiService.book.searchList(seachBook);
      if (responseJson.error) {
        alert(responseJson.message);  
        setLoading(false);
        return;
      } else {
        setInitialBooks(responseJson.items);
        setOffset(0);
        setLoading(false);
      }
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
          <p>{seachBook !== '' && books.length !== 0 ? 
              "Maximum 40 results " : null }</p>
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
          {seachBook !== '' && books.length !== 0 ? 
            <PaginationBook 
              limit={12} 
              total={initialBooks.length} 
              offset={offSet} 
              setOffset={setOffset}/> 
            : null}  
          </div>                    
      </Container>
   </div>
   );
}