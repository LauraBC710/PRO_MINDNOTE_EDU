import React from 'react'
import './../styles/TermsAndConditionsModal.css'

const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal-content">
        <div className="terms-modal-header">
          <h2>MindNote.EDU – Términos y Condiciones</h2>
        </div>
        <div className="terms-modal-body">
          <h3>Fecha de actualización: noviembre de 2025</h3>
          <p>
            Bienvenido(a) a MindNote.EDU, una plataforma digital diseñada para
            ayudarte a gestionar tus tareas, recordatorios y notificaciones de
            manera sencilla e inteligente. Al registrarte o usar nuestro
            sistema, aceptas estos Términos y Condiciones. Te invitamos a
            leerlos con atención, ya que explican cómo puedes usar el servicio y
            cuáles son tus derechos y responsabilidades. Al registrarte y
            utilizar nuestros servicios, aceptas los siguientes términos y
            condiciones:
          </p>
          <h3>1. Uso del sistema</h3>
          <p>
            MindNote.EDU es una aplicación web creada con fines educativos y de
            productividad. Los usuarios pueden crear, editar y eliminar tareas o
            recordatorios, así como recibir notificaciones automáticas. Está
            prohibido usar la plataforma con fines ilícitos, para enviar
            contenido inapropiado o para intentar vulnerar la seguridad del
            sistema o de otros usuarios.
          </p>
          <h3>2. Tipos de usuarios </h3>
          <ul>
            <li>
              Usuarios individuales: personas que utilizan la plataforma para
              organizar su tiempo y actividades.
            </li>
            <li>
              Administradores: encargados de gestionar usuarios, revisar
              estadísticas y asegurar el correcto funcionamiento del sistema.
            </li>
            <li>
              Cada usuario es responsable del uso que haga de su cuenta y de
              mantener su información de acceso segura.
            </li>
          </ul>
          <h3>3. Registro y acceso </h3>
          <p>
            Para usar MindNote.EDU es necesario crear una cuenta con tu nombre,
            apellido, correo electrónico y contraseña. La información que
            proporciones debe ser verídica y actualizada. No compartas tus
            credenciales de acceso con terceros; la cuenta es personal e
            intransferible.
          </p>
          <h3>4. Notificaciones y recordatorios </h3>
          <p>
            El sistema puede enviarte correos electrónicos o notificaciones
            dentro de la aplicación para recordarte tareas o eventos próximos.
            Puedes configurar tus preferencias de notificación en cualquier
            momento.
          </p>
          <h3>5. Propiedad intelectual </h3>
          <p>
            El diseño, el logo, el nombre “MindNote.EDU” y las funciones del
            sistema son propiedad del equipo desarrollador.
          </p>
          <p>
            No está permitido copiar, modificar o distribuir partes del software
            sin autorización.
          </p>
          <h3>6. Limitación de responsabilidad </h3>
          <p>
            MindNote.EDU busca ofrecer un servicio confiable, pero no garantiza
            que esté libre de errores o interrupciones técnicas.
          </p>
          <p>
            No nos hacemos responsables por pérdidas de información ocasionadas
            por fallas técnicas, uso indebido o causas ajenas al sistema.
          </p>
          <h3>7. Modificaciones</h3>
          <p>
            Podemos actualizar estos Términos y Condiciones en cualquier
            momento.
          </p>
          <p>
            Te notificaremos cuando haya cambios importantes y la versión más
            reciente siempre estará disponible dentro de la aplicación o en
            nuestra página oficial.
          </p>
          <h3>8. Contacto </h3>
          <p>
            Si tienes dudas o comentarios sobre estos términos, puedes comunicarte con nosotros a: mindnotedu@gmail.com
          </p>
        </div>
        <div className="terms-modal-footer">
          <button onClick={onClose} className="terms-close-button-footer">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsModal
