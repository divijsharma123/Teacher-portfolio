
/*#batch,
#title,
#timeline,
#link 
*/
const current_id = JSON.parse(localStorage.getItem("current_user"));
class My_assignment_class {
  constructor(batch, title, timeline, link) {
    this.batch = batch;
    this.title = title;
    this.timeline = timeline;
    this.link = link;
  }
}

class UI {
  add_AssignmentToList(assignment) {
    const list = document.getElementById('assignment-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${assignment.batch}</td>
        <td>${assignment.title}</td>
        <td>${assignment.timeline}</td>
        <td>${assignment.link}</td>
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
    const form = document.querySelector('form#assignment_form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  delete_Assignment(target) {
    target.parentElement.parentElement.remove();

  }

  clearFields() {
    document.getElementById('batch').value = '';
    document.getElementById('title').value = '';
    document.getElementById('timeline').value = '';
    document.getElementById('link').value = '';
  }
}

// Local Storage Class
class Store {
  static get_user_obj() {

    let user_obj = JSON.parse(localStorage.getItem(current_id));
    return user_obj;
  }

  static display_assignments() {
    const user_obj = Store.get_user_obj();
    const ui = new UI;
    const assignments = user_obj[6];
    const assignment = new My_assignment_class;
    for (let i = 0; i < assignments.length; i++) {
    assignment.batch = assignments[i][0];
      assignment.title = assignments[i][1];
      assignment.timeline = assignments[i][2];
      assignment.link = assignments[i][3];
      ui.add_AssignmentToList(assignment);
    }
  }

  static add_Assignment(assignment) {
    const user_obj = Store.get_user_obj();
    const arr_to_pushed = [assignment.batch, assignment.title, assignment.timeline, assignment.link];
    user_obj[6].push(arr_to_pushed);

    localStorage.setItem(current_id, JSON.stringify(user_obj));
  }
  static check_equal(assignment1, assignment2) {
    if ((assignment1.batch === assignment2[0]) && (assignment1.title === assignment2[1]) && (assignment1.timeline === assignment2[2]) && (assignment1.link === assignment2[3])) {
      return true;
    }
    return false;
  }
  static remove_Assignment(assignment) {
    const user_obj = Store.get_user_obj();


    for (let i = 0; i < user_obj[6].length; i++) {
      if (Store.check_equal(assignment, user_obj[6][i])) {
        user_obj[6].splice(i, 1);
        break;
      }
    }

    localStorage.setItem(current_id, JSON.stringify(user_obj));

  }
}
// checks if any of mandatory field is null
function check_empty(assignment) {
  if ((assignment.batch === '') || (assignment.title === '') || (assignment.timeline === '') || (assignment.link === '')) {
    return true;
  }
  return false;
}
// check duplicate entry already present in assignemnts
function check_duplicate(assignments, assignment) {

  for (let i = 0; i < assignments.length; i++) {
    if (Store.check_equal(assignment, assignments[i])) {
      return true;
    }
  }
  return false;

}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.display_assignments);

// Event Listener for add assignment
document.body.addEventListener('click', function (e) {
  // Get form values
  const ele = e.target;
  e.preventDefault();
  if (ele.id === 'submit') {
    const batch = document.getElementById('batch').value,
      title = document.getElementById('title').value,
      timeline = document.getElementById('timeline').value,
      link = document.getElementById('link').value

    // Instantiate Assignment
    const assignment = new My_assignment_class(batch, title, timeline, link);

    // Instantiate UI
    const ui = new UI();

    //console.log(ui);

    // Validate
    if (check_empty(assignment)) {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {

      const user_obj = Store.get_user_obj();
      const assignments = user_obj[6];
      if (check_duplicate(assignments, assignment)) {
        ui.showAlert('Duplicate entry will not be added', 'error');
      }
      else {

        // Add assignemnt to list
        ui.add_AssignmentToList(assignment)

        // Add to LS
        Store.add_Assignment(assignment)

        // Show success
        ui.showAlert('Assignment Added!', 'success');

        // Clear fields
        ui.clearFields();
      }
    }
  }
  else if (ele.className === 'delete') {
    // Instantiate UI
    const ui = new UI();

    // remove assignemnt form ui
    ui.delete_Assignment(ele);
    /*#batch,
#title,
#timeline,
#link 
*/
    // remove assignment from database
    const link_e = ele.parentElement.previousElementSibling;
    const link = link_e.textContent;

    const timeline_e = link_e.previousElementSibling;
    const timeline = timeline_e.textContent;

    const title_e = timeline_e.previousElementSibling;
    const title = title_e.textContent;

    const batch_e = title_e.previousElementSibling;
    const batch = batch_e.textContent;

    const assignment = new My_assignment_class(batch, title, timeline, link);
    Store.remove_Assignment(assignment);

    // Show message
    ui.showAlert('Assignment Removed!', 'success');
  }
});


