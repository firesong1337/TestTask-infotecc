export const fetchUserData = async () => {
    try {
        // Запрос данных по указанному URL.
        const response = await fetch('https://dummyjson.com/users')
        // Проверка успешности запроса.
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`)
        }
        // Получение данных в формате JSON.
        const data = await response.json()
        // Возвращение объекта с успешным результатом и данными пользователей.
        return { success: true, data: data.users }
    } catch (error) {
        // Обработка ошибок: вывод в консоль и возвращение объекта с ошибкой.
        console.error('Error fetching user data:', error.message)
        return { success: false, error: error.message }
    }
}