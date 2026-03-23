'use client';

import Modal from '@/components/ui/Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Privacidad" size="xl">
      <div className="font-body text-[#0D0D0D] space-y-6">
        <p className="text-[#6B7280] text-xs">Última actualización: marzo 2026</p>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">1. RESPONSABLE DEL TRATAMIENTO</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
            Equora es un emprendimiento de persona natural con sede en Colombia, responsable del tratamiento de los datos personales recopilados a través de su sitio web y canales digitales oficiales.
          </p>
          <p className="text-[#6B7280] text-sm leading-relaxed font-medium mb-1">Contacto:</p>
          <ul className="space-y-1 ml-2">
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
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">2. MARCO LEGAL</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Esta Política se rige por la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia) y el Decreto Reglamentario 1377 de 2013. Al interactuar con Equora y proporcionar sus datos, el usuario otorga su consentimiento para su tratamiento conforme a lo aquí establecido.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">3. DATOS QUE RECOPILAMOS</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">Equora puede recopilar los siguientes datos personales:</p>
          <ul className="space-y-1.5 ml-2">
            {[
              'Nombre completo',
              'Número de teléfono o WhatsApp',
              'Dirección de entrega',
              'Ciudad y departamento',
              'Correo electrónico (cuando aplique)',
              'Información sobre el pedido realizado',
              'Datos de pago (solo para verificación de transferencia; no almacenamos datos bancarios completos)',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">4. FINALIDAD DEL TRATAMIENTO</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">Los datos recopilados se utilizan exclusivamente para:</p>
          <ul className="space-y-1.5 ml-2">
            {[
              { label: 'a)', text: 'Procesar y gestionar el pedido del cliente.' },
              { label: 'b)', text: 'Coordinar el envío y la entrega del producto.' },
              { label: 'c)', text: 'Comunicar el estado del pedido.' },
              { label: 'd)', text: 'Atender solicitudes de garantía, cambios o inconformidades.' },
              { label: 'e)', text: 'Mejorar nuestros productos y servicios.' },
              { label: 'f)', text: 'Enviar comunicaciones comerciales (solo con consentimiento previo).' },
            ].map((item) => (
              <li key={item.label} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="font-medium text-equora-dark shrink-0">{item.label}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">5. COMPARTICIÓN DE DATOS CON TERCEROS</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            Equora no vende, arrienda ni comercializa datos personales. Únicamente comparte información con:
          </p>
          <ul className="space-y-1.5 ml-2">
            {[
              'La empresa transportadora (Interrapidísimo) en la medida necesaria para efectuar la entrega del pedido.',
              'Entidades oficiales, cuando la ley lo exija.',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">6. CONSERVACIÓN DE DATOS</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Los datos personales se conservan únicamente durante el tiempo necesario para cumplir las finalidades descritas o mientras exista una relación comercial activa. Transcurrido ese período, serán eliminados o anonimizados de manera segura.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">7. DERECHOS DEL TITULAR</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            De conformidad con la Ley 1581 de 2012, el cliente tiene derecho a:
          </p>
          <ul className="space-y-1.5 ml-2">
            {[
              'Conocer, actualizar y rectificar sus datos personales.',
              'Solicitar la eliminación de sus datos cuando no exista obligación legal de conservarlos.',
              'Revocar la autorización otorgada para el tratamiento de sus datos.',
              'Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#6B7280] text-sm leading-relaxed mt-3">
            Para ejercer estos derechos, comuníquese con nosotros al: <span className="font-medium text-equora-dark">WhatsApp: 304 384 4516</span>
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">8. SEGURIDAD DE LA INFORMACIÓN</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Equora adopta medidas razonables de seguridad para proteger los datos personales de sus clientes frente a accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema de transmisión de datos por Internet puede garantizar seguridad absoluta.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">9. MODIFICACIONES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Equora puede actualizar esta Política en cualquier momento. Los cambios serán comunicados a través de los canales oficiales de la marca y entrarán en vigencia desde su publicación.
          </p>
        </div>

        <p className="text-[#6B7280] text-xs border-t border-gray-100 pt-4">
          © 2026 Equora. Todos los derechos reservados.
        </p>
      </div>
    </Modal>
  );
}
