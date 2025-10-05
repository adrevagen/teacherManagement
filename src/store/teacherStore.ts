import { defineStore } from "pinia"

export interface Teacher {
  name: string
  subject: string
}

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    teachers: [] as Teacher[],
  }),
  actions: {
    addTeacher(teacher: Teacher) {
      this.teachers.push(teacher)
    },
    editTeacher(index: number, teacher: Teacher) {
      this.teachers[index] = teacher
    },
    deleteTeacher(index: number) {
      this.teachers.splice(index, 1)
    },
  },
})
