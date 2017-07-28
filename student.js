const WRONG_FORMAT = "WRONG_FORMAT";
const SAVE_SUCCESS = "SAVE_SUCCESS";

function addStudentAchievement() {
    var grades = {
        'math': addGradeForm.math.value,
        'Chinese': addGradeForm.Chinese.value,
        'English': addGradeForm.English.value,
        'Program': addGradeForm.Program.value,
    }
    var input = {
        StudentNo: addGradeForm.StudentNo.value,
        Name: addGradeForm.Name.value,
        grades
    };

    if (!isStudentMatching(input)) {
        Toast(buildStudentInfoPromptString(WRONG_FORMAT),1000);
        return;
    }
    if (addStudentInfo(input)) {
        Toast(buildStudentInfoPromptString(SAVE_SUCCESS),1000);
    }
}

function buildStudentInfoPromptString(type) {
    switch (type) {
        case WRONG_FORMAT:
            return `请按正确的格式输入`;
            break;

        case SAVE_SUCCESS:
            return `学生的成绩已添加`;
            break;

        default:
            return "";
            break;
    }

}

function addStudentInfo(input) {
    let myStore=new Store();
    myStore.add(input);
    return true;
}

function isStudentMatching(input) {
    let result = true;
    for (var item in input.grades) {
        if (isNaN(parseInt(input.grades[item])) || input.grades[item] < 0 || input.grades[item] > 100) {
            result = false;
        }
    }
    return result;
}