// A $( document ).ready() block.
$( document ).ready(function() {
    $(".table-row").click(function() {
        openEditModal();
        var $row = $(this).closest("tr");    // Find the row
        var $userID = $row.find(".userID").text(); // Find the userID of current row
        var $fname = $row.find(".fname").text(); // Find the fname of current row
        var $surname = $row.find(".surname").text(); // Find the surname of current row
        var $deptID = $row.find(".deptID").text(); // Find the deptID of current row
        var $email = $row.find(".email").text(); // Find the email of current row
        var $telephone = $row.find(".telephone").text(); // Find the telephone of current row

        $(".modal-body #userID-modal").val($userID);
        $(".modal-body #fname-modal").val($fname);
        $(".modal-body #surname-modal").val($surname);
        $(".modal-body #email-modal").val($email);
        $(".modal-body #telephone-modal").val($telephone);
        $(".modal-body #dept-modal").val($deptID);
    });

    $('#extra').hide();
    $('#dept-add').change(function() {
        let val = $('#dept-add').val();
        switch(val){
            case '1':
                $('#extra').hide();
                break;
            case '2':
                $('#extra').hide();
                break;
            case '3':
                $('#extra').hide();
                break;
            case '4':
                $('#extra').hide();
                break;
            case '5':
                $('#extra').hide();
                break;
            case '6':
                $('#extra').hide();
                break;
            case '7':
                $('#extra').show();
                break;
            case '8':
                $('#extra').hide();
                break;
            case '9':
                $('#extra').hide();
                break;
        }
    });


});

function searchUser() {
    // This searches for user based on what is in the search box
    searchFilter = document.getElementById("searchFilter");
    
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("userDataTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[searchFilter.value];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function editUserDetails(){
    //console.log($('#editForm').serialize());
    $.ajax({
        url: "/manage-users/editUserDetails",
        type: "POST",
        dataType: "json",
        data: $('#editForm').serialize(),
        success: function(returned) {
             console.log(returned);
        },
        error: function() {

        }
    });
    window.location.reload()
}

function removeUser(){
    $('#editUserModal').modal('hide');
    $.ajax({
        url: "/manage-users/removeUser",
        type: "POST",
        dataType: "json",
        data: $('#editForm').serialize(),
        success: function(returned) {
             console.log(returned);
        },
        error: function() {
        }
    });
    window.location.reload()
}

function addNewUser(){
    let checked = [];
    $('input:checked').each(function(){
        checked.push($(this).val());
    });
    alert(checked.toString());
    $.ajax({
        url: "/manage-users/addNewUser",
        type: "POST",
        dataType: "json",
        data: $('#addForm').serialize(),
        success: function(returned) {
             console.log(returned);
        },
        error: function() {
        }
    });

    $.ajax({
        url: "/manage-users/addProblemTags",
        type: "POST",
        dataType: "json",
        success: function(returned) {
             console.log(returned);
        },
        error: function() {
        }
    });
    //window.location.reload()
}

function openEditModal(){
    $('#editUserModal').modal('show');

}

function openAddModal(){
    $('#addNewUserModal').modal('show');

}