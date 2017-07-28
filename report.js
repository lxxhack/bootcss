const WRONG_FORMAT = "WRONG_FORMAT";

function buildReport() {debugger;
    let input=queryGradeForm.StudentNo.value;
    let myStore = new Store();
    let student = [];
    if (input==''){
        student=myStore.getAll();
        if (student==undefined){
            return;
        }
    }
    else {
        input=input.trim();
        input=input.split(',');
        if (!isReportMatching(input)) {
            alert(buildStudentSequencePromptString(WRONG_FORMAT));
            return;
        }
        for (let item of input) {
            let one = myStore.get(item);
            if (one != undefined) {
                student.push(one);
            }
        }
    }
    generateReport(student);
}

function buildStudentSequencePromptString(type) {
    switch (type) {
        case WRONG_FORMAT:
            return `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
            break;
        default:
            break;
    }
}

function generateReport(input) {
    let report=[];
    for (let item of input){
        let student=generateReportItem(item);
        if (student!=undefined){
            report.push(student);
        }
    }
    if (report!=undefined){
        for (let item of report){
            $('#gradeTable').append(`<tr></tr><td>${item.StudentNo}</td><td>${item.Name}</td><td>${item.grades['math']}
</td><td>${item.grades['Chinese']}</td><td>${item.grades['English']}</td><td>${item.grades['Program']}
</td><td>${item.total}</td><td>${item.average}</td>
<td><input type="button" class="btn btn-success" value="修改" onclick="alter('gradeTable',this)"/><input type="button" class="btn btn-danger" value="删除" onclick="del('gradeTable',this)"/></td><tr/>`);
        }
    }
}

function calculateScore(student) {
    let grades = student.grades;
    let total = 0;
    let n=0;
    for (let item in grades){
        total+=parseFloat(grades[item]);
        n+=1;
    }
    student.total = total;
    student.average = total / n;
    return student;
}

function generateReportItem(input) {
    let student = calculateScore(input);
    return student;
}

function isReportMatching(input) {
    for (item of input){
        if (isNaN(parseInt(item))){
            return false;
        }
    }
    return true;
}

function del(id,obj) {
    let rowIndex = obj.parentElement.parentElement.rowIndex;
    let myStore=new Store();
    myStore.del(document.getElementById(id).rows[rowIndex].cells[0].innerHTML);
    document.getElementById(id).deleteRow(rowIndex);
}

function alter(id,obj) {
    let myStore=new Store();
    if (obj.value==='修改'){
        obj.value='完成';
    }
    else{
        let rowIndex = obj.parentElement.parentElement.rowIndex;
        let grades={math:document.getElementById(id).rows[rowIndex].cells[2].innerHTML,
            Chinese:document.getElementById(id).rows[rowIndex].cells[3].innerHTML,
            English:document.getElementById(id).rows[rowIndex].cells[4].innerHTML,
            Program:document.getElementById(id).rows[rowIndex].cells[5].innerHTML}
        let student={
            StudentNo:document.getElementById(id).rows[rowIndex].cells[0].innerHTML,
            Name:'123',//document.getElementById(id).rows[rowIndex].cells[1].innerHTML,
            grades
        }
        myStore.alter(student);
        obj.value='修改';
    }
}