import React, { useState } from 'react';

const AddLinkForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission with 'title' and 'url' values
    console.log(`Submitted: ${title}, ${url}`);
    // Add your logic to process or submit the form data
  };

  return (
    <div>
      <h2>Add Link</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        <button type="submit">Add Link</button>
      </form>
      <div>
    <img src={url}></img>
      </div>
    </div>
  );
};

export default AddLinkForm;
