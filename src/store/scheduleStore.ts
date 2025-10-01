import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

interface Schedule {
  id: number
  title: string
  date: string
  time: string
}

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [] as Schedule[],
  }),
  actions: {
    addSchedule(schedule: Omit<Schedule, 'id'>) {
      this.schedules.push({ ...schedule, id: Date.now() })
    },
    deleteSchedule(id: number) {
      this.schedules = this.schedules.filter(s => s.id !== id)
    },
  },
  persist: {
    storage: {
      getItem: (key) => Cookies.get(key) || '[]',
      setItem: (key, value) => Cookies.set(key, value, { expires: 30 }),
    },
  },
})
