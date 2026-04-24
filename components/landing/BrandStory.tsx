'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const STORY_IMAGE = 'https://res.cloudinary.com/dybweubbo/image/upload/v1776994971/IMG_0738_t2ekez.jpg';

export default function BrandStory() {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section id="historia" className="bg-equora-navy py-24 md:py-36 px-6 overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-equora-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* ── Image ── */}
          <ScrollReveal direction="left">
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              {/* Offset amber border, animates on hover */}
              <div className={`
                absolute -bottom-3 -right-3 w-full h-full rounded-3xl border transition-all duration-500
                ${imgHovered ? 'border-white/60 -bottom-5 -right-5' : 'border-white/20'}
              `} />

              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
                {/* Image with zoom */}
                <div className={`transition-transform duration-700 ease-out ${imgHovered ? 'scale-105' : 'scale-100'}`}>
                  <Image
                    src={STORY_IMAGE}
                    alt="Fundadora de Equora junto a su caballo en una finca colombiana"
                    width={800}
                    height={650}
                    className="w-full h-72 sm:h-96 md:h-125 lg:h-162 object-cover object-top lg:object-center"
                  />
                </div>

                {/* Hover overlay with amber tint */}
                <div className={`
                  absolute inset-0 transition-opacity duration-500
                  bg-linear-to-t from-equora-navy/60 via-equora-navy/10 to-transparent
                  ${imgHovered ? 'opacity-100' : 'opacity-60'}
                `} />

                {/* Hover label */}
                <div className="absolute bottom-7 left-7">
                  <p className="font-display text-white/90 tracking-widest text-xs uppercase mb-1">Fundadora</p>
                  <p className="font-editorial text-white italic text-base">Con pasión desde el primer día</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Content ── */}
          <div className="flex flex-col gap-7">

            <ScrollReveal direction="right" delay={0}>
              <p className="font-editorial text-equora-amber italic text-lg">
                Nuestra Historia
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-tight mt-2">
                EL ORIGEN DE<br />EQUORA
              </h2>
              <div className="mt-5 w-10 h-px bg-equora-amber" />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <p className="font-body text-white/75 text-[15px] leading-relaxed">
                Mi amor por los caballos ha existido toda la vida. Crecí en una
                finca rodeada de campo, ganadería y caballos, un privilegio que
                marcó cada parte de quien soy. Pero si hay alguien de quien heredé
                profundamente esta pasión, fue de mi abuelo. De él aprendí a
                admirar su nobleza y esa conexión única entre una persona y su caballo.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={250}>
              <p className="font-body text-white/75 text-[15px] leading-relaxed">
                Con los años, viviendo de cerca todo lo que rodea al mundo equino,
                surgió una idea: crear productos pensados para quienes comparten
                esta misma pasión. Detalles que acompañen cada momento, desde la
                pesebrera hasta cada cabalgata, y que reflejen la personalidad de
                quien los usa.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={350}>
              <div className="border-l border-equora-amber/60 pl-5 py-1">
                <p className="font-editorial text-[#E7D6C2]/85 italic text-lg leading-relaxed">
                  &ldquo;En el gremio caballista los detalles hablan. Una rienda bien
                  elegida, un apero con personalidad o un espacio cuidado dicen mucho
                  de quien está detrás del caballo.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={450}>
              <div className="h-px w-full bg-white/8" />
              <p className="font-body text-white/75 text-[15px] leading-relaxed mt-5 text-center">
                Así nació{' '}
                <span className="text-white font-semibold">Equora</span>
                , una marca inspirada en quienes viven esta pasión todos los días.
                Distinción, carácter y nobleza en cada detalle.
              </p>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
