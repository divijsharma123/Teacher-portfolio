/*       0->password
         1->fullname
         2->department
         3->nsut_official_id
         4->courses
         5->research
         6->assignments
         7->grades
         8->students working under you
         */

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
    const form = document.querySelector('#signup_in');
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
  // will be used in signup
  /*static adduser() {
   
  }
  */
}

// checks if any of mandatory field is null
function check_empty(user_obj) {
  if ((user_obj.uid === '') || (user_obj.password === '')) {
    return true;
  }
  return false;
}


// DOM Load Event
//document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
//getElementById('signup_in')
document.body.addEventListener('click', function (e) {

  const ele = e.target;
  e.preventDefault();
  if (ele.id === 'signup') {
    // direct to "signup.html" on clicking signup
    setTimeout(function () {
      window.location.href = "signup.html";
    }, 500);
  }

  // do signin
  else if (ele.id === 'signin') { //console.log(ele);
    // store user entered values

    const user_id = document.getElementById('uid').value;
    const password = document.getElementById('password').value;
    //console.log(`${user_id}  ${password}`);
    // user in local storage
    const store_user = Store.getuser(user_id);
    // console.log(store_user);
    // user obj for checking
    const user_obj = new user(user_id, password);

    // UI object
    const ui = new UI();


    // if any of fields are empty
    if (check_empty(user_obj)) {
      ui.showAlert('Please fill in all fields', 'error');
    }

    // if user is not present in database
    else if (store_user == null) {
      ui.showAlert('User does not exists', 'error');
    }

    // user exists 
    else {
      // if password matches
      if (store_user[0][0] === user_obj.password) {
        // set current_user to current user id for check the current user at every stage
        console.log(user_obj.uid);
        localStorage.setItem("current_user", JSON.stringify(user_obj.uid));

        // pop message showing "logging in to home page"
        ui.showAlert('Logging in to the home page', 'success');


        // direct to home page
        setTimeout(function () {
          window.location.href = "home.html";
        }, 2000);

      }
      // password does not match 
      else {
        ui.showAlert('Invalid password', 'error');
      }
    }
  }
});


