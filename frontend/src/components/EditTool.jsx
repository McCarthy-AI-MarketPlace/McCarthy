import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTool = () => {
  const [toolData, setToolData] = useState({
    title: '',
    description: '',
    image: '',
    public_id: '',         
    toolUrl: '',
    hashtags: '',
    isFeatured: false,
    isEditorsChoice: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fileInputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`/api/tool/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const tool = res.data.data;

        setToolData({
          ...tool,
          hashtags: tool.hashtags.join(', '),
          public_id: tool.imagePublicId || '',  
        });
      } catch (err) {
        console.error("Error fetching tool:", err);
        setFetchError("Failed to load tool data. Please try again.");
      }
    };
    fetchTool();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('oldPublicId', toolData.public_id); 

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setToolData(prev => ({
        ...prev,
        image: data.data.url,
        public_id: data.data.public_id,  
        toolUrl: data.data.url 
      }));
    } catch (err) {
      console.error(err);
      setUploadError(err.message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setToolData({
      ...toolData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUploading) {
      alert('Please wait for image to finish uploading.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const updatedData = {
        ...toolData,
        hashtags: toolData.hashtags.split(',').map(tag => tag.trim())
      };

      await axios.put(`/api/tool/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/my-tools');
    } catch (err) {
      console.error("Error updating tool:", err);
      alert("Failed to update tool. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Edit Tool</h2>

      {fetchError && <Alert variant="danger">{fetchError}</Alert>}
      {uploadError && <Alert variant="danger">{uploadError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tool Image</Form.Label>
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              cursor: 'pointer',
              width: '100%',
              maxWidth: '300px',
              marginBottom: '1rem'
            }}
          >
            <img
              src={toolData.image || '/placeholder.png'}
              alt="Tool Preview"
              onError={(e) => e.target.src = '/placeholder.png'}
              style={{
                width: '100%',
                height: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
          </div>
          <Form.Control
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {imageUploading && <Spinner animation="border" size="sm" />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={toolData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={toolData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tool URL</Form.Label>
          <Form.Control
            type="url"
            name="toolUrl"
            value={toolData.toolUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hashtags (comma separated)</Form.Label>
          <Form.Control
            type="text"
            name="hashtags"
            value={toolData.hashtags}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Featured"
          name="isFeatured"
          checked={toolData.isFeatured}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Editor's Choice"
          name="isEditorsChoice"
          checked={toolData.isEditorsChoice}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="mt-4 w-100"
          disabled={imageUploading}
          variant={imageUploading ? "secondary" : "primary"}
        >
          {imageUploading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              {' '}Uploading...
            </>
          ) : 'Save Changes'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditTool;
