import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

// Simple helper for "encryption" (Base64 + salt) for demonstration as per plan
const ENCRYPTION_KEY = 'task-buddy-secure-key'
const encrypt = (data) => btoa(JSON.stringify(data) + ENCRYPTION_KEY)
const decrypt = (cipher) => {
    try {
        const decoded = atob(cipher)
        return JSON.parse(decoded.replace(ENCRYPTION_KEY, ''))
    } catch {
        return null
    }
}

export const useTasksStore = defineStore('tasks', () => {
    const savedTasks = localStorage.getItem('task-buddy-tasks')
    const initialTasks = savedTasks ? decrypt(savedTasks) : [
        {
            id: 1,
            title: 'Design the landing page wireframe',
            description: 'Create high-fidelity wireframes for the new marketing landing page using Figma.',
            priority: 'high',
            dueDate: '2026-02-18',
            status: 'done',
        },
        {
            id: 2,
            title: 'Set up CI/CD pipeline',
            description: 'Configure GitHub Actions for automated testing and deployment to staging.',
            priority: 'high',
            dueDate: '2026-02-17',
            status: 'inprogress',
        },
        {
            id: 3,
            title: 'Write unit tests for auth module',
            description: 'Cover login, logout, and token refresh flows with at least 90% coverage.',
            priority: 'medium',
            dueDate: '2026-02-22',
            status: 'todo',
        }
    ]

    const tasks = ref(initialTasks || [])

    // Persist and Encrypt whenever tasks change
    watch(tasks, (newTasks) => {
        localStorage.setItem('task-buddy-tasks', encrypt(newTasks))
    }, { deep: true })

    function updateStatus(id, newStatus) {
        const task = tasks.value.find((t) => t.id === id)
        if (task) {
            task.status = newStatus
        }
    }

    function addTask(task) {
        tasks.value.push({
            id: Date.now(),
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            status: 'todo',
        })
    }

    function deleteTask(id) {
        tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    return { tasks, updateStatus, addTask, deleteTask }
})
