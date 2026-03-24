'use client';

import React, { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

function AccordionItemComponent({ item, index }: { item: AccordionItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        aria-expanded={open}
        aria-controls={`accordion-answer-${index}`}
        id={`accordion-question-${index}`}
      >
        <span className="font-body font-medium text-[#F9F7F4] pr-8 group-hover:text-[#C4895A] transition-colors">
          {item.question}
        </span>
        <span className="shrink-0 text-equora-amber" aria-hidden="true">
          {open ? <IoRemove size={20} /> : <IoAdd size={20} />}
        </span>
      </button>

      <div
        id={`accordion-answer-${index}`}
        role="region"
        aria-labelledby={`accordion-question-${index}`}
        style={{
          maxHeight: open ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p className="pb-6 text-[#6B7280] font-body leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItemComponent key={index} item={item} index={index} />
      ))}
    </div>
  );
}
