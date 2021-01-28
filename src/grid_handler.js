function initialize_grid() {
    let customers = new Array();
        customers.push(["Customer Id", "Name", "Country"]);
        customers.push([1, "John Hammond", "United States"]);
        customers.push([2, "Mudassar Khan", "India"]);
        customers.push([3, "Suzanne Mathews", "France"]);
        customers.push([4, "Robert Schidner", "Russia"]);
 
        //Create a HTML Table element.
        let table = document.createElement("TABLE");
        table.border = "1";
 
        //Get the count of columns.
        let columnCount = customers[0].length;
 
        //Add the header row.
        let row = table.insertRow(-1);
        for (let i = 0; i < columnCount; i++) {
            let headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (let i = 1; i < customers.length; i++) {
            row = table.insertRow(-1);
            for (let j = 0; j < columnCount; j++) {
                let cell = row.insertCell(-1);
                cell.innerHTML = customers[i][j];
            }
        }
 
        let dvTable = document.getElementById("dvTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
}