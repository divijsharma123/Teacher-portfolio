

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
/*#research_field,
#project,
#link,
#org 
*/
/* 4 entities, class_object and array number in object array (here->5)*/
const current_id = JSON.parse(localStorage.getItem("current_user"));
class my_research_works_class {
    constructor(research_field, project, link, org) {
        this.research_field = research_field;
        this.project = project;
        this.link = link;
        this.org = org;
    }
}

class UI {
    add_researchToList(research) {
        const list = document.getElementById('research-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${research.research_field}</td>
        <td>${research.project}</td>
        <td>${research.link}</td>
        <td>${research.org}</td>
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
        const form = document.querySelector('form#research_form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete_research(target) {
        target.parentElement.parentElement.remove();

    }

    clearFields() {
        document.getElementById('research_field').value = '';
        document.getElementById('project').value = '';
        document.getElementById('link').value = '';
        document.getElementById('org').value = '';
    }
}

// Local Storage Class
class Store {
    static get_user_obj() {

        let user_obj = JSON.parse(localStorage.getItem(current_id));
        return user_obj;
    }

    static display_researchs() {
        const user_obj = Store.get_user_obj();
        const ui = new UI;
        const researchs = user_obj[5];
        const research = new my_research_works_class;
        for (let i = 0; i < researchs.length; i++) {
            research.research_field = researchs[i][0];
            research.project = researchs[i][1];
            research.link = researchs[i][2];
            research.org = researchs[i][3];
            ui.add_researchToList(research);
        }
    }

    static add_research(research) {
        const user_obj = Store.get_user_obj();
        const arr_to_pushed = [research.research_field, research.project, research.link, research.org];
        user_obj[5].push(arr_to_pushed);

        localStorage.setItem(current_id, JSON.stringify(user_obj));
    }
    static check_equal(research1, research2) {
        if ((research1.research_field === research2[0]) && (research1.project === research2[1]) && (research1.link === research2[2]) && (research1.org === research2[3])) {
            return true;
        }
        return false;
    }
    static remove_research(research) {
        const user_obj = Store.get_user_obj();


        for (let i = 0; i < user_obj[5].length; i++) {
            if (Store.check_equal(research, user_obj[5][i])) {
                user_obj[5].splice(i, 1);
                break;
            }
        }

        localStorage.setItem(current_id, JSON.stringify(user_obj));

    }
}
// checks if any of mandatory field is null
function check_empty(research) {
    if ((research.research_field === '') || (research.project === '') || (research.link === '') || (research.org === '')) {
        return true;
    }
    return false;
}
// check duplicate entry already present in assignemnts
function check_duplicate(researchs, research) {

    for (let i = 0; i < researchs.length; i++) {
        if (Store.check_equal(research, researchs[i])) {
            return true;
        }
    }
    return false;

}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.display_researchs);

// Event Listener for add research
document.body.addEventListener('click', function (e) {
    // Get form values
    const ele = e.target;
    e.preventDefault();
    if (ele.id === 'submit') {
        const research_field = document.getElementById('research_field').value,
            project = document.getElementById('project').value,
            link = document.getElementById('link').value,
            org = document.getElementById('org').value

        // Instantiate book
        const research = new my_research_works_class(research_field, project, link, org);

        // Instantiate UI
        const ui = new UI();

        //console.log(ui);

        // Validate
        if (check_empty(research)) {
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            const user_obj = Store.get_user_obj();
            const researchs = user_obj[5];
            if (check_duplicate(researchs, research)) {
                ui.showAlert('Duplicate entry will not be added', 'error');
            }
            else {

                // Add assignemnt to list
                ui.add_researchToList(research)

                // Add to LS
                Store.add_research(research)

                // Show success
                ui.showAlert('research Added!', 'success');

                // Clear fields
                ui.clearFields();
            }
        }
    }
    else if (ele.className === 'delete') {
        // Instantiate UI
        const ui = new UI();

        // remove assignemnt form ui
        ui.delete_research(ele);
        /*#research_field,
    #project,
    #link,
    #org 
    */
        // remove research from database
        const org_e = ele.parentElement.previousElementSibling;
        const org = org_e.textContent;

        const link_e = org_e.previousElementSibling;
        const link = link_e.textContent;

        const project_e = link_e.previousElementSibling;
        const project = project_e.textContent;

        const research_field_e = project_e.previousElementSibling;
        const research_field = research_field_e.textContent;

        const research = new my_research_works_class(research_field, project, link, org);
        Store.remove_research(research);

        // Show message
        ui.showAlert('research Removed!', 'success');
    }
});


