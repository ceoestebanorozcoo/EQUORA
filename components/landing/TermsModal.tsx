'use client';

import Modal from '@/components/ui/Modal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Términos y Condiciones" size="xl">
      <div className="prose prose-sm max-w-none font-body text-[#0D0D0D] space-y-6">
        <p className="text-[#6B7280] text-xs">Última actualización: marzo 2026</p>

        {[
          {
            num: '1',
            title: 'IDENTIFICACIÓN',
            content: `Equora es un emprendimiento independiente ubicado en Colombia, dedicado a la comercialización de productos ecuestres.
Contacto: Teléfono: 3043844516
País de operación: Colombia
Actualmente Equora no se encuentra constituida como sociedad comercial y opera como emprendimiento persona natural.`,
          },
          {
            num: '2',
            title: 'OBJETO',
            content: 'Los presentes Términos y Condiciones regulan la compra y venta de productos físicos ofrecidos por Equora a través de su sitio web y redes sociales oficiales.',
          },
          {
            num: '3',
            title: 'PRODUCTOS',
            content: `Equora comercializa productos físicos relacionados con el mundo ecuestre: accesorios para caballos y caballistas, elementos de organización para pesebreras y monturas, percheros y soportes, tablas personalizadas con nombres, riendas y artículos textiles, productos decorativos ecuestres.
Materiales: madera, metal, seda u otros textiles, y combinaciones. Algunos productos son estándar y otros personalizados.`,
          },
          {
            num: '4',
            title: 'FABRICACIÓN Y DISPONIBILIDAD',
            content: 'Los productos se fabrican sobre pedido. Tiempo estimado de producción: 3 a 4 días hábiles antes del envío.',
          },
          {
            num: '5',
            title: 'PRECIOS Y PAGOS',
            content: 'Precios en pesos colombianos (COP), sin IVA. Pago total antes del despacho. Método: transferencia bancaria. La orden se confirma una vez verificado el pago.',
          },
          {
            num: '6',
            title: 'ENVÍOS',
            content: `Envíos a todo Colombia vía Interrapidísimo. Tiempo estimado: 3 a 5 días hábiles después del despacho. Costo de envío asumido por el cliente. Pérdida atribuible a la transportadora: Equora reenvía el producto. Daños en tránsito: reportar dentro de 2 días calendario tras la entrega. Equora no responde por retrasos de la transportadora.`,
          },
          {
            num: '7',
            title: 'CAMBIOS Y DEVOLUCIONES',
            content: 'No se realizan devoluciones por cambio de opinión. Productos personalizados: sin cambio ni devolución salvo defecto de fabricación. Plazo para reportar inconformidades: 2 días calendario desde la recepción.',
          },
          {
            num: '8',
            title: 'GARANTÍA',
            content: `15 días calendario desde la entrega. Cubre: defectos de fabricación, fallas estructurales no por mal uso. No cubre: golpes, humedad, oxidación, instalación incorrecta, manipulación inadecuada, desgaste natural, modificaciones del cliente, uso indebido. Para solicitar garantía: enviar evidencia fotográfica o en video. Equora evaluará y podrá optar por reparación, reposición o solución equivalente.`,
          },
          {
            num: '9',
            title: 'RESPONSABILIDAD SOBRE EL USO',
            content: 'El cliente es responsable del uso adecuado. En accesorios para caballos debe verificar adecuación, ajuste correcto e instalación segura. Equora no responde por lesiones derivadas del uso incorrecto.',
          },
          {
            num: '10',
            title: 'VARIACIONES DE COLOR Y MATERIALES',
            content: 'Pueden presentarse ligeras variaciones por iluminación, pantalla del dispositivo o características naturales de los materiales. No constituyen defecto.',
          },
          {
            num: '11',
            title: 'PROPIEDAD INTELECTUAL',
            content: 'Todo el contenido de Equora (fotografías, videos, logotipo, nombre comercial, diseños, textos) es propiedad exclusiva y no puede reproducirse sin autorización.',
          },
          {
            num: '12',
            title: 'VENTAS POR REDES SOCIALES',
            content: 'Estos Términos aplican también a compras por Instagram, TikTok y mensajes directos. Al realizar el pago, el cliente declara haberlos leído y aceptado.',
          },
          {
            num: '13',
            title: 'MODIFICACIONES',
            content: 'Equora puede modificar estos Términos en cualquier momento. Las modificaciones entran en vigencia desde su publicación en canales oficiales.',
          },
        ].map((section) => (
          <div key={section.num}>
            <h3 className="font-body font-semibold text-equora-dark text-sm mb-2">
              {section.num}. {section.title}
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
