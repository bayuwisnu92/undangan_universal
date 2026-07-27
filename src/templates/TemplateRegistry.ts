import React from 'react';
import type { WeddingData } from '../types/wedding';

// Lazy load components to optimize initial load bundle sizes
const TemplateElegant = React.lazy(() => import('./TemplateElegant/TemplateElegant'));
const TemplateMinimal = React.lazy(() => import('./TemplateMinimal/TemplateMinimal'));
const TemplateGlass = React.lazy(() => import('./TemplateGlass/TemplateGlass'));
const TemplateFloral = React.lazy(() => import('./TemplateFloral/TemplateFloral'));
const TemplateDark = React.lazy(() => import('./TemplateDark/TemplateDark'));
const TemplateRoyalSage = React.lazy(() => import('./TemplateRoyalSage/TemplateRoyalSage'));
const TemplateRusticWarm = React.lazy(() => import('./TemplateRusticWarm/TemplateRusticWarm'));
const TemplateCoastalBlue = React.lazy(() => import('./TemplateCoastalBlue/TemplateCoastalBlue'));
const TemplateCulturalCollection = React.lazy(() => import('./TemplateCulturalCollection/TemplateCulturalCollection'));

export interface TemplateDefinition {
  id: number;
  name: string;
  component: React.ComponentType<{ data: WeddingData }>;
}

export const TemplateRegistry: Record<number, TemplateDefinition> = {
  1: {
    id: 1,
    name: 'Elegant Luxury (Template Master)',
    component: TemplateElegant
  },
  2: {
    id: 2,
    name: 'Minimal White',
    component: TemplateMinimal
  },
  3: {
    id: 3,
    name: 'Modern Glassmorphism',
    component: TemplateGlass
  },
  4: {
    id: 4,
    name: 'Floral Garden',
    component: TemplateFloral
  },
  5: {
    id: 5,
    name: 'Dark Elegant',
    component: TemplateDark
  },
  6: {
    id: 6,
    name: 'Royal Sage',
    component: TemplateRoyalSage
  },
  7: {
    id: 7,
    name: 'Rustic Warm',
    component: TemplateRusticWarm
  },
  8: {
    id: 8,
    name: 'Coastal Blue',
    component: TemplateCoastalBlue
  },
  9: {
    id: 9,
    name: 'Islami Noor Mosque',
    component: TemplateCulturalCollection
  },
  10: {
    id: 10,
    name: 'Islami Andalus Emerald',
    component: TemplateCulturalCollection
  },
  11: {
    id: 11,
    name: 'Islami Kaaba Gold',
    component: TemplateCulturalCollection
  },
  12: {
    id: 12,
    name: 'Islami Sakinah Ivory',
    component: TemplateCulturalCollection
  },
  13: {
    id: 13,
    name: 'Islami Ottoman Blue',
    component: TemplateCulturalCollection
  },
  14: {
    id: 14,
    name: 'Adat Jawa Klasik',
    component: TemplateCulturalCollection
  },
  15: {
    id: 15,
    name: 'Adat Sunda Asri',
    component: TemplateCulturalCollection
  },
  16: {
    id: 16,
    name: 'Adat Padang Minang',
    component: TemplateCulturalCollection
  },
  17: {
    id: 17,
    name: 'Adat Batak Ulos',
    component: TemplateCulturalCollection
  },
  18: {
    id: 18,
    name: 'Adat Bugis Elegan',
    component: TemplateCulturalCollection
  }
};

export function getTemplateById(id: number): TemplateDefinition {
  return TemplateRegistry[id] || TemplateRegistry[1];
}
