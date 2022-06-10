import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Card,
    CardImg, 
    CardBody, 
    Button,
    CardTitle,
    CardSubtitle
  } from 'reactstrap';

export default function CardBook({book}) {
    let urlImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail 
    : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
    return (
        <div>
            <Card className="card-book" >
                <CardImg
                  alt={"Photo book " + book.volumeInfo.title}
                  src={urlImg}
                  title={"Book " + book.volumeInfo.title}
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {book.volumeInfo.title}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6">
                      {book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) =>
                        index < (book.volumeInfo.authors.length - 1) ? author + ', ' : author                  
                        )}
                    </CardSubtitle>
                    <Link to={'/book-details/' + book.id}>
                        <Button color="primary">
                            Details
                        </Button>
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}