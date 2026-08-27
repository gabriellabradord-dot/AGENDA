import { useEffect, useMemo, useState } from 'react';
import { ArrowDownAZ, ArrowUpAZ, Mail, Phone, Plus, Search, Trash2, UserRound, X } from 'lucide-react';
import './agenda.css';

const API_URL = 'http://localhost:3001/contacts';

function ContactCard({ contact, onDelete }) {
  const initials = contact.nombre.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return <article className="contact-card"><div className="avatar">{initials}</div><div className="contact-copy"><div className="contact-heading"><h2>{contact.nombre}</h2><span className="tag">{contact.etiqueta || 'Sin etiqueta'}</span></div><div className="contact-details"><a href={`tel:${contact.telefono}`}><Phone size={15} />{contact.telefono || 'Sin teléfono'}</a><a href={`mailto:${contact.correo}`}><Mail size={15} />{contact.correo}</a></div></div><button className="icon-button delete-button" type="button" onClick={() => onDelete(contact.id)} aria-label={`Eliminar a ${contact.nombre}`} title="Eliminar contacto"><Trash2 size={17} /></button></article>;
}

function ContactForm({ form, setForm, onSubmit, onClose }) {
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  return <form className="contact-form" onSubmit={onSubmit}><div className="form-title"><UserRound size={18} /><strong>Nuevo contacto</strong></div><label>Nombre completo<input required value={form.nombre} onChange={update('nombre')} placeholder="Ej. Laura Gómez" /></label><label>Teléfono<input value={form.telefono} onChange={update('telefono')} placeholder="300 000 0000" /></label><label>Correo electrónico<input required type="email" value={form.correo} onChange={update('correo')} placeholder="correo@ejemplo.com" /></label><label>Etiqueta<select value={form.etiqueta} onChange={update('etiqueta')}><option>Compañera</option><option>Instructor</option><option>Cliente</option><option>Familia</option><option>Trabajo</option></select></label><div className="form-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit"><Plus size={17} />Agregar contacto</button></div></form>;
}

export default function Agenda() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre: '', telefono: '', correo: '', etiqueta: 'Compañera' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => { if (!response.ok) throw new Error('No se pudo cargar la agenda.'); return response.json(); })
      .then(setContacts)
      .catch(() => setError('No se pudo conectar con el servidor. Ejecuta npm run dev:full.'))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('es');
    return contacts.filter((contact) => Object.values(contact).some((value) => String(value).toLocaleLowerCase('es').includes(term))).slice().sort((first, second) => {
      const comparison = first.nombre.localeCompare(second.nombre, 'es', { sensitivity: 'base' });
      return ascending ? comparison : -comparison;
    });
  }, [contacts, query, ascending]);

  const addContact = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('No se pudo guardar el contacto.');
      const createdContact = await response.json();
      setContacts((current) => [...current, createdContact]);
      setForm({ nombre: '', telefono: '', correo: '', etiqueta: 'Compañera' });
      setShowForm(false);
      setError('');
    } catch { setError('No se pudo guardar el contacto.'); } finally { setSaving(false); }
  };
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('No se pudo eliminar el contacto.');
      setContacts((current) => current.filter((contact) => contact.id !== id));
      setError('');
    } catch { setError('No se pudo eliminar el contacto.'); }
  };

  return <main className="app-shell"><header className="app-header"><div className="brand-mark"><UserRound size={23} /></div><div><p className="eyebrow">Agenda personal</p><h1>Mis contactos</h1><p className="subtitle">Encuentra, organiza y administra tus contactos.</p></div></header><section className="workspace" aria-label="Gestión de contactos"><div className="toolbar"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, correo, teléfono o etiqueta..." aria-label="Buscar contactos" />{query && <button className="clear-button" type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={16} /></button>}</div><div className="toolbar-actions"><button className="secondary-button" type="button" onClick={() => setAscending((current) => !current)} disabled={loading}>{ascending ? <ArrowDownAZ size={17} /> : <ArrowUpAZ size={17} />}{ascending ? 'Ordenar Z-A' : 'Ordenar A-Z'}</button><button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)} disabled={loading}>{showForm ? <X size={17} /> : <Plus size={17} />}{showForm ? 'Cerrar' : 'Nuevo contacto'}</button></div></div>{error && <div className="error-message" role="alert">{error}</div>}{showForm && <ContactForm form={form} setForm={setForm} onSubmit={addContact} onClose={() => setShowForm(false)} saving={saving} />}<div className="results-header"><div><strong>{results.length}</strong> contacto{results.length === 1 ? '' : 's'} encontrado{results.length === 1 ? '' : 's'}</div><span>{ascending ? 'A-Z' : 'Z-A'}</span></div><div className="contacts-list">{loading ? <div className="empty-state"><p>Cargando contactos...</p></div> : results.length ? results.map((contact) => <ContactCard key={contact.id} contact={contact} onDelete={deleteContact} />) : <div className="empty-state"><Search size={26} /><h2>No se encontraron contactos</h2><p>Prueba con otro nombre, correo, teléfono o etiqueta.</p>{query && <button className="secondary-button" type="button" onClick={() => setQuery('')}>Limpiar búsqueda</button>}</div>}</div></section></main>;
}
