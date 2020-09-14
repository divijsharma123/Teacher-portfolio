class UI {

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
    const form = document.querySelector('#home_form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}
/*    #profile,
       #courses,
       #research,
       #assignment,
       #students,
       #grade ,
       #logout
*/
document.body.addEventListener('click', function (e) {
  e.preventDefault();
  const ui = new UI();
  const ele = e.target;
  if (ele.id === 'profile') {
    // showing message of directing
    ui.showAlert("directing to profile page", 'success');

    // direct to "profile.html"
    setTimeout(function () {
      window.location.href = "profile.html";
    }, 2000);

  }
  if (ele.id === 'courses') {
    // showing message of directing
    ui.showAlert("directing to courses taught page", 'success');

    // direct to "courses.html"
    setTimeout(function () {
      window.location.href = "courses.html";
    }, 2000);
  }
  if (ele.id === 'research') {
    // showing message of directing
    ui.showAlert("directing to research works page", 'success');

    // direct to "research_works.html"
    setTimeout(function () {
      window.location.href = "research_works.html";
    }, 2000);
  }
  if (ele.id === 'assignment') {
    // showing message of directing
    ui.showAlert("directing to student assignments page", 'success');

    // direct to "assignments.html"
    setTimeout(function () {
      window.location.href = "assignments.html";
    }, 2000);
  }
  if (ele.id === 'grade') {
    // showing message of directing
    ui.showAlert("directing to student grades page", 'success');

    // direct to "student_grades.html"
    setTimeout(function () {
      window.location.href = "student_grades.html";
    }, 2000);
  }
  if (ele.id === 'students') {
    // showing message of directing
    ui.showAlert("directing to students working under me page", 'success');

    // direct to "students_under_me.html"
    setTimeout(function () {
      window.location.href = "students_under_me.html";
    }, 2000);
  }
  if (ele.id === 'logout') {
    // showing message of directing
    ui.showAlert("directing to login page again", 'success');

    // direct to "index_login_signup.html"
    setTimeout(function () {
      window.location.href = "index_login_signup.html";
    }, 2000);
  }
})