'use client';

import Modal from '@/components/ui/Modal';

interface ConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConditionsModal({ isOpen, onClose }: ConditionsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Condiciones de Compra" size="xl">
      <div className="font-body text-[#142840] space-y-6">
        <p className="text-[#6B7280] text-xs">Última actualización: marzo 2026</p>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">1. RESPONSABILIDAD EN EL TRANSPORTE</h3>
          <ul className="space-y-2 ml-2">
            {[
              'Pérdida atribuible a la transportadora: Equora reenvía el producto sin costo adicional para el cliente.',
              'Daños visibles al momento de la entrega: deben reportarse dentro de los 2 días calendario siguientes a la recepción.',
              'Equora no asume responsabilidad por retrasos ocasionados por la transportadora.',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">2. CAMBIOS Y DEVOLUCIONES</h3>
          <ul className="space-y-1.5 ml-2">
            {[
              'No se aceptan devoluciones por cambio de opinión.',
              'Los productos personalizados no admiten cambio ni devolución, salvo defecto de fabricación comprobable.',
              'El cliente dispone de 2 días calendario desde la recepción para reportar cualquier inconformidad.',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-equora-amber mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">3. GARANTÍA</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            <span className="font-medium text-equora-dark">Vigencia:</span> 15 días calendario desde la fecha de entrega.
          </p>

          <p className="text-[#6B7280] text-sm font-medium mb-1.5">Cubre:</p>
          <ul className="space-y-1.5 ml-2 mb-3">
            {[
              'Defectos de fabricación',
              'Fallas estructurales no causadas por mal uso',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-[#6B7280] text-sm font-medium mb-1.5">No cubre:</p>
          <ul className="space-y-1.5 ml-2 mb-3">
            {[
              'Golpes o impactos',
              'Exposición a humedad o agentes externos',
              'Oxidación',
              'Instalación incorrecta o manipulación inadecuada',
              'Desgaste natural por uso',
              'Modificaciones realizadas por el cliente',
              'Uso distinto al previsto',
            ].map((item) => (
              <li key={item} className="text-[#6B7280] text-sm leading-relaxed flex items-start gap-2">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-[#6B7280] text-sm leading-relaxed">
            Para activar la garantía, el cliente debe enviar evidencia fotográfica o en video que documente el defecto. Equora evaluará y determinará la solución: reparación, reposición o equivalente.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">4. RESPONSABILIDAD SOBRE EL USO</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
            El cliente es responsable del uso adecuado de los productos. En accesorios para caballos, debe verificar la adecuación al animal, el ajuste correcto y una instalación segura antes de su uso.
          </p>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Equora no asume responsabilidad por lesiones, accidentes o daños derivados del uso incorrecto o negligente.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">5. VARIACIONES DE COLOR Y MATERIALES</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Pueden presentarse ligeras variaciones de color entre las imágenes publicadas y el producto recibido, por condiciones de iluminación, calibración de pantalla o características naturales de los materiales. Esto no constituye defecto de fabricación.
          </p>
        </div>

        <div>
          <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">6. PROPIEDAD INTELECTUAL</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Todo el contenido de Equora —fotografías, videos, logotipo, nombre comercial, diseños y textos— es propiedad exclusiva de la marca. Queda prohibida su reproducción o uso sin autorización expresa y por escrito.
          </p>
        </div>

        <p className="text-[#6B7280] text-xs border-t border-gray-100 pt-4">
          © 2026 Equora. Todos los derechos reservados.
        </p>
      </div>
    </Modal>
  );
}
