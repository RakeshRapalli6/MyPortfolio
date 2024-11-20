import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = (page) => {
    // Simulate an API call to fetch data
    // const newItems = Array.from({ length: 10 }, (_, index) => `Item ${index + page * 10}`);
    // setItems((prevItems) => [...prevItems, ...newItems]);

    if (page === 5) {
      setHasMore(false); // Simulate end of data after 5 pages
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    //   endMessage={<p>You have seen it all</p>}
    >
      {/* {items.map((item, index) => (
        <div key={index}>
          <h4>{item}</h4>
        </div>
      ))} */}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
