'use client';

import Modal from '@/components/ui/Modal';

interface CookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiesModal({ isOpen, onClose }: CookiesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Cookies" size="xl">
      <div className="font-body text-[#0D0D0D] space-y-6">
        <p className="text-[#6B7280] text-xs">Última actualización: marzo 2026</p>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">1. ¿QUÉ SON LAS COOKIES?</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al momento de visitarlos. Su función es recordar información de sesión, preferencias y datos de navegación para ofrecer una experiencia más fluida y personalizada.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">2. COOKIES QUE UTILIZA EQUORA</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            El sitio web de Equora puede hacer uso de los siguientes tipos de cookies:
          </p>
          <ul className="space-y-3 ml-2">
            {[
              { label: 'a) Técnicas o esenciales', text: 'Necesarias para el funcionamiento básico del sitio. Sin ellas, ciertas funciones no estarían disponibles.' },
              { label: 'b) Analíticas', text: 'Permiten medir el tráfico y el comportamiento de los visitantes con el fin de mejorar el rendimiento del sitio. Los datos recopilados son anónimos o pseudoanónimos.' },
              { label: 'c) De preferencias', text: 'Recuerdan configuraciones del usuario (idioma, región, etc.) para personalizar la experiencia de navegación.' },
              { label: 'd) De marketing o publicidad', text: 'Utilizadas para mostrar contenido relevante en plataformas externas como Meta o Google. Solo se activan si el usuario no las ha bloqueado desde su navegador.' },
            ].map((item) => (
              <li key={item.label} className="text-[#6B7280] text-sm leading-relaxed">
                <span className="font-medium text-equora-dark">{item.label}</span><br />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">3. COOKIES DE TERCEROS</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            El sitio puede integrar herramientas de terceros con cookies propias, como:
          </p>
          <ul className="space-y-1.5 ml-2">
            {[
              { name: 'Google Analytics', desc: 'análisis de tráfico' },
              { name: 'Meta Pixel', desc: 'seguimiento de campañas publicitarias' },
              { name: 'Plataformas de pago o atención al cliente', desc: '' },
            ].map((item) => (
              <li key={item.name} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                <span>
                  <span className="font-medium text-equora-dark">{item.name}</span>
                  {item.desc ? ` — ${item.desc}` : ''}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[#6B7280] text-sm leading-relaxed mt-3">
            Equora no controla las cookies de estos proveedores. Para más información, consulte directamente su política de privacidad.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">4. GESTIÓN DE COOKIES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            El usuario tiene el control total sobre las cookies desde la configuración de su navegador. Puede aceptarlas, bloquearlas o eliminarlas en cualquier momento:
          </p>
          <ul className="space-y-2 ml-2">
            {[
              { name: 'Google Chrome', path: 'Configuración › Privacidad y seguridad › Cookies' },
              { name: 'Mozilla Firefox', path: 'Opciones › Privacidad y seguridad' },
              { name: 'Safari', path: 'Preferencias › Privacidad' },
              { name: 'Microsoft Edge', path: 'Configuración › Privacidad, búsqueda y servicios' },
            ].map((b) => (
              <li key={b.name} className="text-[#6B7280] text-sm leading-relaxed">
                <span className="font-medium text-equora-dark">{b.name}</span>: {b.path}
              </li>
            ))}
          </ul>
          <p className="text-[#6B7280] text-sm leading-relaxed mt-3">
            Tenga en cuenta que bloquear las cookies técnicas puede afectar el funcionamiento de algunas secciones del sitio.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">5. MODIFICACIONES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Equora puede actualizar esta Política cuando lo considere necesario. Los cambios se publicarán en esta misma página con la fecha de actualización correspondiente.
          </p>
        </div>

        <p className="text-[#6B7280] text-xs border-t border-gray-100 pt-4">
          © 2026 Equora. Todos los derechos reservados.
        </p>
      </div>
    </Modal>
  );
}
