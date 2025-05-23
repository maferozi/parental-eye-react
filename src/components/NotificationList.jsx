// src/components/NotificationList.jsx
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotification } from '../api/notification';


const NotificationList = ({ userId }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications', userId],
    queryFn: getNotification,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, limit, totalCount } = lastPage;
      const maxPage = Math.ceil(totalCount / limit);
      return page < maxPage ? page + 1 : undefined;
    },
  });

  if (isLoading) return <div>Loading notifications...</div>;
  if (isError) return <div style={{ color: "red" }}>Error loading notifications.</div>;

  const notifications = data.pages.flatMap(page => page.data);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications?.map((notification) => (
          <li key={notification?.id}>
            <strong>{notification?.type}</strong>: {JSON.stringify(notification?.data)}
            <small>{new Date(notification?.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center" }}>
        {hasNextPage ? (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "See All"}
          </button>
        ) : (
          <p>No more notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
