import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, Home, Wrench, CreditCard, FileText, MessageSquare, ChevronRight, Download, Plus, Clock, CheckCircle, AlertCircle, Settings, LogOut, Upload, Shield, UserCheck, Lock } from 'lucide-react';
import { useClient } from '../context/ClientContext';
import { useNavigate } from 'react-router-dom';
import './InvestorDashboard.css';

const InvestorDashboard = ({ isOpen, onClose }) => {
  const { shortlistedProperties, isAuthenticated, user, login, register, logout, updateProfile, uploadDocument, fetchDocuments, changePassword, submitKyc } = useClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('shortlist');
  const [authMode, setAuthMode] = useState('signin'); 
  
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // --- MOCK DATA ---

  const viewings = [
    { id: 1, property: "The Aurora Residences", date: "Oct 24, 2026", time: "10:00 AM", status: "Upcoming", agent: "Sarah Rahman" }
  ];

  const myProperties = [
    { id: 1, name: "NirVision Heights (Apt 4B)", location: "Dhanmondi", status: "Owned", fmdActive: true, image: "/images/flat-1.png" }
  ];

  const fmdTickets = [
    { id: "TKT-001", type: "Plumbing", desc: "Leaking faucet in master bathroom", date: "Jul 01, 2026", status: "Resolved", priority: "Low" },
    { id: "TKT-002", type: "AC Servicing", desc: "Quarterly AC filter change", date: "Jul 03, 2026", status: "In Progress", priority: "Medium" }
  ];

  const invoices = [
    { id: "INV-2026-88", desc: "Monthly FMD Charge - July", date: "Jul 01, 2026", amount: "$150", status: "Paid" },
    { id: "INV-2026-92", desc: "Interior Design - Milestone 2", date: "Jul 15, 2026", amount: "$4,500", status: "Pending" }
  ];

  const [vaultDocuments, setVaultDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Settings State
  const [settingsTab, setSettingsTab] = useState('profile');
  const [editName, setEditName] = useState(user?.name || '');
  const [editAvatarFile, setEditAvatarFile] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState('');

  // Security State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');

  // KYC State
  const [nidNumber, setNidNumber] = useState('');
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [kycSuccess, setKycSuccess] = useState('');

  React.useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

  React.useEffect(() => {
    if (isAuthenticated && activeTab === 'vault') {
      fetchDocuments().then(data => setVaultDocuments(data));
    }
  }, [isAuthenticated, activeTab]);

  const handleUploadDoc = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const res = await uploadDocument(file.name, file);
    if (res.success) {
      setVaultDocuments(prev => [...prev, res.document]);
    } else {
      alert(res.error || 'Upload failed');
    }
    setIsUploading(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    const res = await updateProfile(editName, editAvatarFile);
    if (res.success) {
      setProfileSuccess('Profile updated successfully!');
      setEditAvatarFile(null); // Reset file input
    } else {
      alert(res.error || 'Profile update failed');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSecuritySuccess('');
    const res = await changePassword(oldPassword, newPassword);
    if (res.success) {
      setSecuritySuccess('Password updated securely.');
      setOldPassword('');
      setNewPassword('');
    } else {
      alert(res.error || 'Password update failed');
    }
  };

  const handleKycSubmit = async (e) => {
    e.preventDefault();
    setKycSuccess('');
    const res = await submitKyc(nidNumber, nidFront, nidBack);
    if (res.success) {
      setKycSuccess('KYC documents submitted. Status is now Pending.');
    } else {
      alert(res.error || 'KYC submission failed');
    }
  };

  // --- ANIMATIONS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  // --- AUTH HANDLER ---
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    let result;
    if (authMode === 'signup') {
      result = await register(authName, authEmail, authPassword);
    } else {
      result = await login(authEmail, authPassword);
    }

    if (!result.success) {
      setAuthError(result.error);
    }
  };

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentPopup(true);
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case 'shortlist':
        return (
          <motion.div key="shortlist" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>My Shortlist</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Curated properties you are interested in acquiring.</motion.p>
            
            {shortlistedProperties.length === 0 ? (
              <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '60px 20px', background: '#15171a', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.1)' }}>
                <Heart size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: 20 }} />
                <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 10 }}>Your shortlist is empty</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 30 }}>Discover premium properties and add them to your shortlist.</p>
                <button 
                  style={{ background: '#fff', color: '#000', padding: '12px 24px', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}
                  onClick={() => { onClose(); navigate('/properties'); }}
                >
                  Browse Properties
                </button>
              </motion.div>
            ) : (
              <motion.div className="portfolio-grid" variants={containerVariants}>
                {shortlistedProperties.map(prop => (
                  <motion.div key={prop.id} className="portfolio-card" variants={itemVariants} whileHover={{ y: -5 }}>
                    <div className="portfolio-img-wrapper">
                      <img src={prop.image} alt={prop.title || prop.name} />
                    </div>
                    <div className="portfolio-info">
                      <span className="prop-status">{prop.price}</span>
                      <h3>{prop.title || prop.name}</h3>
                      <p>{prop.location} • {prop.size}</p>
                      <div className="shortlist-actions">
                        <button className="schedule-btn">Schedule Visit</button>
                        <button className="inquire-btn">Inquire to Buy</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        );

      case 'viewings':
        return (
          <motion.div key="viewings" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>Scheduled Viewings</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Manage your upcoming property tours.</motion.p>
            <motion.div className="viewings-list" variants={containerVariants}>
              {viewings.map(view => (
                <motion.div key={view.id} className="viewing-card" variants={itemVariants}>
                  <div className="viewing-date">
                    <Calendar size={24} className="accent-icon" />
                    <div>
                      <h4>{view.date}</h4>
                      <span>{view.time}</span>
                    </div>
                  </div>
                  <div className="viewing-details">
                    <h4>{view.property}</h4>
                    <span>Agent: {view.agent}</span>
                  </div>
                  <button className="reschedule-btn">Reschedule</button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'my_properties':
        return (
          <motion.div key="my_properties" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>My Properties</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Properties you own or lease under NirVision management.</motion.p>
            <motion.div className="portfolio-grid" variants={containerVariants}>
              {myProperties.map(prop => (
                <motion.div key={prop.id} className="portfolio-card" variants={itemVariants}>
                  <div className="portfolio-img-wrapper">
                    <img src={prop.image} alt={prop.name} />
                    {prop.fmdActive && <span className="fmd-badge">FMD Active</span>}
                  </div>
                  <div className="portfolio-info">
                    <span className="prop-status">{prop.status}</span>
                    <h3>{prop.name}</h3>
                    <p>{prop.location}</p>
                    <button className="view-details-btn">View Property Vault <ChevronRight size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'maintenance':
        return (
          <motion.div key="maintenance" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <div className="fmd-header-row">
              <div>
                <motion.h2 variants={itemVariants}>FMD Maintenance</motion.h2>
                <motion.p variants={itemVariants} className="panel-desc">Request and track facility maintenance services.</motion.p>
              </div>
              <motion.button className="create-ticket-btn" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Plus size={18} /> New Request
              </motion.button>
            </div>
            
            <motion.div className="ticket-list" variants={containerVariants}>
              {fmdTickets.map(ticket => (
                <motion.div key={ticket.id} className="ticket-card" variants={itemVariants}>
                  <div className="ticket-icon">
                    {ticket.status === 'Resolved' ? <CheckCircle size={24} color="#4ade80" /> : <Clock size={24} color="#fbbf24" />}
                  </div>
                  <div className="ticket-info">
                    <h4>{ticket.type} <span>{ticket.id}</span></h4>
                    <p>{ticket.desc}</p>
                  </div>
                  <div className="ticket-meta">
                    <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>{ticket.status}</span>
                    <span className="ticket-date">{ticket.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'billing':
        return (
          <motion.div key="billing" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>Billing & Payments</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Manage invoices for FMD, Interior Design, and property installments.</motion.p>
            <motion.div className="invoice-list" variants={containerVariants}>
              {invoices.map(inv => (
                <motion.div key={inv.id} className="invoice-card" variants={itemVariants}>
                  <div className="invoice-info">
                    <h4>{inv.desc}</h4>
                    <p>{inv.id} • Due: {inv.date}</p>
                  </div>
                  <div className="invoice-amount">
                    <h3>{inv.amount}</h3>
                    {inv.status === 'Paid' ? (
                      <span className="status-badge paid">Paid</span>
                    ) : (
                      <button className="pay-now-btn" onClick={() => handlePayNow(inv)}>Pay Now</button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'vault':
        return (
          <motion.div key="vault" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <div className="fmd-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
              <div>
                <motion.h2 variants={itemVariants}>Document Vault</motion.h2>
                <motion.p variants={itemVariants} className="panel-desc">Securely access contracts, deeds, and floorplans.</motion.p>
              </div>
              <motion.label variants={itemVariants} className="create-ticket-btn" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Upload size={18} /> {isUploading ? 'Uploading...' : 'Upload Document'}
                <input type="file" style={{ display: 'none' }} onChange={handleUploadDoc} disabled={isUploading} />
              </motion.label>
            </div>
            
            <motion.div className="vault-list" variants={containerVariants}>
              {vaultDocuments.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>No documents in your vault.</p>
              ) : (
                vaultDocuments.map(doc => (
                  <motion.div key={doc.id} className="vault-item" variants={itemVariants}>
                    <div className="doc-info">
                      <FileText size={20} className="accent-icon" />
                      <div>
                        <h4>{doc.title}</h4>
                        <span>{doc.type} • {doc.size}</span>
                      </div>
                    </div>
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="download-btn">
                      <Download size={18} />
                    </a>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div key="settings" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>Settings & Security</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Manage account details, security, and identity verification.</motion.p>
            
            <div className="settings-nav" style={{ display: 'flex', gap: 20, marginBottom: 30, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
              <button onClick={() => setSettingsTab('profile')} style={{ background: 'none', border: 'none', color: settingsTab === 'profile' ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: 15, cursor: 'pointer', fontWeight: settingsTab === 'profile' ? 600 : 400 }}>Profile</button>
              <button onClick={() => setSettingsTab('security')} style={{ background: 'none', border: 'none', color: settingsTab === 'security' ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: 15, cursor: 'pointer', fontWeight: settingsTab === 'security' ? 600 : 400 }}>Security</button>
              <button onClick={() => setSettingsTab('kyc')} style={{ background: 'none', border: 'none', color: settingsTab === 'kyc' ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: 15, cursor: 'pointer', fontWeight: settingsTab === 'kyc' ? 600 : 400, display: 'flex', alignItems: 'center', gap: 5 }}>
                Identity (KYC)
                {user?.kycStatus === 'Verified' && <CheckCircle size={14} color="#4ade80" />}
                {user?.kycStatus === 'Pending' && <Clock size={14} color="#fbbf24" />}
              </button>
            </div>

            {settingsTab === 'profile' && (
              <motion.form variants={itemVariants} className="settings-form" onSubmit={handleSaveProfile} style={{ background: '#15171a', padding: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', maxWidth: 500 }}>
                {profileSuccess && <p style={{ color: '#4ade80', marginBottom: 20 }}>{profileSuccess}</p>}
                
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label>Profile Picture</label>
                  <input type="file" accept="image/*" onChange={(e) => setEditAvatarFile(e.target.files[0])} style={{ padding: '10px 0', background: 'transparent', border: 'none' }} />
                </div>
                
                <div className="form-group" style={{ marginBottom: 30 }}>
                  <label>Full Name</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} required />
                </div>
                
                <button type="submit" className="auth-submit-btn" style={{ width: '100%' }}>Save Changes</button>
              </motion.form>
            )}

            {settingsTab === 'security' && (
              <motion.div variants={itemVariants} style={{ background: '#15171a', padding: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', maxWidth: 500 }}>
                <h3 style={{ color: '#fff', marginBottom: 20, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}><Shield size={20}/> Password Update</h3>
                <form onSubmit={handleChangePassword}>
                  {securitySuccess && <p style={{ color: '#4ade80', marginBottom: 20 }}>{securitySuccess}</p>}
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label>Current Password</label>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 30 }}>
                    <label>New Password</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="auth-submit-btn" style={{ width: '100%' }}>Update Password</button>
                </form>

                <div style={{ marginTop: 40, paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ color: '#fff', marginBottom: 15, fontSize: 16 }}>Two-Factor Authentication (2FA)</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 20 }}>Add an extra layer of security to your account.</p>
                  <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: 6, border: 'none', cursor: 'not-allowed', opacity: 0.5 }}>Enable 2FA (Coming Soon)</button>
                </div>
              </motion.div>
            )}

            {settingsTab === 'kyc' && (
              <motion.div variants={itemVariants} style={{ background: '#15171a', padding: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', maxWidth: 600 }}>
                <h3 style={{ color: '#fff', marginBottom: 10, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}><UserCheck size={20}/> Identity Verification</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30, padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Status:</span>
                  {user?.kycStatus === 'Verified' ? (
                    <span style={{ color: '#4ade80', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><CheckCircle size={16}/> Verified</span>
                  ) : user?.kycStatus === 'Pending' ? (
                    <span style={{ color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={16}/> Under Review</span>
                  ) : (
                    <span style={{ color: '#ff4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><AlertCircle size={16}/> Unverified</span>
                  )}
                </div>

                {user?.kycStatus !== 'Verified' && user?.kycStatus !== 'Pending' && (
                  <form onSubmit={handleKycSubmit}>
                    {kycSuccess && <p style={{ color: '#4ade80', marginBottom: 20 }}>{kycSuccess}</p>}
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 20 }}>Please provide your National ID details to verify your identity for property transactions.</p>
                    
                    <div className="form-group" style={{ marginBottom: 20 }}>
                      <label>National ID Number</label>
                      <input type="text" value={nidNumber} onChange={e => setNidNumber(e.target.value)} required placeholder="Enter NID..." />
                    </div>
                    
                    <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>NID Front Image</label>
                        <div style={{ border: '1px dashed rgba(255,255,255,0.2)', padding: 20, borderRadius: 8, textAlign: 'center' }}>
                          <input type="file" accept="image/*" onChange={(e) => setNidFront(e.target.files[0])} required style={{ width: '100%', background: 'none', border: 'none' }} />
                        </div>
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>NID Back Image</label>
                        <div style={{ border: '1px dashed rgba(255,255,255,0.2)', padding: 20, borderRadius: 8, textAlign: 'center' }}>
                          <input type="file" accept="image/*" onChange={(e) => setNidBack(e.target.files[0])} required style={{ width: '100%', background: 'none', border: 'none' }} />
                        </div>
                      </div>
                    </div>
                    
                    <button type="submit" className="auth-submit-btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                      <Lock size={18}/> Securely Submit KYC
                    </button>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 15, textAlign: 'center' }}>Your documents are encrypted and stored securely.</p>
                  </form>
                )}
                
                {(user?.kycStatus === 'Verified' || user?.kycStatus === 'Pending') && (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Shield size={48} color={user?.kycStatus === 'Verified' ? "#4ade80" : "#fbbf24"} style={{ marginBottom: 20 }} />
                    <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Identity Documents Submitted</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                      {user?.kycStatus === 'Pending' ? "Your documents are currently being reviewed by our compliance team. This usually takes 1-2 business days." : "Your identity has been fully verified. You are clear to proceed with property acquisitions."}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );

      case 'concierge':
        return (
          <motion.div key="concierge" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="dashboard-panel">
            <motion.h2 variants={itemVariants}>Support Concierge</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Direct line to NirVision departments.</motion.p>
            <motion.div className="chat-interface" variants={itemVariants}>
              <div className="chat-department-selector">
                <select>
                  <option>Sales Broker (Property Inquiries)</option>
                  <option>FMD Manager (Maintenance Support)</option>
                  <option>Interior Designer (Designo Support)</option>
                </select>
              </div>
              <div className="chat-messages">
                <motion.div className="message received" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <p>Hello! I am your dedicated Sales Broker. How can I assist you with your shortlisted properties?</p>
                  <span className="time">10:45 AM</span>
                </motion.div>
              </div>
              <div className="chat-input-area">
                <input type="text" placeholder="Type your message..." />
                <button className="send-btn">Send</button>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderAuth = () => (
    <motion.div key="auth" className="auth-container" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <div className="auth-card">
        <motion.div className="auth-header" variants={itemVariants}>
          <div className="logo-mark" style={{ margin: '0 auto 20px' }}>NV</div>
          <h2>{authMode === 'signin' ? 'Client Portal' : 'Create an Account'}</h2>
          <p>{authMode === 'signin' ? 'Sign in to access your portfolio and FMD services.' : 'Join NirVision for a seamless real estate experience.'}</p>
        </motion.div>
        
        <form className="auth-form" onSubmit={handleAuthSubmit}>
          {authError && <p style={{ color: '#ff4444', textAlign: 'center', marginBottom: '10px' }}>{authError}</p>}
          <AnimatePresence mode="wait">
            {authMode === 'signup' && (
              <motion.div className="form-group" initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 10 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" value={authName} onChange={e => setAuthName(e.target.value)} required={authMode === 'signup'} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div className="form-group" variants={itemVariants}>
            <label>Email Address</label>
            <input type="email" placeholder="client@example.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required />
          </motion.div>
          <motion.div className="form-group" variants={itemVariants}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required />
          </motion.div>
          <motion.button variants={itemVariants} type="submit" className="auth-submit-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        <motion.div className="auth-footer" variants={itemVariants}>
          {authMode === 'signin' ? (
            <p>Don't have an account? <span onClick={() => setAuthMode('signup')}>Sign up here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setAuthMode('signin')}>Sign in</span></p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="investor-dashboard-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className={`dashboard-container ${!isAuthenticated ? 'auth-mode' : ''}`} initial={{ y: "100%" }} animate={{ y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }} exit={{ y: "100%", transition: { duration: 0.4 } }}>
            <button className="dashboard-close" onClick={() => { onClose(); setTimeout(() => logout(), 500); }}>
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <AnimatePresence mode="wait">
              {!isAuthenticated ? (
                renderAuth()
              ) : (
                <motion.div key="dashboard" className="dashboard-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  
                  {/* Sidebar Navigation */}
                  <div className="dashboard-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                      <motion.div className="user-profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        {user?.avatar ? (
                          <div className="avatar" style={{ backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' }} />
                        ) : (
                          <div className="avatar">{user?.name ? user.name.substring(0,2).toUpperCase() : 'NV'}</div>
                        )}
                        <div className="user-info">
                          <h3>{user?.name || 'NirVision Client'}</h3>
                          <span>NirVision Client</span>
                        </div>
                      </motion.div>
                    
                    <nav className="dashboard-nav">
                      <div className="nav-section-title">Buyer Pipeline</div>
                      {[
                        { id: 'shortlist', icon: <Heart size={18} />, label: 'Shortlist' },
                        { id: 'viewings', icon: <Calendar size={18} />, label: 'Viewings' }
                      ].map(tab => (
                        <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
                          {activeTab === tab.id && <motion.div layoutId="active-pill" className="active-pill-bg" initial={false} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                          <span className="nav-btn-content">{tab.icon} {tab.label}</span>
                        </button>
                      ))}

                      <div className="nav-section-title">Management</div>
                      {[
                        { id: 'my_properties', icon: <Home size={18} />, label: 'My Properties' },
                        { id: 'maintenance', icon: <Wrench size={18} />, label: 'Maintenance (FMD)' },
                        { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing' },
                        { id: 'vault', icon: <FileText size={18} />, label: 'Vault' },
                        { id: 'concierge', icon: <MessageSquare size={18} />, label: 'Support Concierge' },
                        { id: 'settings', icon: <Settings size={18} />, label: 'Settings' }
                      ].map(tab => (
                        <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
                          {activeTab === tab.id && <motion.div layoutId="active-pill" className="active-pill-bg" initial={false} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                          <span className="nav-btn-content">{tab.icon} {tab.label}</span>
                        </button>
                      ))}
                    </nav>
                    </div>
                    
                    <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button 
                        onClick={() => { logout(); onClose(); }} 
                        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: 14, transition: 'opacity 0.3s ease' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="dashboard-main">
                    <AnimatePresence mode="wait">
                      {renderContent()}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Payment Popup Mock */}
          <AnimatePresence>
            {showPaymentPopup && (
              <motion.div className="payment-popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="payment-popup-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                  <button className="close-popup" onClick={() => setShowPaymentPopup(false)}><X size={24} /></button>
                  <AlertCircle size={48} color="#D84C7B" style={{ marginBottom: '20px' }} />
                  <h2>Confirm Payment</h2>
                  <p>You are about to pay <strong>{selectedInvoice?.amount}</strong> for {selectedInvoice?.desc}.</p>
                  <div className="payment-actions">
                    <button className="btn-cancel" onClick={() => setShowPaymentPopup(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={() => setShowPaymentPopup(false)}>Process Payment</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvestorDashboard;
