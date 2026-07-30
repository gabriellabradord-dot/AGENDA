export default function Contactos({ nombre, telefono, correo, etiqueta, onEdit }) {
  return (
    <article className="card-contacto">
      <div className="card-top">
        <div>
          <h3 className="card-nombre">{nombre}</h3>
          <span className="card-etiqueta">{etiqueta || "Contacto"}</span>
        </div>
        <button type="button" className="edit-action" onClick={onEdit}>
          Editar
        </button>
      </div>
      <p className="card-info">📞 {telefono}</p>
      <p className="card-info">✉️ {correo}</p>
    </article>
  );
}
