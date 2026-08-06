export default function FormularioContactos({ formData, onChange, onSubmit, isEditing, onReset }) {
  return (
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

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="input-grid grid-2">
          <div className="input-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              placeholder="Ej: María González"
            />
          </div>
          <div className="input-group">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={onChange}
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
              onChange={onChange}
              placeholder="Ej: 300 123 4567"
            />
          </div>
          <div className="input-group">
            <label htmlFor="etiqueta">Etiqueta</label>
            <input
              id="etiqueta"
              name="etiqueta"
              value={formData.etiqueta}
              onChange={onChange}
              placeholder="Ej: Cliente, Amigo, Proveedor"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button primary">
            {isEditing ? "Guardar cambios" : "Agregar contacto"}
          </button>
          {isEditing && (
            <button type="button" className="button secondary" onClick={onReset}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
