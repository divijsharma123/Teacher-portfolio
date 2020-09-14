//localStorage.clear();
//"current_user"
class user {
  constructor(uid, password) {
    this.uid = uid;
    this.password = password;
  }
}

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
    const form = document.querySelector('#signup_form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

// Local Storage Class
class Store {

  // for returning user data 
  static getuser(user_id) {
    let store_user;
    if (localStorage.getItem(user_id) == null) {
      return null;
    }
    else {
      store_user = JSON.parse(localStorage.getItem(user_id));
      return store_user;
    }

  }
  // initializing user with array to be stored in local storage
  static initialize_user_in_storage(user_obj) {
    /* 0->password
       1->fullname
       2->department
       3->nsut_official_id
       4->courses
       5->research
       6->assignments
       7->grades
       8->students working under you
       */

    const user_arr = [[user_obj.password], [], [], [], [], [], [], [], []];
    localStorage.setItem(user_obj.uid, JSON.stringify(user_arr));
  }
}

// checks if any of mandatory field is null
function check_empty(user_obj) {
  if ((user_obj.uid === '') || (user_obj.password === '')) {
    return true;
  }
  return false;
}



document.body.addEventListener('click', function (e) {

  const ele = e.target;
  //console.log(ele);
  e.preventDefault();
  if (ele.id === 'signup') {
    // store user entered values
    const user_id = document.getElementById('uid').value;
    const password = document.getElementById('password').value;

    // user obj for checking
    const user_obj = new user(user_id, password);
    //initialize ui element
    const ui = new UI();
    // if any of fields are empty
    if (check_empty(user_obj)) {
      ui.showAlert('Please fill in all fields', 'error');
    }
    else if (localStorage.getItem(user_obj.uid) === null) {
      // set current_user to current user id for check the current user at every stage
      localStorage.setItem("current_user", JSON.stringify(user_obj.uid));

      // adding user info in local storage
      Store.initialize_user_in_storage(user_obj);

      // pop message showing "logging in to home page"
      ui.showAlert('Logging in to the home page', 'success');

      // direct to home page
      setTimeout(function () {
        window.location.href = "home.html";
      }, 2000);
    }
    else{
    ui.showAlert('user already exists , try signing in with different user !!!', 'error');
    }

  }


});


