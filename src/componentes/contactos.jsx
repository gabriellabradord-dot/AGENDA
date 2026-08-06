export default function Contactos({ nombre, telefono, correo, etiqueta, onEdit, onDelete }) {
  return (
    <article className="card-contacto">
      <div className="card-top">
        <div>
          <h3 className="card-nombre">{nombre}</h3>
          <span className="card-etiqueta">{etiqueta || "Contacto"}</span>
        </div>
        <div className="card-actions">
          <button type="button" className="edit-action" onClick={onEdit}>
            Editar
          </button>
          <button type="button" className="delete-action" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
      <div className="card-details">
        <p className="card-info">📞 {telefono}</p>
        <p className="card-info">✉️ {correo}</p>
      </div>
    </article>
  );
}
