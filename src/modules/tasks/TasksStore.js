import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../../api/axios'
import { useAuthStore } from '../auth/AuthStore'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([])
    const authStore = useAuthStore()

    async function fetchTasks() {
        if (!authStore.user?.email) return
        try {
            const response = await api.get(`/tasks?email=${authStore.user.email}`)
            tasks.value = response.data
        } catch (error) {
            console.error('Failed to fetch tasks:', error)
        }
    }

    async function updateStatus(id, newStatus) {
        const task = tasks.value.find((t) => t.id === id)
        if (!task) return
        
        try {
            const updatedTask = { ...task, status: newStatus }
            await api.put(`/tasks/${id}`, updatedTask)
            task.status = newStatus
        } catch (error) {
            console.error('Failed to update task status:', error)
        }
    }

    async function addTask(taskData) {
        if (!authStore.user?.email) return
        try {
            const newTask = {
                title: taskData.title,
                description: taskData.description,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                status: 'todo',
                userEmail: authStore.user.email
            }
            const response = await api.post('/tasks', newTask)
            tasks.value.push(response.data)
        } catch (error) {
            console.error('Failed to add task:', error)
        }
    }

    async function deleteTask(id) {
        try {
            await api.delete(`/tasks/${id}`)
            tasks.value = tasks.value.filter((t) => t.id !== id)
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }

    return { tasks, fetchTasks, updateStatus, addTask, deleteTask }
})
