import { create } from 'zustand';

import {
  availableCourses,
  DEMO_PICKLIST_IDS,
  type Course,
  type SemesterKey,
} from '@/src/data/sampleData';

type SupickState = {
  picklist: Course[];
  hasStarted: boolean;
  selectedSemester: SemesterKey;

  addToPickList: (c: Course) => void;
  removeFromPickList: (id: string) => void;
  clearPickList: () => void;
  fillPickListWithSample: () => void;

  markStarted: () => void;
  resetWelcome: () => void;

  resetAll: () => void;

  setSelectedSemester: (s: SemesterKey) => void;

  // 강의 세부 정보 모달
  selectedCourse: Course | null;
  openCourseDetail: (c: Course) => void;
  closeCourseDetail: () => void;
};

export const useSupickStore = create<SupickState>((set) => ({
  picklist: [],
  hasStarted: false,
  selectedSemester: '26년 1학기',

  addToPickList: (c) =>
    set((state) =>
      state.picklist.find((x) => x.id === c.id)
        ? state
        : { picklist: [...state.picklist, c] },
    ),
  removeFromPickList: (id) =>
    set((state) => ({
      picklist: state.picklist.filter((c) => c.id !== id),
    })),
  clearPickList: () => set({ picklist: [] }),
  fillPickListWithSample: () =>
    set({
      picklist: availableCourses.filter((c) =>
        DEMO_PICKLIST_IDS.includes(c.id),
      ),
    }),

  markStarted: () => set({ hasStarted: true }),
  resetWelcome: () => set({ hasStarted: false }),

  resetAll: () =>
    set({
      picklist: [],
      hasStarted: false,
      selectedSemester: '26년 1학기',
      selectedCourse: null,
    }),

  setSelectedSemester: (s) => set({ selectedSemester: s }),

  selectedCourse: null,
  openCourseDetail: (c) => set({ selectedCourse: c }),
  closeCourseDetail: () => set({ selectedCourse: null }),
}));
