'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const MAIN_IMAGE = 'https://res.cloudinary.com/dybweubbo/image/upload/v1774135099/lifestyle-equora_ymtlu0.jpg';
const TRAINING_IMAGE = 'https://res.cloudinary.com/dybweubbo/image/upload/v1774135099/lifestyle-training_rbrqck.jpg';
const COMPETITION_IMAGE = 'https://res.cloudinary.com/dybweubbo/image/upload/v1774135099/lifestyle-competition_m3e6rq.jpg';

export default function Lifestyle() {
  return (
    <section id="lifestyle" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Un estilo de vida
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-equora-dark tracking-wider">
              TODOS LOS DÍAS.<br className="sm:hidden" />{' '}EN CUALQUIER CIRCUNSTANCIA.<br className="sm:hidden" />{' '}EL MISMO NIVEL.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main large image */}
          <ScrollReveal direction="left" className="md:col-span-7">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-125 rounded-2xl overflow-hidden group">
              <Image
                src={MAIN_IMAGE}
                alt="EQUORA Lifestyle"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-equora-dark/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="font-display text-[#F9F7F4] tracking-wider text-sm md:text-lg">
                  TRABAJO
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Two smaller images stacked */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <ScrollReveal direction="right" delay={200}>
              <div className="relative h-44 md:h-60 rounded-2xl overflow-hidden group">
                <Image
                  src={TRAINING_IMAGE}
                  alt="Entrenamiento ecuestre"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-equora-dark/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-[#F9F7F4] tracking-wider text-sm md:text-lg">
                    ENTRENAMIENTO
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <div className="relative h-44 md:h-60 rounded-2xl overflow-hidden group">
                <Image
                  src={COMPETITION_IMAGE}
                  alt="Competencia ecuestre"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-equora-dark/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-[#F9F7F4] tracking-wider text-sm md:text-lg">
                    COMPETENCIA
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
