import { create } from 'zustand';
import { PlanFilters } from '@/services/plans';

type FiltersState = {
  filters: PlanFilters;
  setFilters: (filters: PlanFilters) => void;
  clearFilters: () => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}));
