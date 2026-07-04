import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  // Form State
  const [formData, setFormData] = useState({
    title: '', type: 'flats', location: '', price: '', size: '',
    bedrooms: '', bathrooms: '', zone: '', access: '', description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [propRes, userRes, contactRes] = await Promise.all([
        fetch('http://localhost:5000/api/properties'),
        fetch('http://localhost:5000/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/admin/contacts', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (propRes.ok) setProperties(await propRes.json());
      if (userRes.ok) setUsers(await userRes.json());
      if (contactRes.ok) setContacts(await contactRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', type: 'flats', location: '', price: '', size: '',
      bedrooms: '', bathrooms: '', zone: '', access: '', description: ''
    });
    setImageFile(null);
    setExistingImage('');
    setShowModal(true);
  };

  const openEditModal = (prop) => {
    setEditingId(prop.id);
    setFormData({
      title: prop.title || '', type: prop.type || 'flats', location: prop.location || '',
      price: prop.price || '', size: prop.size || '', bedrooms: prop.bedrooms || '',
      bathrooms: prop.bathrooms || '', zone: prop.zone || '', access: prop.access || '',
      description: prop.description || ''
    });
    setImageFile(null);
    setExistingImage(prop.image || '');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return existingImage;
    
    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    if (res.ok) {
      const data = await res.json();
      return data.imageUrl; // Returns http://localhost:5000/uploads/...
    }
    return existingImage;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const payload = { ...formData, image: imageUrl };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId 
      ? `http://localhost:5000/api/properties/${editingId}`
      : `http://localhost:5000/api/properties`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Property Management</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <button 
            onClick={() => setActiveTab('flats')} 
            style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'flats' ? 'var(--clr-accent)' : 'var(--clr-dark-surface)', color: activeTab === 'flats' ? 'var(--clr-dark)' : 'var(--clr-accent)', border: '1px solid var(--clr-accent)', marginRight: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
            Flats
          </button>
          <button 
            onClick={() => setActiveTab('land')} 
            style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'land' ? 'var(--clr-accent)' : 'var(--clr-dark-surface)', color: activeTab === 'land' ? 'var(--clr-dark)' : 'var(--clr-accent)', border: '1px solid var(--clr-accent)', marginRight: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
            Land
          </button>
          <button 
            onClick={() => setActiveTab('rent')} 
            style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'rent' ? 'var(--clr-accent)' : 'var(--clr-dark-surface)', color: activeTab === 'rent' ? 'var(--clr-dark)' : 'var(--clr-accent)', border: '1px solid var(--clr-accent)', marginRight: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
            Rent
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'users' ? 'var(--clr-accent)' : 'var(--clr-dark-surface)', color: activeTab === 'users' ? 'var(--clr-dark)' : 'var(--clr-accent)', border: '1px solid var(--clr-accent)', marginRight: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
            Users
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'messages' ? 'var(--clr-accent)' : 'var(--clr-dark-surface)', color: activeTab === 'messages' ? 'var(--clr-dark)' : 'var(--clr-accent)', border: '1px solid var(--clr-accent)', fontWeight: 'bold', borderRadius: '4px' }}>
            Messages
          </button>
        </div>
        {['flats', 'land', 'rent'].includes(activeTab) && (
          <button className="btn-add" style={{ marginBottom: 0, borderRadius: '4px' }} onClick={openAddModal}>+ Add New Property</button>
        )}
      </div>

      {['flats', 'land', 'rent'].includes(activeTab) && (
        <div style={{ marginBottom: '40px' }}>
        <h2 style={{ maxWidth: 1200, margin: '0 auto 15px auto', color: 'var(--clr-accent)', textTransform: 'capitalize' }}>
          {activeTab} Management
        </h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>LOCATION</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {properties.filter(p => p.type === activeTab).map(prop => (
                <tr key={prop.id}>
                  <td>
                    <img src={prop.image} alt={prop.title} />
                  </td>
                  <td>{prop.title}</td>
                  <td>{prop.location}</td>
                  <td>{prop.price}</td>
                  <td>
                    <button className="btn-logout" style={{marginRight: 10, borderRadius: '4px'}} onClick={() => openEditModal(prop)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(prop.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {properties.filter(p => p.type === activeTab).length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No properties found in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
      
      {activeTab === 'users' && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ maxWidth: 1200, margin: '0 auto 15px auto', color: 'var(--clr-accent)' }}>Registered Users</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>JOINED</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td></tr>
                ))}
                {users.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No users registered yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'messages' && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ maxWidth: 1200, margin: '0 auto 15px auto', color: 'var(--clr-accent)' }}>Support Messages</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>DATE</th><th>TYPE</th><th>NAME</th><th>EMAIL</th><th>MESSAGE</th></tr></thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id}>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{textTransform:'capitalize'}}>{c.type}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.message}</td>
                  </tr>
                ))}
                {contacts.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No messages found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!activeTab && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--clr-dark-muted)' }}>
          <h3 style={{ fontWeight: 300 }}>Select a category above to view and manage properties.</h3>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingId ? 'Edit Property' : 'Add Property'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="flats">Flats</option>
                  <option value="land">Land</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Size</label>
                <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} />
              </div>
              
              {formData.type !== 'land' && (
                <>
                  <div className="form-group">
                    <label>Bedrooms</label>
                    <input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Bathrooms</label>
                    <input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} />
                  </div>
                </>
              )}

              {formData.type === 'land' && (
                <>
                  <div className="form-group">
                    <label>Zone</label>
                    <input type="text" value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Access (Road)</label>
                    <input type="text" value={formData.access} onChange={e => setFormData({...formData, access: e.target.value})} />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Image Upload</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {existingImage && !imageFile && <p style={{fontSize: '12px', marginTop: '5px'}}>Current: {existingImage}</p>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Property</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
