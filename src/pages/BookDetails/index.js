import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { 
  Container,
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Spinner
} from 'reactstrap';

import { ApiService } from '../../api';
import { BookContext } from '../../contexts';

export default function BookDetails() {
  const { favoriteBooks, storageSaveFavorite } = useContext(BookContext);
  const id = useParams();
  const [book, setBook] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookUrlImg, setBookUrlImg] = useState("");
  const [bookAuthors, setBookAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Book Details | Book Search";
    if(id.id){
      loadBook();
    }        
  }, []);

  async function loadBook(){
    const responseJson = await ApiService.book.show(id.id);
    console.log(responseJson);
    if(responseJson.error){
      setLoading(false);          
      return;
    }else{
      setBook(responseJson);
      setBookTitle(responseJson.volumeInfo.title);
      setBookDescription(responseJson.volumeInfo.description);
      let urlImg = responseJson.volumeInfo.imageLinks ? responseJson.volumeInfo.imageLinks.thumbnail
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
      setBookUrlImg(urlImg);
      setBookAuthors(responseJson.volumeInfo.authors);
      setLoading(false);
      return;
    }
  }

  function favorite(){
    var filter = favoriteBooks.filter(function(obj) { return obj.id === id.id; });

    if(favoriteBooks.length == 0){
      storageSaveFavorite([...favoriteBooks, book]);
      alert("Saved to favorites!");
    } else if(filter.length == 0){
      storageSaveFavorite([...favoriteBooks, book]);
      alert("Saved to favorites!");
    } else {
      alert("Book already saved!");
    }   
  }

  return (
    <div>
      <Header/>
      <br/>
      <Container>
        <CardColumns>
          {loading ? <Spinner/> 
            : book.length === 0 ? <p>Error loading book.</p> 
            : <Card>
                <CardImg className="photo" alt={"Image " + bookTitle} src={bookUrlImg}/>
                <CardBody>
                  <Button color="primary" onClick={favorite}>
                    Favorite
                  </Button>
                  <br/>
                  <CardTitle tag="h5">
                    {bookTitle}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {bookAuthors && bookAuthors.map((author, index) =>
                      index < (bookAuthors.length - 1) ? author + ', ' : author                  
                    )}
                  </CardSubtitle>
                  <CardText>
                    {bookDescription}
                  </CardText>
                </CardBody>
              </Card>
          }
        </CardColumns>
        <br/>
      </Container>
    </div>
  )
}