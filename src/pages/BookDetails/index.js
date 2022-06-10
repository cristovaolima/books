import React, { useState, useEffect } from 'react';
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
  Button
} from 'reactstrap';

import { ApiService } from '../../api';

export default function BookDetails() {
  const id = useParams();
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
    if(responseJson.error){
      setLoading(false);          
      return;
    }else{
      setBookTitle(responseJson.volumeInfo.title);
      setBookDescription(responseJson.volumeInfo.description);
      let urlImg = responseJson.volumeInfo.imageLinks ? responseJson.volumeInfo.imageLinks.thumbnail
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
      setBookUrlImg(urlImg);
      setBookAuthors(responseJson.volumeInfo.authors);
      setLoading(false);
      console.log(responseJson);
      return;
    }
  }

  return (
    <div>
      <Header/>
      <br/>
      <Container>
        <CardColumns>
          <Card>
            <CardImg
              className="photo"
              alt="Card image cap"
              src={bookUrlImg}
            />
            <CardBody>
              <Button color="primary">
                Favorite
              </Button>
              <br/>
              <CardTitle tag="h5">
                {bookTitle}
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                {bookAuthors && bookAuthors.map((author, index) =>
                  index < (bookAuthors.length - 1) ? author + ', ' : author                  
                )}
              </CardSubtitle>
              <CardText>
                {bookDescription}
              </CardText>
            </CardBody>
          </Card>
        </CardColumns>
      </Container>
    </div>
  )
}