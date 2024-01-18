import React from "react";
import './styles.css'

export const UserModal = ({ user, closeModal }) => {
    return (
        <dialog className="user-modal" open>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Информация о пользователе: </h2>
                {renderInfo("Имя", user.firstName)}
                {renderInfo("Фамилия", user.lastName)}
                {renderInfo("Возраст", user.age)}
                {renderInfo("Адрес", `${user.address.city}, ${user.address.address}`)}
                {renderInfo("Рост", user.height)}
                {renderInfo("Вес", user.weight)}
                {renderInfo("Номер телефона", user.phone)}
                {renderInfo("Email", user.email)}
            </div>
        </dialog>
    );
};
// отображает информацию о пользователе в модальном окне.
const renderInfo = (label, value) => (
    <div className="user-modal-desc" key={label}>
        <span>{label}:</span>
        <p>{value}</p>
    </div>
)
