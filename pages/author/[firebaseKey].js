import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import { getBooksByAuthor } from '../../api/bookData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState([]);
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getBooksByAuthor(firebaseKey).then(setBooks);
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.email}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>

        {/* TODO: map over books here using BookCard component */}
        {books.map((book) => (
          <BookCard key={book.authorBook} bookObj={book} />
        ))}
        <hr />
      </div>
    </div>
  );
}
