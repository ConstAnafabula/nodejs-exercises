function getStudentInfo() {
    const name = "John Doe";
    const course = "Bachelor of Science in Information Technology";
    const learningGoals = [
        "Understand the fundamentals of programming",
        "Learn web development technologies",
        "Gain practical experience through projects"
    ];
    return { name, course, learningGoals };
}

module.exports = getStudentInfo();