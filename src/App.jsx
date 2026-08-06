import { useState, useEffect } from "react";
import Contactos from "./componentes/contactos";
import FormularioContactos from "./componentes/FormularioContactos";
import "./App.css";

const LOCAL_STORAGE_KEY = "miProyectoContactos";

function App() {
  const initialContactos = [
    { id: 1, nombre: "Gustavo Bolaños", telefono: "300 123 4567", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
    { id: 2, nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Profesor" },
    { id: 3, nombre: "Carlos Labrador", telefono: "310 456 7890", correo: "carlos@gmail.com", etiqueta: "Familiar" },
    { id: 4, nombre: "Andrés Pérez", telefono: "320 987 6543", correo: "andres@gmail.com", etiqueta: "Amigo" },
  ];

  const [contactos, setContactos] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialContactos;
  });
  const [formData, setFormData] = useState({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  const [editingId, setEditingId] = useState(null);

  const isEditing = editingId !== null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", telefono: "", correo: "", etiqueta: "" });
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim() || !formData.correo.trim()) {
      return;
    }

    if (isEditing) {
      setContactos((prev) =>
        prev.map((contacto) =>
          contacto.id === editingId ? { ...contacto, ...formData } : contacto
        )
      );
    } else {
      setContactos((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }

    resetForm();
  };

  const handleEdit = (contacto) => {
    setEditingId(contacto.id);
    setFormData({
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      correo: contacto.correo,
      etiqueta: contacto.etiqueta,
    });
  };

  const handleDelete = (id) => {
    setContactos((prev) => prev.filter((contacto) => contacto.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactos));
  }, [contactos]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Agenda Ejecutiva</p>
          <h1>Gestión de Contactos</h1>
          <p className="subtitle">
            Una interfaz profesional en tonos mate negro, dorado y silver para gestionar tu agenda con estilo.
          </p>
          <p className="storage-note">Los contactos se guardan automáticamente en este navegador con localStorage.</p>
        </div>
        <div className="stats-panel">
          <span>{contactos.length} contactos</span>
          <span>{isEditing ? "Modo edición activo" : "Modo agregar"}</span>
        </div>
      </header>

      <main className="app-main">
        <FormularioContactos 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          onReset={resetForm}
        />

        <section className="panel panel-list">
          <div className="panel-header panel-header-list">
            <div>
              <span className="panel-tag">Contactos</span>
              <h2>Contactos guardados</h2>
            </div>
            <p>Haz clic en editar para cargar los datos del contacto en el formulario automáticamente.</p>
          </div>

          <div className="cards-grid">
            {contactos.map((contacto) => (
              <Contactos
                key={contacto.id}
                nombre={contacto.nombre}
                telefono={contacto.telefono}
                correo={contacto.correo}
                etiqueta={contacto.etiqueta}
                onEdit={() => handleEdit(contacto)}
                onDelete={() => handleDelete(contacto.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
