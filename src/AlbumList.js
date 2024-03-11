import React, { useState, useEffect } from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadAlbums() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          { signal: abortController.signal }
        );
        const json = await response.json();
        setAlbums(json);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    loadAlbums();
    return () => abortController.abort();
  }, [user]);

  if (user)
    return (
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    );

  return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
