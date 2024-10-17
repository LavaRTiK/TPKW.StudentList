var students = [];


async function onClick() {
    if (document.querySelector('.toggle-switch .option.active').innerHTML == "Create") {
        var apiUrl = "api/base";
        var f = document.getElementById("firstname");
        var l = document.getElementById("lastname");
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname: f.value, lastname: l.value })
        });
        await getStudents();
        studentListUpdate();
        //const result = await response.json();
    }
    else {
        var holdid = document.getElementById("id");
        var apiUrl = `api/base/${holdid.value}`;
        var f = document.getElementById("firstname");
        var l = document.getElementById("lastname");
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname: f.value, lastname: l.value })
        });
        await getStudents();
        studentListUpdate();
    }
}
async function getStudents() {
    var apiUrl = "api/base";
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    students = data;
}
function studentListUpdate() {
    var ul = document.getElementById("students-list");
    ul.innerHTML = ''; 
    for (var i = 0; i < students.length; i++) {
        var newli = document.createElement("li");
        newli.innerHTML = students[i].id + " " + students[i].firstName + " " + students[i].lastName;
        newli.className = "li-body"
        let student = students[i];
        var editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.className = "btn btn-secondary button-edit"
        editButton.onclick = (e) => {
            console.log(student);
            document.getElementById('id').value = student.id;
            document.getElementById('firstname').value = student.firstName;
            document.getElementById('lastname').value = student.lastName;
            var editbtn = document.getElementById("edit-btn");
            editbtn.click();
        }
        var deletebtn = document.createElement('button');
        deletebtn.innerHTML = "Delete";
        deletebtn.className = "btn btn-danger button-delete"
        deletebtn.onclick = async (e) => {
            var apiUrl = `api/base/${student.id}`;
            const response = await fetch(apiUrl, {
                method: 'DELETE',
            });
            //const data = await response.json();
            await getStudents();
            studentListUpdate();
            
        }
        newli.appendChild(editButton);
        newli.appendChild(deletebtn);
        newli.className = "list-group-item";
        ul.appendChild(newli);
    }
}
