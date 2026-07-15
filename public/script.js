const API_URL = "/employees";

const form = document.getElementById("employeeForm");
const tableBody = document.getElementById("employeeTable");
const totalEmployees = document.getElementById("totalEmployees");
const search = document.getElementById("search");

let employees = [];

// Load Employees
async function loadEmployees() {
    try {
        const res = await fetch(API_URL);
        employees = await res.json();

        displayEmployees(employees);
        totalEmployees.textContent = employees.length;

    } catch (err) {
        console.error(err);
    }
}

// Display Employees
function displayEmployees(data) {

    tableBody.innerHTML = "";

    data.forEach(emp => {

        tableBody.innerHTML += `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>₹${emp.salary}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee('${emp._id}')">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteEmployee('${emp._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// Add Employee
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const employeeId = document.getElementById("employeeId").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const salary = document.getElementById("salary").value.trim();
    const address = document.getElementById("address").value.trim();

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Phone Validation
    const phonePattern = /^[6-9]\d{9}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        document.getElementById("phone").focus();
        return;
    }

    const employee = {
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        address
    };

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        alert("Employee added successfully!");

        form.reset();

        loadEmployees();

    } catch (err) {

        console.error(err);
        alert("Unable to add employee.");

    }

});

// Delete Employee
async function deleteEmployee(id) {

    if (!confirm("Delete this employee?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadEmployees();

    } catch (err) {

        console.error(err);

    }

}

// Edit Employee
function editEmployee(id) {

    alert("Edit feature can be added later.");

}

// Search
search.addEventListener("keyup", () => {

    const keyword = search.value.toLowerCase();

    const filtered = employees.filter(emp =>

        emp.name.toLowerCase().includes(keyword) ||
        emp.email.toLowerCase().includes(keyword) ||
        emp.department.toLowerCase().includes(keyword)

    );

    displayEmployees(filtered);

});

// Initial Load
loadEmployees();