import React, { useEffect, useState } from "react";
import './styles.css';
import { SearchUsers } from "./Search/SearchUsers";
import { TableHeader } from "./Table/TableHeader";
import { fetchUserData } from "./Api/Users";
import {ErrorDisplay} from "./ErrorHandling/ErrorDisplay"
import { TableBody } from "./Table/TableBody";
import {UserModal} from "./Modal/UserModal"

export const MasterComponent = () => {
    const [userData, setUserData] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
    const [error, setError] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false)
// Функция для открытия модального окна с информацией о пользователе.
    const openModal = (user) => {
        setSelectedUser(user)
        setModalOpen(true)
    };
// Функция для закрытия модального окна
    const closeModal = () => {
        setSelectedUser(null)
        setModalOpen(false)
    };
    
// Эффект для загрузки данных при монтировании компонента.
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUserData()
            if (result.success) {
                setUserData(result.data)
            } else {
                setError(result.error)
            }
        };

        fetchData();
    }, [])
// Обработчик для обновления данных при поиске пользователей.
    const handleSearchedData = (value) => {
        setUserData(value)
    }
// Обработчик для сортировки таблицы.
    const requestSort = (key) => {
        let direction = 'asc'
    
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc'
            } else if (sortConfig.direction === 'desc') {
                direction = null
            }
        }
        setSortConfig({ key, direction })
    }
// Функция для сортировки данных пользователей.
    const sortedData = () => {
        let sortableData = [...userData]
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => compareValues(a, b, sortConfig))
        }
        return sortableData
    }
    
    return (
        <>
            <h2>Тестовое задание infotecs</h2>
            {error && <ErrorDisplay message={error}/>}
            <SearchUsers handleSearchedData={handleSearchedData} setError={setError} initialData={userData}/>
            <table>
                <TableHeader requestSort={requestSort} sortConfig={sortConfig} />
                <TableBody tablebodyData={sortedData()} openModal={openModal} isModalOpen={isModalOpen} />
            </table>
            {isModalOpen && <UserModal user={selectedUser} closeModal={closeModal} />}
        </>
    )
}
// Функция для сравнения значений при сортировке.
const compareValues = (a, b, sortConfig) => {
    const aValue = sortConfig.key === 'address' ? a.address.city : a[sortConfig.key]
    const bValue = sortConfig.key === 'address' ? b.address.city : b[sortConfig.key]

    if (aValue < bValue) {
        return sortConfig.direction === 'desc' ? 1 : -1
    }
    if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
}