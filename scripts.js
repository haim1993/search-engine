// JSON using AJAX
$.getJSON("generated.json", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push("<tr id='" + key + "'>");
        items.push("<td>" + (key) + "</td>");
        items.push("<td>" + val.isActive + "</td>");
        items.push("<td>" + val.age + "</td>");
        items.push("<td>" + val.eyeColor + "</td>");
        items.push("<td>" + val.name + "</td>");
        items.push("<td>" + val.gender + "</td>");
        items.push("<td>" + val.company + "</td>");
        items.push("<td>" + val.email + "</td>");
        items.push("<td>" + val.phone + "</td>");
        items.push("<td class='icon-pencil text-center' onClick='tablehide'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></td>");
        items.push("</tr>");
    });
    $("<tbody/>", {
        html: items.join("")
    }).appendTo("table");
});
// end


$(document).ready(function() {
    // Click on pencil icon:
    // When user clicks on "pencil icon", the data in the row is copied to the USER-EDIT-WINDOW.
    $('#table-info').on('click', '.icon-pencil', function() {
        // Animation
        $('#table-info').slideUp();
        $('#column-info').slideDown();

        var $id = $(this).parent().attr('id');
        $("#_id").val($id);

        var $active = $(this).parent().children().eq(1).text();
        ($active === 'true') ? $("#isActive option[value='true']").attr("selected", true): $("#isActive option[value='false']").attr("selected", true);
        var $age = $(this).parent().children().eq(2).text();
        $("#age").val($age);
        var $eyecolor = $(this).parent().children().eq(3).text(); {
            if ($eyecolor === 'blue') {
                $("#eyeColor option[value='blue']").attr("selected", true)
            } else if ($eyecolor === 'brown') {
                $("#eyeColor option[value='brown']").attr("selected", true);
            } else {
                $("#eyeColor option[value='green']").attr("selected", true);
            }
        }
        var $name = $(this).parent().children().eq(4).text();
        $("#name").val($name);
        var $gender = $(this).parent().children().eq(5).text();
        ($gender === 'female') ? $("#gender-female").attr('checked', 'checked'): $("#gender-male").attr('checked', 'checked');
        var $company = $(this).parent().children().eq(6).text();
        $("#company").val($company);
        var $email = $(this).parent().children().eq(7).text();
        $("#email").val($email);
        var $phone = $(this).parent().children().eq(8).text();
        $("#phone").val($phone);
    });
    // end


    // Email Validation - Use or regular expressions (regex)
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validate() {
        var email = $("#email").val();
        if (validateEmail(email)) {
            // Get updated values
            var $_id = $("#_id").val();
            var $active = $("#isActive").val();
            var $age = $("#age").val();
            var $eyeColor = $("#eyeColor").val();
            var $name = $("#name").val();
            var $gender = $("input[name='gender']:checked").val();
            var $company = $("#company").val();
            var $email = $("#email").val();
            var $phone = $("#phone").val();

            $("#" + $_id).children().eq(1).text($active);
            $("#" + $_id).children().eq(2).text($age);
            $("#" + $_id).children().eq(3).text($eyeColor);
            $("#" + $_id).children().eq(4).text($name);
            $("#" + $_id).children().eq(5).text($gender);
            $("#" + $_id).children().eq(6).text($company);
            $("#" + $_id).children().eq(7).text($email);
            $("#" + $_id).children().eq(8).text($phone);

            $('#table-info').slideDown();
            $('#column-info').slideUp();
        }
        else {
            alert("Email is not valid!");
        }
        return false;
    }
    $("#validate").bind("click", validate);
    // end


    $("#back-btn").click(function() {
        $('#column-info').toggle(200, function() {
            $('#table-info').slideDown(100);
        });
    });


    // Get index of column clicked, and sort that column
    $("#table-header").on("click", "th", function() {
        var $num = $(this).index();
        sortTable($num);
    });


    // Filter search for...
    document.querySelector('#myInput').addEventListener('keyup', filterTable, false);
});


// Sorting function
function sortTable(num) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table-info");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[num];
      y = rows[i + 1].getElementsByTagName("TD")[num];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


// Filter algorithm
function filterTable(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#myTable tbody").rows;

  for (var i = 0; i < rows.length; i++) {
        var col_1 = rows[i].cells[1].textContent.toUpperCase();
        var col_2 = rows[i].cells[2].textContent.toUpperCase();
        var col_3 = rows[i].cells[3].textContent.toUpperCase();
        var col_4 = rows[i].cells[4].textContent.toUpperCase();
        var col_5 = rows[i].cells[5].textContent.toUpperCase();
        var col_6 = rows[i].cells[6].textContent.toUpperCase();
        var col_7 = rows[i].cells[7].textContent.toUpperCase();
        var col_8 = rows[i].cells[8].textContent.toUpperCase();
        if (col_1.indexOf(filter) > -1 || col_2.indexOf(filter) > -1 || col_3.indexOf(filter) > -1 ||
    col_4.indexOf(filter) > -1 || col_5.indexOf(filter) > -1 || col_6.indexOf(filter) > -1 ||
col_7.indexOf(filter) > -1 || col_8.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
