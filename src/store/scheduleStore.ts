// store/scheduleStore.ts
import { defineStore } from "pinia"

export interface Schedule {
  teacher: string
  subject: string
  day: string
  timeStart: string
  timeEnd: string
}

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [] as Schedule[],
  }),
  actions: {
    addSchedule(schedule: Schedule) {
      this.schedules.push(schedule)
    },
    editSchedule(index: number, schedule: Schedule) {
      this.schedules[index] = schedule
    },
    deleteSchedule(index: number) {
      this.schedules.splice(index, 1)
    },
  },
})
