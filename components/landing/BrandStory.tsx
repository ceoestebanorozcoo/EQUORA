'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';

const STORY_IMAGE = 'https://res.cloudinary.com/dybweubbo/image/upload/v1774137578/WhatsApp_Image_2026-03-21_at_18.58.24_etrovr.jpg';

export default function BrandStory() {
  return (
    <section id="historia" className="bg-equora-navy py-24 md:py-36 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={STORY_IMAGE}
                  alt="Fundadora de Equora junto a su caballo en una finca colombiana"
                  width={800}
                  height={650}
                  className="w-full h-125 lg:h-162 object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal direction="right">
              <p className="font-editorial text-equora-amber italic text-lg mb-3">
                Nuestra Historia
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-8">
                EL ORIGEN DE EQUORA
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <div className="space-y-5 font-body text-[#F9F7F4]/75 text-[15px] leading-relaxed">
                <p>
                  Mi amor por los caballos ha existido toda la vida. Crecí en una
                  finca rodeada de campo, ganadería y caballos — un privilegio que
                  marcó cada parte de quien soy. Pero si hay alguien de quien heredé
                  profundamente esta pasión, fue de mi abuelo. De él aprendí a
                  admirar su nobleza y esa conexión única entre una persona y su
                  caballo.
                </p>
                <p>
                  Con los años, viviendo de cerca todo lo que rodea al mundo equino,
                  surgió una idea: crear productos pensados para quienes comparten
                  esta misma pasión. Detalles que acompañen cada momento — desde la
                  pesebrera hasta cada cabalgata — y que reflejen la personalidad de
                  quien los usa.
                </p>
                <p className="font-editorial text-equora-amber/90 italic text-lg">
                  &ldquo;En el gremio caballista los detalles hablan. Una rienda bien
                  elegida, un apero con personalidad o un espacio cuidado dicen mucho
                  de quien está detrás del caballo.&rdquo;
                </p>
                <p>
                  Así nació <span className="text-equora-amber font-semibold">Equora</span> — una
                  marca inspirada en quienes viven esta pasión todos los días.
                  Distinción, carácter y nobleza en cada detalle.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
