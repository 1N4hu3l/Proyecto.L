function showOrders() {
    document.getElementById("ordersTable").style.display = "block";
    document.getElementById("invoicesTable").style.display = "none";
    document.getElementById("documentsSection").style.display = "none";
    document.querySelector(".save-button-container").style.display = "block";
}

function showInvoices() {
    document.getElementById("ordersTable").style.display = "none";
    document.getElementById("invoicesTable").style.display = "block";
    document.getElementById("documentsSection").style.display = "none";
    document.querySelector(".save-button-container").style.display = "none";
}

function showDocuments() {
    document.getElementById("ordersTable").style.display = "none";
    document.getElementById("invoicesTable").style.display = "none";
    document.getElementById("documentsSection").style.display = "block";
    document.querySelector(".save-button-container").style.display = "none";
}

function changeStatus(cell) {
    if (cell.classList.contains("green")) {
        cell.classList.remove("green");
        cell.classList.add("orange");
        cell.textContent = "En proceso";
    } else if (cell.classList.contains("orange")) {
        cell.classList.remove("orange");
        cell.classList.add("lightblue");
        cell.textContent = "Pendiente";
    } else if (cell.classList.contains("lightblue")) {
        cell.classList.remove("lightblue");
        cell.classList.add("green");
        cell.textContent = "Finalizado";
        moveOrderToInvoices(cell);
    }
}

function setCompletionDate(cell) {
    var date = prompt("Ingrese la fecha de finalización (YYYY-MM-DD):");
    if (date) {
        cell.textContent = date;
    }
}

function moveOrderToInvoices(cell) {
    var row = cell.parentNode;
    var table = row.parentNode.parentNode;
    var newRow = table.nextElementSibling.querySelector("tbody").insertRow();
    for (var i = 0; i < row.cells.length; i++) {
        var newCell = newRow.insertCell(i);
        newCell.textContent = row.cells[i].textContent;
    }
    row.parentNode.removeChild(row);
}

function moveInvoiceToOrders(cell) {
    var row = cell.parentNode;
    var table = row.parentNode.parentNode;
    var newRow = table.previousElementSibling.querySelector("tbody").insertRow();
    for (var i = 0; i < row.cells.length; i++) {
        var newCell = newRow.insertCell(i);
        newCell.textContent = row.cells[i].textContent;
    }
    row.parentNode.removeChild(row);
}

function saveOrderChanges() {
    var ordersTable = document.getElementById("ordersTable").querySelector("tbody");
    var invoicesTable = document.getElementById("invoicesTable").querySelector("tbody");

    var rows = ordersTable.querySelectorAll("tr");
    rows.forEach(function (row) {
        var statusCell = row.querySelector(".green, .orange, .lightblue");
        if (statusCell) {
            if (statusCell.classList.contains("green")) {
                // La orden está finalizada, mover a facturas
                var newRow = invoicesTable.insertRow();
                for (var i = 0; i < row.cells.length; i++) {
                    var newCell = newRow.insertCell(i);
                    newCell.textContent = row.cells[i].textContent;
                }
                row.parentNode.removeChild(row);
            } else {
                // La orden está en proceso o pendiente, mantener en órdenes
            }
        }
    });

    alert("Cambios en órdenes guardados correctamente.");
}

function saveInvoiceChanges() {
    var ordersTable = document.getElementById("ordersTable").querySelector("tbody");
    var invoicesTable = document.getElementById("invoicesTable").querySelector("tbody");

    var rows = invoicesTable.querySelectorAll("tr");
    rows.forEach(function (row) {
        var statusCell = row.querySelector(".green, .orange, .lightblue");
        if (statusCell) {
            if (statusCell.classList.contains("green")) {
                // La factura está finalizada, mover a órdenes
                var newRow = ordersTable.insertRow();
                for (var i = 0; i < row.cells.length; i++) {
                    var newCell = newRow.insertCell(i);
                    newCell.textContent = row.cells[i].textContent;
                }
                row.parentNode.removeChild(row);
            } else {
                // La factura está en proceso o pendiente, mantener en facturas
            }
        }
    });

    alert("Cambios en facturas guardados correctamente.");
}
