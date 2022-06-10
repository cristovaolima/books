import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink 
  } from 'reactstrap';

const MAX_ITEMS = 3;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export default function PaginationBook({limit, total, offset, setOffset}) {
  const current = offset ? (offset / limit) + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  function onPage(page){
    setOffset((page - 1) * limit)
  }

  return (
    <div>
      <Pagination aria-label="Page navigation example" size="lg">
        {current !== 1 ?
          <PaginationItem onClick={() => onPage(current - 1)}>
            <PaginationLink first/>
          </PaginationItem> 
        : null}
        {Array.from({length: Math.min(MAX_ITEMS, pages)})
          .map((_, index) => index + first)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => onPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        {current !== pages ?
          <PaginationItem 
            onClick={() => onPage(current + 1)}>
            <PaginationLink last/>
          </PaginationItem> 
        : null}
      </Pagination> 
   </div>
  );
}