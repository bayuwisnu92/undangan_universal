import React from 'react';
import type { WeddingData } from '../types/wedding';

// Lazy load components to optimize initial load bundle sizes
const TemplateElegant = React.lazy(() => import('./TemplateElegant/TemplateElegant'));
const TemplateMinimal = React.lazy(() => import('./TemplateMinimal/TemplateMinimal'));
const TemplateGlass = React.lazy(() => import('./TemplateGlass/TemplateGlass'));
const TemplateFloral = React.lazy(() => import('./TemplateFloral/TemplateFloral'));
const TemplateDark = React.lazy(() => import('./TemplateDark/TemplateDark'));

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
  }
};

export function getTemplateById(id: number): TemplateDefinition {
  return TemplateRegistry[id] || TemplateRegistry[1];
}
