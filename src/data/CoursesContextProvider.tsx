import React, { useState } from 'react';

import CoursesContext, { Course, Goal } from './course-context';

const CoursesContextProvider: React.FC = props => {
  const [courses, setCourses] = useState<Course[]>([]);

  // To do, import uuid and use that for id

  const addCourse = (title: string, date: Date) => {
    const newCourse: Course = {
      id: Math.random().toString(),
      title,
      enrolled: date,
      goals: [],
      included: true
    };

    setCourses(curCourses => {
      return curCourses.concat(newCourse);
    });
  };

  const addGoal = (courseId: string, text: string) => {
    // because we want to update state based on previous state, we must use a function and copy the previous state to a new variable
    setCourses(curCourses => {
      const newGoal: Goal = {
        id: Math.random().toString(),
        text
      }
      const updatedCourses = [...curCourses]; // copy the in-memory array
      const updatedCourseIndex = updatedCourses.findIndex(course => course.id === courseId);
      const updatedCourseGoals = updatedCourses[updatedCourseIndex].goals.concat(newGoal);
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] }; // copy the in-memory object
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  const deleteGoal = (courseId: string, goalId: string) => {
    setCourses(curCourses => {
      const updatedCourses = [...curCourses]; // copy the in-memory array
      const updatedCourseIndex = updatedCourses.findIndex(course => course.id === courseId);
      const updatedCourseGoals = updatedCourses[updatedCourseIndex].goals.filter(goal => goal.id !== goalId);
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] }; // copy the in-memory object
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    })
  };

  const updateGoal = (courseId: string, goalId:string, newText: string) => {
    setCourses(curCourses => {
      const updatedCourses = [...curCourses]; // copy the in-memory array
      const updatedCourseIndex = updatedCourses.findIndex(course => course.id === courseId);
      const updatedCourseGoals = updatedCourses[updatedCourseIndex].goals.slice();
      const updatedCourseGoalIndex = updatedCourseGoals.findIndex(goal => goal.id === goalId);
      const updatedGoal = { ...updatedCourseGoals[updatedCourseGoalIndex], text: newText };
      updatedCourseGoals[updatedCourseGoalIndex] = updatedGoal;
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] }; // copy the in-memory object
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    })
  };

  const changeCourseFilter = (courseId: string, isIncluded: boolean) => {
    setCourses(curCourses => {
      const updatedCourses = [...curCourses]; // copy the in-memory array
      const updatedCourseIndex = updatedCourses.findIndex(course => course.id === courseId);
  
      const updatedCourse = { ...updatedCourses[updatedCourseIndex], included: isIncluded }; // copy the in-memory object
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    })
  }

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addGoal,
        addCourse,
        deleteGoal,
        updateGoal,
        changeCourseFilter
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
