import React from "react";
import './styles.css'

export const TableHeader = ({ requestSort, sortConfig }) => {
    // Массив объектов с метками и ключами для заголовков таблицы.
    const tableHeaders = [
        { label: "Имя", key: "firstName" },
        { label: "Фамилия", key: "lastName" },
        { label: "Возраст", key: "age" },
        { label: "Пол", key: "gender" },
        { label: "Номер телефона", key: null },
        { label: "Адрес", key: "address" },
    ];

    // для отображения вида стрелки при сортировке
    const SortArrow = ({ column }) => (
        <span className="sort-icon">
            {column !== sortConfig.key || sortConfig.direction === null
                ? "↓↑"
                : sortConfig.direction === "asc"
                ? "↑"
                : "↓"}
        </span>
    );

    return (
        <thead>
            <tr>
                {tableHeaders.map((header) => (
                    <th key={header.label}>
                        {/* Проверка наличия ключа для сортировки. */}
                        {header.key ? (
                            <label className="head-label" onClick={() => requestSort(header.key)}>
                                <span className="data-name">{header.label}</span>
                                <SortArrow column={header.key} />
                            </label>
                        ) : (
                            <label className="head-label">
                                <span className="data-name">{header.label}</span>
                            </label>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
