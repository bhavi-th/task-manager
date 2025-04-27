import React, { useState } from "react";
import {
    startOfMonth,
    startOfWeek,
    addDays,
    format,
    subMonths,
    addMonths,
} from "date-fns";
import "./Calendar.css";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMonthModal, setShowMonthModal] = useState(false);
    const [showYearModal, setShowYearModal] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from(
        { length: 20 },
        (_, i) => new Date().getFullYear() - 10 + i
    ); // Generate 20 years around the current year

    const selectMonth = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setShowMonthModal(false);
    };

    const selectYear = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setShowYearModal(false);
    };

    const renderHeader = () => {
        return (
            <div className="calendar-header">
                <button className="arrow-left" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                    ←
                </button>
                <span className="header-title">
                    {format(currentDate, "MMMM yyyy")}
                </span>
                <button className="arrow-right" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                    →
                </button>
            </div>
        );
    };


    const renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days.map((day, index) => <div key={index}>{day}</div>);
    };

    const renderDates = () => {
        const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
        const dates = [];

        for (let i = 0; i < 42; i++) {
            dates.push(new Date(addDays(startDate, i)));
        }

        return dates.map((date, index) => (
            <div
                key={index}
                className={date.getMonth() === currentDate.getMonth() ? "current-month" : "other-month"}
            >
                {format(date, "d")}
            </div>
        ));
    };

    return (
        <div className="calendar">
            {renderHeader()}
            <div className="days">{renderDays()}</div>
            <div className="dates">{renderDates()}</div>

            {/* Month Modal */}
            {showMonthModal && (
                <div className="modal">
                    {months.map((month, index) => (
                        <div key={index} onClick={() => selectMonth(index)}>
                            {month}
                        </div>
                    ))}
                </div>
            )}

            {/* Year Modal */}
            {showYearModal && (
                <div className="modal">
                    {years.map((year, index) => (
                        <div key={index} onClick={() => selectYear(year)}>
                            {year}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;
