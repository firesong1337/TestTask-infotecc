export const searchUsersApi = async (searchQuery) => {
    try {
        // Отправка запроса по указанному URL для поиска пользователей.
        const response = await fetch(`https://dummyjson.com/users/search?q=${searchQuery}`)

        // Проверка успешности запроса.
        if (!response.ok) {
            throw new Error(`Failed to search users. Status: ${response.status}`)
        }
        // Получение данных в формате JSON.
        const data = await response.json()
        // Проверка наличия пользователей в результатах поиска.
        if (data.total === 0) {
            // Возвращение объекта с пустым массивом данных и сообщением о том, что пользователи не найдены.
            return {success: true, data: [], error: 'No users found'}
        }
        // Возвращение объекта с успешным результатом и данными найденных пользователей.
        return { success: true, data: data.users }
    } catch (error) {
        // Обработка ошибок: вывод в консоль и возвращение объекта с ошибкой.
        console.error('Error searching users:', error.message)
        return { success: false, error: error.message }
    }
}