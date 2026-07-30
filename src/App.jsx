import { useState } from "react";
import Contactos from "./componentes/contactos";
import "./App.css";

function App() {
  const initialContactos = [
    { id: 1, nombre: "Gustavo Bolaños", telefono: "300 123 4567", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
    { id: 2, nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Profesor" },
    { id: 3, nombre: "Carlos Labrador", telefono: "310 456 7890", correo: "carlos@gmail.com", etiqueta: "Familiar" },
    { id: 4, nombre: "Andrés Pérez", telefono: "320 987 6543", correo: "andres@gmail.com", etiqueta: "Amigo" },
  ];

  const [contactos, setContactos] = useState(initialContactos);
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

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Agenda Ejecutiva</p>
          <h1>Gestión de Contactos</h1>
          <p className="subtitle">
            Una interfaz profesional en tonos mate negro, dorado y silver para gestionar tu agenda con estilo.
          </p>
        </div>
        <div className="stats-panel">
          <span>{contactos.length} contactos</span>
          <span>{isEditing ? "Modo edición activo" : "Modo agregar"}</span>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel-form">
          <div className="panel-header panel-header-form">
            <div>
              <span className="panel-tag">Formulario</span>
              <h2>{isEditing ? "Editar contacto" : "Nuevo contacto"}</h2>
            </div>
            <p>
              {isEditing
                ? "Actualiza la información y guarda para reemplazar el contacto existente."
                : "Completa el formulario para añadir un nuevo contacto a la agenda."}
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-grid grid-2">
              <div className="input-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: María González"
                />
              </div>
              <div className="input-group">
                <label htmlFor="correo">Correo</label>
                <input
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Ej: nombre@dominio.com"
                />
              </div>
            </div>

            <div className="input-grid grid-2">
              <div className="input-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 300 123 4567"
                />
              </div>
              <div className="input-group">
                <label htmlFor="etiqueta">Etiqueta</label>
                <input
                  id="etiqueta"
                  name="etiqueta"
                  value={formData.etiqueta}
                  onChange={handleChange}
                  placeholder="Ej: Cliente, Amigo, Proveedor"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="button primary">
                {isEditing ? "Guardar cambios" : "Agregar contacto"}
              </button>
              {isEditing && (
                <button type="button" className="button secondary" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

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
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
