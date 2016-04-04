$(document).ready(function () {
//Open Database
    var request = indexedDB.open('customermanager', 1);

    //Success
    request.onsuccess = function (e) {
        console.log('Success: Opened Database');
        db = e.target.result;
        //Show Customers
        showCustomers();
    }
    //Error
    request.onerror = function (e) {
        console.log('Error');

    }

    request.onupgradeneeded = function() {
        var db = e.target.result();

        if(!db.objectStoreName.contains('customers')) {
            var os = db.createObjectStore('customers', {keyPath: "id", autoIncrement:true});
        }
    }


});