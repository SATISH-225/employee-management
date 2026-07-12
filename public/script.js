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

    const employee = {

        employeeId: document.getElementById("employeeId").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        designation: document.getElementById("designation").value,
        salary: document.getElementById("salary").value,
        address: document.getElementById("address").value

    };

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

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