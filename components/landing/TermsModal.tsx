'use client';

import Modal from '@/components/ui/Modal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Términos de Compra" size="xl">
      <div className="font-body text-[#142840] space-y-6">
        <p className="text-[#6B7280] text-xs">Última actualización: marzo 2026</p>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">1. IDENTIFICACIÓN DEL VENDEDOR</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
            Equora es un emprendimiento independiente con sede en Colombia, dedicado a la comercialización de productos ecuestres de alta calidad.
          </p>
          <p className="text-[#6B7280] text-sm leading-relaxed font-medium mb-1">Contacto:</p>
          <ul className="space-y-1 ml-2 mb-2">
            {[
              'Teléfono / WhatsApp: 304 384 4516',
              'País de operación: Colombia',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#6B7280] text-sm leading-relaxed italic">
            Nota legal: Equora opera actualmente como emprendimiento de persona natural y no se encuentra constituida como sociedad comercial.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">2. OBJETO</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            El presente documento establece los términos bajo los cuales Equora ofrece y vende sus productos físicos a través del sitio web oficial y redes sociales.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">3. CATÁLOGO DE PRODUCTOS</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            Equora comercializa productos físicos del mundo ecuestre, entre ellos:
          </p>
          <ul className="space-y-1.5 ml-2 mb-3">
            {[
              'Accesorios para caballos y caballistas',
              'Elementos de organización para pesebreras y monturas',
              'Percheros y soportes',
              'Tablas personalizadas con nombres',
              'Riendas y artículos textiles',
              'Productos decorativos ecuestres',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Materiales utilizados: madera, metal, seda, textiles y combinaciones. El catálogo incluye productos estándar y productos personalizados bajo pedido.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">4. FABRICACIÓN Y DISPONIBILIDAD</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Todos los productos se fabrican sobre pedido. Una vez confirmado el pago, el tiempo estimado de producción es de 3 a 4 días hábiles antes del despacho.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">5. PRECIOS Y MEDIOS DE PAGO</h3>
          <ul className="space-y-1.5 ml-2">
            {[
              'Precios expresados en pesos colombianos (COP), sin IVA.',
              'El pago total debe realizarse antes del despacho.',
              'Método aceptado: transferencia bancaria.',
              'El pedido se confirma una vez verificado el pago.',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">6. ENVÍOS</h3>
          <ul className="space-y-1.5 ml-2">
            {[
              'Cobertura: todo el territorio colombiano.',
              'Operador logístico: Interrapidísimo.',
              'Tiempo estimado: 3 a 5 días hábiles desde el despacho.',
              'El costo del envío corre por cuenta del cliente.',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">7. COMPRAS A TRAVÉS DE REDES SOCIALES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Estos Términos aplican también a compras realizadas por Instagram, TikTok y mensajes directos. Al efectuar el pago, el cliente declara haberlos leído y aceptado en su totalidad.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">8. MODIFICACIONES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Equora se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios entran en vigencia desde su publicación en los canales oficiales.
          </p>
        </div>

        <p className="text-[#6B7280] text-xs border-t border-gray-100 pt-4">
          © 2026 Equora. Todos los derechos reservados.
        </p>
      </div>
    </Modal>
  );
}
