import { useState } from "react";
import './CoursesPage.css'

const CoursesPage = () => {
    const [courseData, setCourseData] = useState([
        { name: 'CSE102', enrolled: true },
        { name: 'CSE103', enrolled: false },
        { name: 'CSE104', enrolled: false },
        { name: 'EEE105', enrolled: true },
        { name: 'EEE106', enrolled: false },
        { name: 'EEE107', enrolled: true },
        { name: 'MATH108', enrolled: false },
        { name: 'MATH109', enrolled: true },
        { name: 'MATH110', enrolled: false },
        { name: 'PHY111', enrolled: true },
        { name: 'PHY112', enrolled: false },
        { name: 'PHY113', enrolled: true },
        { name: 'HUM114', enrolled: false },
    ]);


    return (
        <div className="container">
            <h1 className="header">Courses</h1>
            <p className="description">You will find all the courses you need!</p>
            <div className="course-grid">
                {courseData.map(course => (
                    <div key={course.name} className="course-item">
                        <span className="course-name">{course.name}</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={course.enrolled}
                                onChange={() => handleToggleEnrollment(course.name)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
