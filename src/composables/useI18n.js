import { usePreferencesStore } from '../stores/preferences'

const translations = {
    en: {
        dashboard: 'Dashboard',
        todo: 'To Do',
        inprogress: 'In Progress',
        completed: 'Completed',
        logout: 'Log out',
        proMember: 'Pro Member',
        createTask: 'Create Task',
        searchTasks: 'Search tasks...',
        today: 'Today',
        later: 'Later',
        late: 'Late',
        status: 'Status',
        lastSync: 'Last sync',
        professionalEdition: 'Professional Edition'
    },
    rw: {
        dashboard: 'Dashboard',
        todo: 'Ibigomba Gukorwa',
        inprogress: 'Ibirimo Gukorwa',
        completed: 'Byarangiye',
        logout: 'Sohoka',
        proMember: 'Umunyamuryango wa Pro',
        createTask: 'Andika Umukoro',
        searchTasks: 'Shaka imikoro...',
        today: 'Uyu munsi',
        later: 'Hanyuma',
        late: 'Byatinze',
        status: 'Imiterere',
        lastSync: 'Iheruka kuvugururwa',
        professionalEdition: 'Verisiyo y\'Abanyamwuga'
    }
}

export function useI18n() {
    const preferences = usePreferencesStore()

    const t = (key) => {
        const lang = preferences.language || 'en'
        return translations[lang][key] || key
    }

    return { t }
}
