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
  }
};

export function getTemplateById(id: number): TemplateDefinition {
  return TemplateRegistry[id] || TemplateRegistry[1];
}
