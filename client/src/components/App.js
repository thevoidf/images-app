import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/App.css';
import Image from './Image';

function App() {
  const [images, setImages] = useState([]);
  const { REACT_APP_BASE_URL: BASE_URL } = process.env;
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const refUpload = useRef(null);

  useEffect(() => {
    const user = Math.random().toString(36).substring(6);
    setUser(user);
    async function getImages() {
      const {
        data: { images }
      } = await axios({
        url: BASE_URL + '/images'
      });
      setImages(images);
    }
    getImages();
  }, []);

  async function onFileChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('user', user);
    formData.append('image', file);

    try {
      const {
        data: { image }
      } = await axios({
        method: 'POST',
        url: BASE_URL + '/images',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });
      setImages([ ...images, image ]);
    } catch (error) {
      const {
        data: { error: message }
      } = error.response;
      setError(message);
    }
  }

  return (
    <>
      <header>
        <h3 className="user">User: {user}</h3>
        <form onSubmit={e => e.preventDefault()}>
          <input
            ref={refUpload}
            type="file"
            onChange={onFileChange} />
          <button
            type="submit"
            onClick={() => refUpload.current.click()}>
            Upload
          </button>
        </form>
      </header>
      <div className="container">
        <span className="error">{error}</span>
        <div className="images">
          {images.map((img, idx) => <Image key={idx} {...img} />)}
        </div>
      </div>
    </>
  );
}

export default App;
