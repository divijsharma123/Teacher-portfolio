        /*#roll_no,
        #Course_enrolled,
        #project,
        #Specialized_skills
        */
       /* 4 entities, class_object , term and array number in object array (here->8)*/
       const current_id = JSON.parse(localStorage.getItem("current_user"));
class my_student_works_class {
    constructor(roll_no, Course_enrolled, project, Specialized_skills) {
        this.roll_no = roll_no;
        this.Course_enrolled = Course_enrolled;
        this.project = project;
        this.Specialized_skills = Specialized_skills;
    }
}

class UI {
    add_studentToList(student) {
        const list = document.getElementById('student-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${student.roll_no}</td>
        <td>${student.Course_enrolled}</td>
        <td>${student.project}</td>
        <td>${student.Specialized_skills}</td>
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
        const form = document.querySelector('form#student_form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete_student(target) {
        target.parentElement.parentElement.remove();

    }

    clearFields() {
        document.getElementById('roll_no').value = '';
        document.getElementById('Course_enrolled').value = '';
        document.getElementById('project').value = '';
        document.getElementById('Specialized_skills').value = '';
    }
}

// Local Storage Class
class Store {
    static get_user_obj() {

        let user_obj = JSON.parse(localStorage.getItem(current_id));
        return user_obj;
    }

    static display_students() {
        const user_obj = Store.get_user_obj();
        const ui = new UI;
        const students = user_obj[8];
        const student = new my_student_works_class;
        for (let i = 0; i < students.length; i++) {
            student.roll_no = students[i][0];
            student.Course_enrolled = students[i][1];
            student.project = students[i][2];
            student.Specialized_skills = students[i][3];
            ui.add_studentToList(student);
        }
    }

    static add_student(student) {
        const user_obj = Store.get_user_obj();
        const arr_to_pushed = [student.roll_no, student.Course_enrolled, student.project, student.Specialized_skills];
        user_obj[8].push(arr_to_pushed);

        localStorage.setItem(current_id, JSON.stringify(user_obj));
    }
    static check_equal(student1, student2) {
        if ((student1.roll_no === student2[0]) && (student1.Course_enrolled === student2[1]) && (student1.project === student2[2]) && (student1.Specialized_skills === student2[3])) {
            return true;
        }
        return false;
    }
    static remove_student(student) {
        const user_obj = Store.get_user_obj();


        for (let i = 0; i < user_obj[8].length; i++) {
            if (Store.check_equal(student, user_obj[8][i])) {
                user_obj[8].splice(i, 1);
                break;
            }
        }

        localStorage.setItem(current_id, JSON.stringify(user_obj));

    }
}
// checks if any of mandatory field is null
function check_empty(student) {
    if ((student.roll_no === '') || (student.Course_enrolled === '') || (student.project === '') || (student.Specialized_skills === '')) {
        return true;
    }
    return false;
}
// check duplicate entry already present in assignemnts
function check_duplicate(students, student) {

    for (let i = 0; i < students.length; i++) {
        if (Store.check_equal(student, students[i])) {
            return true;
        }
    }
    return false;

}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.display_students);

// Event Listener for add student
document.body.addEventListener('click', function (e) {
    // Get form values
    const ele = e.target;
    e.preventDefault();
    if (ele.id === 'submit') {
        const roll_no = document.getElementById('roll_no').value,
            Course_enrolled = document.getElementById('Course_enrolled').value,
            project = document.getElementById('project').value,
            Specialized_skills = document.getElementById('Specialized_skills').value

        // Instantiate book
        const student = new my_student_works_class(roll_no, Course_enrolled, project, Specialized_skills);

        // Instantiate UI
        const ui = new UI();

        //console.log(ui);

        // Validate
        if (check_empty(student)) {
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            const user_obj = Store.get_user_obj();
            const students = user_obj[8];
            if (check_duplicate(students, student)) {
                ui.showAlert('Duplicate entry will not be added', 'error');
            }
            else {

                // Add assignemnt to list
                ui.add_studentToList(student)

                // Add to LS
                Store.add_student(student)

                // Show success
                ui.showAlert('student Added!', 'success');

                // Clear fields
                ui.clearFields();
            }
        }
    }
    else if (ele.className === 'delete') {
        // Instantiate UI
        const ui = new UI();

        // remove assignemnt form ui
        ui.delete_student(ele);
        /*#roll_no,
    #Course_enrolled,
    #project,
    #Specialized_skills 
    */
        // remove student from database
        const Specialized_skills_e = ele.parentElement.previousElementSibling;
        const Specialized_skills = Specialized_skills_e.textContent;

        const project_e = Specialized_skills_e.previousElementSibling;
        const project = project_e.textContent;

        const Course_enrolled_e = project_e.previousElementSibling;
        const Course_enrolled = Course_enrolled_e.textContent;

        const roll_no_e = Course_enrolled_e.previousElementSibling;
        const roll_no = roll_no_e.textContent;

        const student = new my_student_works_class(roll_no, Course_enrolled, project, Specialized_skills);
        Store.remove_student(student);

        // Show message
        ui.showAlert('student Removed!', 'success');
    }
});


