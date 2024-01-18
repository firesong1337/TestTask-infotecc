import { useEffect, useState } from "react"
import { searchUsersApi } from "../Api/SearchUsersApi";
import './styles.css'

export const SearchUsers = ({handleSearchedData, setError}) => {
    const [searchQuery, setSearchQuery] = useState('')
    
    useEffect(() => {
        //функция для выполнения запроса к API поиска пользователей.
        const fetchData = async () => {
                const result = await searchUsersApi(searchQuery)
                // Обработка результатов запроса.
                if (result.success) {
                    handleSearchedData(result.data)
                    setError(result.error)
                } else {
                    // Обработка ошибок, если произошла ошибка внутри searchUsersApi.
                    setError(result.error)
                }
        }
        // Вызов fetchData при изменении searchQuery.
        fetchData()

    }, [searchQuery])

    // Обработчик изменения значения в поле поиска.
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }
    
    return (
        <div className="search-ctn">
            <label className="search-desc">Search:</label>
            <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
        </div>
    )
}