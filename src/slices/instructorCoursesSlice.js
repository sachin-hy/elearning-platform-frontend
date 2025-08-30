import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "instructorCourses";

const initialState = {
  instructorCourses: localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : [],
};

const instructorCoursesSlice = createSlice({
  name: "instructorCourses",
  initialState,

  reducers: {
    setInstructorCourses(state, action) {
      state.instructorCourses = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    addCourseToInstructorCourses(state, action) {
      const { course } = action.payload;
      state.instructorCourses.push(course);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    removeCourseFromInstructorCourses(state, action) {
      const { courseid } = action.payload;
      const newList = state.instructorCourses.filter(
        (item) => Number(item.courseid) !== Number(courseid)
      );
      state.instructorCourses = newList;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    },

    deleteInstructorCourses(state) {
      state.instructorCourses = [];
      localStorage.removeItem(STORAGE_KEY);
    },

    addSectionToInstructorCourses(state, action) {
      const { courseid, section } = action.payload;
      const courseIndex = state.instructorCourses.findIndex(
        (item) => Number(item.courseid) === Number(courseid)
      );

      if (courseIndex === -1) {
        console.error("Course not found for courseid:", courseid);
        return;
      }

      const course = state.instructorCourses[courseIndex];
      const updatedCourse = {
        ...course,
        courseContent: [...(course.courseContent || []), section],
      };

      state.instructorCourses[courseIndex] = updatedCourse;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    removeSectionFromInstructorCourses(state, action) {
      const { courseid, sectionid } = action.payload;
      const courseIndex = state.instructorCourses.findIndex(
        (item) => Number(item.courseid) === Number(courseid)
      );

      if (courseIndex === -1) {
        console.error("Course not found for courseid:", courseid);
        return;
      }

      const course = state.instructorCourses[courseIndex];
      const updatedCourse = {
        ...course,
        courseContent: (course.courseContent || []).filter(
          (s) => Number(s.id) !== Number(sectionid)
        ),
      };

      state.instructorCourses[courseIndex] = updatedCourse;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    addSubSectionToInstructorCourses(state, action) {
      const { courseid, sectionid, subsection } = action.payload;

      const courseIndex = state.instructorCourses.findIndex(
        (item) => Number(item.courseid) === Number(courseid)
      );
      if (courseIndex === -1) {
        console.error("Course not found for courseid:", courseid);
        return;
      }

      const course = state.instructorCourses[courseIndex];
      const sectionIndex = course.courseContent.findIndex(
        (s) => Number(s.id) === Number(sectionid)
      );
      if (sectionIndex === -1) {
        console.error("Section not found for sectionid:", sectionid);
        return;
      }

      const updatedSection = {
        ...course.courseContent[sectionIndex],
        subSection: [
          ...(course.courseContent[sectionIndex].subSection || []),
          subsection,
        ],
      };

      const updatedCourseContent = [...course.courseContent];
      updatedCourseContent[sectionIndex] = updatedSection;

      state.instructorCourses[courseIndex] = {
        ...course,
        courseContent: updatedCourseContent,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    removeSubSectionFromInstructorCourses(state, action) {
      const { courseid, sectionid, subSectionid } = action.payload;

      const courseIndex = state.instructorCourses.findIndex(
        (item) => Number(item.courseid) === Number(courseid)
      );
      if (courseIndex === -1) {
        console.error("Course not found for courseid:", courseid);
        return;
      }

      const course = state.instructorCourses[courseIndex];
      const sectionIndex = course.courseContent.findIndex(
        (s) => Number(s.id) === Number(sectionid)
      );
      if (sectionIndex === -1) {
        console.error("Section not found for sectionid:", sectionid);
        return;
      }

      const updatedSection = {
        ...course.courseContent[sectionIndex],
        subSection: course.courseContent[sectionIndex].subSection.filter(
          (sub) => Number(sub.id) !== Number(subSectionid)
        ),
      };

      const updatedCourseContent = [...course.courseContent];
      updatedCourseContent[sectionIndex] = updatedSection;

      state.instructorCourses[courseIndex] = {
        ...course,
        courseContent: updatedCourseContent,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },

    updateSubSectionFromInstructorCourses(state, action) {
      const { courseid, sectionid, subsectionid, newsubsection } = action.payload;

      const courseIndex = state.instructorCourses.findIndex(
        (item) => Number(item.courseid) === Number(courseid)
      );
      if (courseIndex === -1) {
        console.error("Course not found for courseid:", courseid);
        return;
      }

      const course = state.instructorCourses[courseIndex];
      const sectionIndex = course.courseContent.findIndex(
        (s) => Number(s.id) === Number(sectionid)
      );
      if (sectionIndex === -1) {
        console.error("Section not found for sectionid:", sectionid);
        return;
      }

      const updatedSubSections =
        course.courseContent[sectionIndex].subSection?.map((sub) =>
          Number(sub.id) === Number(subsectionid) ? newsubsection : sub
        ) || [];

      const updatedSection = {
        ...course.courseContent[sectionIndex],
        subSection: updatedSubSections,
      };

      const updatedCourseContent = [...course.courseContent];
      updatedCourseContent[sectionIndex] = updatedSection;

      state.instructorCourses[courseIndex] = {
        ...course,
        courseContent: updatedCourseContent,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.instructorCourses));
    },
  },
});

export const {
  setInstructorCourses,
  addCourseToInstructorCourses,
  removeCourseFromInstructorCourses,
  deleteInstructorCourses,
  addSectionToInstructorCourses,
  removeSectionFromInstructorCourses,
  addSubSectionToInstructorCourses,
  removeSubSectionFromInstructorCourses,
  updateSubSectionFromInstructorCourses,
} = instructorCoursesSlice.actions;

export default instructorCoursesSlice.reducer;
