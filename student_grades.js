

     /*  0->password
         1->fullname
         2->department
         3->nsut_official_id
         4->Grade_attaineds
         5->research
         6->assignments
         7->grades
         8->students working under you
         */
        /*#roll_no,
        #Subject,
        #Grade_attained,
        #assignment
        */
/* 4 entities, commom_object,class_object and array number in object array (here->7)*/
const current_id = JSON.parse(localStorage.getItem("current_user"));
class my_student_grades_class {
    constructor(roll_no, Subject, Grade_attained, assignment) {
        this.roll_no = roll_no;
        this.Subject = Subject;
        this.Grade_attained = Grade_attained;
        this.assignment = assignment;
    }
}

class UI {
    add_gradeToList(grade) {
        const list = document.getElementById('grade-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${grade.roll_no}</td>
        <td>${grade.Subject}</td>
        <td>${grade.Grade_attained}</td>
        <td>${grade.assignment}</td>
        <td><a href="#" class="delete">X<a></td>
      `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('form#grade_form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete_grade(target) {
        target.parentElement.parentElement.remove();

    }

    clearFields() {
        document.getElementById('roll_no').value = '';
        document.getElementById('Subject').value = '';
        document.getElementById('Grade_attained').value = '';
        document.getElementById('assignment').value = '';
    }
}

// Local Storage Class
class Store {
    static get_user_obj() {

        let user_obj = JSON.parse(localStorage.getItem(current_id));
        return user_obj;
    }

    static display_grades() {
        const user_obj = Store.get_user_obj();
        const ui = new UI;
        const grades = user_obj[7];
        const grade = new my_student_grades_class;
        for (let i = 0; i < grades.length; i++) {
            grade.roll_no = grades[i][0];
            grade.Subject = grades[i][1];
            grade.Grade_attained = grades[i][2];
            grade.assignment = grades[i][3];
            ui.add_gradeToList(grade);
        }
    }

    static add_grade(grade) {
        const user_obj = Store.get_user_obj();
        const arr_to_pushed = [grade.roll_no, grade.Subject, grade.Grade_attained, grade.assignment];
        user_obj[7].push(arr_to_pushed);

        localStorage.setItem(current_id, JSON.stringify(user_obj));
    }
    static check_equal(grade1, grade2) {
        if ((grade1.roll_no === grade2[0]) && (grade1.Subject === grade2[1]) && (grade1.Grade_attained === grade2[2]) && (grade1.assignment === grade2[3])) {
            return true;
        }
        return false;
    }
    static remove_grade(grade) {
        const user_obj = Store.get_user_obj();


        for (let i = 0; i < user_obj[7].length; i++) {
            if (Store.check_equal(grade, user_obj[7][i])) {
                user_obj[7].splice(i, 1);
                break;
            }
        }

        localStorage.setItem(current_id, JSON.stringify(user_obj));

    }
}
// checks if any of mandatory field is null
function check_empty(grade) {
    if ((grade.roll_no === '') || (grade.Subject === '') || (grade.Grade_attained === '') || (grade.assignment === '')) {
        return true;
    }
    return false;
}
// check duplicate entry already present in assignemnts
function check_duplicate(grades, grade) {

    for (let i = 0; i < grades.length; i++) {
        if (Store.check_equal(grade, grades[i])) {
            return true;
        }
    }
    return false;

}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.display_grades);

// Event Listener for add grade
document.body.addEventListener('click', function (e) {
    // Get form values
    const ele = e.target;
    e.preventDefault();
    if (ele.id === 'submit') {
        const roll_no = document.getElementById('roll_no').value,
            Subject = document.getElementById('Subject').value,
            Grade_attained = document.getElementById('Grade_attained').value,
            assignment = document.getElementById('assignment').value

        // Instantiate book
        const grade = new my_student_grades_class(roll_no, Subject, Grade_attained, assignment);

        // Instantiate UI
        const ui = new UI();

        //console.log(ui);

        // Validate
        if (check_empty(grade)) {
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            const user_obj = Store.get_user_obj();
            const grades = user_obj[7];
            if (check_duplicate(grades, grade)) {
                ui.showAlert('Duplicate entry will not be added', 'error');
            }
            else {

                // Add assignemnt to list
                ui.add_gradeToList(grade)

                // Add to LS
                Store.add_grade(grade)

                // Show success
                ui.showAlert('grade Added!', 'success');

                // Clear fields
                ui.clearFields();
            }
        }
    }
    else if (ele.className === 'delete') {
        // Instantiate UI
        const ui = new UI();

        // remove assignemnt form ui
        ui.delete_grade(ele);
        /*#roll_no,
    #Subject,
    #Grade_attained,
    #assignment 
    */
        // remove grade from database
        const assignment_e = ele.parentElement.previousElementSibling;
        const assignment = assignment_e.textContent;

        const Grade_attained_e = assignment_e.previousElementSibling;
        const Grade_attained = Grade_attained_e.textContent;

        const Subject_e = Grade_attained_e.previousElementSibling;
        const Subject = Subject_e.textContent;

        const roll_no_e = Subject_e.previousElementSibling;
        const roll_no = roll_no_e.textContent;

        const grade = new my_student_grades_class(roll_no, Subject, Grade_attained, assignment);
        Store.remove_grade(grade);

        // Show message
        ui.showAlert('grade Removed!', 'success');
    }
});


