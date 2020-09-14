
/*#batch,
#course_name,
#courseid,
#timetable 
*/
/* #batch,
 #course_name,
 #courseid,
 #timetable
   */
/*   0->password
   1->fullname
   2->department
   3->nsut_official_id
   4->courses
   5->research
   4->assignments
   7->grades
   8->students working under you
   */

/* 4 entities, course and array number in object array (here)*/
const current_id = JSON.parse(localStorage.getItem("current_user"));
class my_course_class {
    constructor(batch, course_name, courseid, timetable) {
        this.batch = batch;
        this.course_name = course_name;
        this.courseid = courseid;
        this.timetable = timetable;
    }
}

class UI {
    add_courseToList(course) {
        const list = document.getElementById('course-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${course.batch}</td>
        <td>${course.course_name}</td>
        <td>${course.courseid}</td>
        <td>${course.timetable}</td>
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
        const form = document.querySelector('form#course_form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete_course(target) {
        target.parentElement.parentElement.remove();

    }

    clearFields() {
        document.getElementById('batch').value = '';
        document.getElementById('course_name').value = '';
        document.getElementById('courseid').value = '';
        document.getElementById('timetable').value = '';
    }
}

// Local Storage Class
class Store {
    static get_user_obj() {

        let user_obj = JSON.parse(localStorage.getItem(current_id));
        return user_obj;
    }

    static display_courses() {
        const user_obj = Store.get_user_obj();
        const ui = new UI;
        const courses = user_obj[4];
        const course = new my_course_class;
        for (let i = 0; i < courses.length; i++) {
        course.batch = courses[i][0];
            course.course_name = courses[i][1];
            course.courseid = courses[i][2];
            course.timetable = courses[i][3];
            ui.add_courseToList(course);
        }
    }

    static add_course(course) {
        const user_obj = Store.get_user_obj();
        const arr_to_pushed = [course.batch, course.course_name, course.courseid, course.timetable];
        user_obj[4].push(arr_to_pushed);

        localStorage.setItem(current_id, JSON.stringify(user_obj));
    }
    static check_equal(course1, course2) {
        if ((course1.batch === course2[0]) && (course1.course_name === course2[1]) && (course1.courseid === course2[2]) && (course1.timetable === course2[3])) {
            return true;
        }
        return false;
    }
    static remove_course(course) {
        const user_obj = Store.get_user_obj();


        for (let i = 0; i < user_obj[4].length; i++) {
            if (Store.check_equal(course, user_obj[4][i])) {
                user_obj[4].splice(i, 1);
                break;
            }
        }

        localStorage.setItem(current_id, JSON.stringify(user_obj));

    }
}
// checks if any of mandatory field is null
function check_empty(course) {
    if ((course.batch === '') || (course.course_name === '') || (course.courseid === '') || (course.timetable === '')) {
        return true;
    }
    return false;
}
// check duplicate entry already present in assignemnts
function check_duplicate(courses, course) {

    for (let i = 0; i < courses.length; i++) {
        if (Store.check_equal(course, courses[i])) {
            return true;
        }
    }
    return false;

}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.display_courses);

// Event Listener for add course
document.body.addEventListener('click', function (e) {
    // Get form values
    const ele = e.target;
    e.preventDefault();
    if (ele.id === 'submit') {
        const batch = document.getElementById('batch').value,
            course_name = document.getElementById('course_name').value,
            courseid = document.getElementById('courseid').value,
            timetable = document.getElementById('timetable').value

        // Instantiate book
        const course = new my_course_class(batch, course_name, courseid, timetable);

        // Instantiate UI
        const ui = new UI();

        //console.log(ui);

        // Validate
        if (check_empty(course)) {
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            const user_obj = Store.get_user_obj();
            const courses = user_obj[4];
            if (check_duplicate(courses, course)) {
                ui.showAlert('Duplicate entry will not be added', 'error');
            }
            else {

                // Add assignemnt to list
                ui.add_courseToList(course)

                // Add to LS
                Store.add_course(course)

                // Show success
                ui.showAlert('Course Added!', 'success');

                // Clear fields
                ui.clearFields();
            }
        }
    }
    else if (ele.className === 'delete') {
        // Instantiate UI
        const ui = new UI();

        // remove assignemnt form ui
        ui.delete_course(ele);
        /*#batch,
    #course_name,
    #courseid,
    #timetable 
    */
        // remove course from database
        const timetable_e = ele.parentElement.previousElementSibling;
        const timetable = timetable_e.textContent;

        const courseid_e = timetable_e.previousElementSibling;
        const courseid = courseid_e.textContent;

        const course_name_e = courseid_e.previousElementSibling;
        const course_name = course_name_e.textContent;

        const batch_e = course_name_e.previousElementSibling;
        const batch = batch_e.textContent;

        const course = new my_course_class(batch, course_name, courseid, timetable);
        Store.remove_course(course);

        // Show message
        ui.showAlert('course Removed!', 'success');
    }
});


