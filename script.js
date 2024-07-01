const form = document.getElementById('register-form');
const recordsTable = document.getElementById('records-table');
const recordsTbody = document.getElementById('records-tbody');

let students = [];
let editingIndex = -1;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contact-no').value;

    if (studentName && studentId && email && contactNo) {
        const newStudent = {
            name: studentName,
            id: studentId,
            email: email,
            contactNo: contactNo,
        };

        if (editingIndex > -1) {
            students[editingIndex] = newStudent;
            editingIndex = -1;
        } else {
            students.push(newStudent);
        }

        localStorage.setItem('students', JSON.stringify(students));
        displayRecords();
        form.reset();
    }
});

function displayRecords() {
    recordsTbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contactNo}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        recordsTbody.appendChild(row);
    });
}

recordsTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.getAttribute('data-index');
        editStudent(index);
    } else if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deleteStudent(index);
    }
});

function editStudent(index) {
    const student = students[index];
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact-no').value = student.contactNo;
    editingIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayRecords();
}

window.addEventListener('load', () => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        displayRecords();
    }
});

displayRecords();
