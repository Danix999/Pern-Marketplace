// client/src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  // Sacamos el user de localStorage
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;

  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (storedUser && storedUser.user_id) {
      fetchProfile(storedUser.user_id);
    }
  }, [storedUser]);

  const fetchProfile = async (user_id) => {
    try {
      const res = await axios.get(`http://localhost:4000/profile/${user_id}`);
      const profile = res.data.profile;
      setPhotoUrl(profile.photo_url || '');
      setDescription(profile.description || '');
      setExperience(profile.experience || '');
      setSkills(profile.skills || '');
    } catch (error) {
      // si no existe el perfil, no pasa nada, se creará
      console.log(error.response?.data || error.message);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post('http://localhost:4000/profile', {
        user_id: storedUser.user_id,
        photo_url: photoUrl,
        description,
        experience,
        skills
      });
      setMensaje(res.data.message);
    } catch (error) {
      console.error(error);
      setMensaje('Error al guardar el perfil');
    }
  };

  // Si no hay usuario, tal vez redirigir a /login
  if (!storedUser) {
    return <p style={{ textAlign: 'center' }}>No estás autenticado. <a href="/login">Inicia sesión</a>.</p>;
  }

  return (
    <div className="profile-page-container">
      <h2 className="profile-title">Mi Perfil</h2>

      <div className="profile-form-group">
        <label>URL de la Foto</label>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="profile-input"
        />
      </div>

      <div className="profile-form-group">
        <label>Descripción</label>
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="profile-input"
        />
      </div>

      <div className="profile-form-group">
        <label>Experiencia</label>
        <textarea
          rows="3"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="profile-input"
        />
      </div>

      <div className="profile-form-group">
        <label>Habilidades</label>
        <textarea
          rows="2"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="profile-input"
        />
        <small>Ejemplo: "HTML, CSS, JavaScript"</small>
      </div>

      <button className="btn-save" onClick={handleSave}>
        Guardar Perfil
      </button>

      {mensaje && <p className="profile-message">{mensaje}</p>}

      {/* Vista previa de la foto */}
      {photoUrl && (
        <div className="profile-photo-preview">
          <h3>Vista previa de la foto:</h3>
          <img src={photoUrl} alt="Foto de perfil" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
