/*#fullname,
#uid,
#password,
#department,
#nsutid 
*/

    /*   0->password
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
    constructor(fullname, uid, password, department, nsutid) {
        this.fullname = fullname;
        this.uid = uid;
        this.password = password;
        this.department=department;
        this.nsutid=nsutid;
    }
}
// global array for matching values
const check_user=new user('','','','','');

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
        const form = document.querySelector('#profile_form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    
    display_form()
  {   // current_id logged in person
    
      const current_id=JSON.parse(localStorage.getItem("current_user"));
        // getting object from store
        const store_obj=Store.getuser(current_id);
        // initialize values with stored values
      document.getElementById('password').value=store_obj[0][0];
      check_user.password=store_obj[0][0];

      document.getElementById('uid').value=current_id;
      check_user.uid=current_id;

      if(store_obj[1].length==1)
      {
      document.getElementById('fullname').value=store_obj[1][0];
      check_user.fullname=store_obj[1][0];
      }

      if(store_obj[2].length==1)
      {
      document.getElementById('department').value=store_obj[2][0];
      check_user.department=store_obj[2][0];
      }
      if(store_obj[3].length==1)
      {
      document.getElementById('nsutid').value=store_obj[3][0];
      check_user.nsutid=store_obj[3][0];
      }

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
    
}

// initilizing form with stored values
const ui=new UI();
ui.display_form();
console.log(check_user);
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
    if (ele.id === 'submit') {

     // store user entered values

     const Fullname = document.getElementById('fullname').value;
     const user_id = document.getElementById('uid').value;
     const Password = document.getElementById('password').value;
     const Dept = document.getElementById('department').value;
     const Nsutid= document.getElementById('nsutid').value;
     
     // user_object
     const user_obj = new user(Fullname,user_id,Password,Dept,Nsutid);

     // if any of uid or password is empty
     if (check_empty(user_obj)) {
        ui.showAlert('Any of REGISTERED EMAIL or PASSWORD CAN NOT BE EMPTY', 'error');
    }
     
    // set all the fields and update database
    else {/*0->password
        1->fullname
        2->department
        3->nsut_official_id
        */
        // no need to delete the id ,set new id with these new values and change current user to new user 
        if(check_user.uid===user_obj.uid)
        {
           const new_obj=Store.getuser(check_user.uid);
           new_obj[0][0]=user_obj.password;
           new_obj[1][0]=user_obj.fullname;
           new_obj[2][0]=user_obj.department;
           new_obj[3][0]=user_obj.nsutid;
           localStorage.setItem(check_user.uid,JSON.stringify(new_obj));
           ui.showAlert("personal information updated!",'success');
        }

        else{
            const new_obj=Store.getuser(check_user.uid);
            localStorage.removeItem(check_user.uid);
            
            new_obj[0][0]=user_obj.password;
            new_obj[1][0]=user_obj.fullname;
            new_obj[2][0]=user_obj.department;
            new_obj[3][0]=user_obj.nsutid;

            localStorage.setItem(user_obj.uid,JSON.stringify(new_obj));
            localStorage.setItem("current_user",JSON.stringify(user_obj.uid));
            ui.showAlert("personal information updated!",'success');

        }
    }
}
    
 
});


