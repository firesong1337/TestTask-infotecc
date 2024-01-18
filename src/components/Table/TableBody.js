import React from "react";
import { useState, useEffect } from "react";
import './styles.css'

export const TableBody = ({ tablebodyData, openModal, isModalOpen }) => {
const [selectedRow, setSelectedRow] = useState(null)

// Сброс значения selectedRow при закрытии модального окна
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedRow(null)
    }
  }, [isModalOpen])

// Обработчик клика по строке таблицы.  
const handleRowClick = (index) => {
    setSelectedRow(index)
    //openModal(tablebodyData[index - 1])
    openModal(tablebodyData.find(user => user.id === index));
}
  return (
    <tbody>
      {tablebodyData.map((user) => (
        <tr key={user.id} className={ user.id === selectedRow ? 'selected-row' : ''} onClick={() => handleRowClick(user.id)}>
          {/* Каждая ячейка содержит информацию о пользователе и открывает модальное окно при клике. */}
          <td onClick={() => openModal(user)}>{user.firstName}</td>
          <td onClick={() => openModal(user)}>{user.lastName}</td>
          <td onClick={() => openModal(user)}>{user.age}</td>
          <td onClick={() => openModal(user)}>{user.gender}</td>
          <td onClick={() => openModal(user)}>{user.phone}</td>
          <td>{user.address.city + ", " + user.address.address}</td>
        </tr>
      ))}
    </tbody>
  )
}