import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import ContactForm from '../components/Contactform';
import ContactList from '../components/Contactlist';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) setContacts(JSON.parse(storedContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: uuidv4() }]);
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
    setEditingContact(null);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Contact Management Dashboard
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ContactForm
            onSave={editingContact ? updateContact : addContact}
            editingContact={editingContact}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ContactList
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={deleteContact}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
