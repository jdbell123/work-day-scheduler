// document ready statement to make sure the page fully loads before running this code
$(document).ready(function () {

    // set global variables
    var dateTime = luxon.DateTime;
    var localTime = dateTime.local();

    // function to generate and populate the current date on the main index page
    function populateCurrentDate() {
      var fullDate = dateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' });
      var day = dateTime.local().toLocaleString({ day: '2-digit' });
      var daySuffix = getDayNumberSuffix(day);
      fullDate += daySuffix;
      // populate the date on the main index page
      $("#currentDay").text(fullDate);

        // sub function to generate the day suffix for the full date
      function getDayNumberSuffix(day) {
        // if the day is 11, 12 or 13 then the day suffix must be "th"
        if (day >= 11 && day <= 13) {
          return "th";
        }
        // work out the day suffix text
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
    }

    // function to add rows to the main index page
    function addRows() {
      // set variables that are used in this function only
      var saveIcon = '<i class="fas fa-save"></i>'
      var hour = 9;
      var amPmText = "AM";
      var currentHour = localTime.hour;

      // loop from 9 to 18 (hour range planner is for 9am thru 6pm)
      for (var i = 9; i < 18; i++) {
        // create new row div section
        var newRow = $("<div>").addClass("row").attr("id", "hr");

        // create new column for hour to display
        var newCol1 = $("<div>").addClass("col-1 time-block hour").text(hour + amPmText);

        // create new column for textarea (description) to display
        var newCol2 = $("<textarea>").addClass("col-10 decription").attr({ id: "desc" + i }).val(localStorage.getItem("hour-" + i));

        // based on current time - add correct class to mark row present, past or future
        if (i === currentHour) {
          newCol2.addClass("present");
        }
        else if (i <= currentHour) {
          newCol2.addClass("past");
        }
        else {
          newCol2.addClass("future");
        }

        // create new column for save button
        var newCol3 = $("<button>").addClass("col-1 saveBtn").attr({ value: i }).html(saveIcon);

        // append the 3 new columns to the new row element
        newRow.append(newCol1, newCol2, newCol3);

        // append the new row element to the existing div with a class = container
        $(".container").append(newRow);

        // check if hour = 11, if so then make all rows after PM
        if (hour === 11) {
          amPmText = "PM";
        }
        // check if hour = 12, if so reset hour to 0 so that screen will show from 1
        else if (hour === 12) {
          hour = 0;
        }
        // increment hour counter by 1
        hour++;
      }
    }

    // call initial functions for page to populate and work correctly
    populateCurrentDate();
    addRows();

    // on click event handler. Will be invoked whenever one of the save buttons is pressed
    $(".saveBtn").click(function () {
      console.log("save");
      // work out which save button has been pressed by looking at the value attribute
      var btnId = $(this).attr("value");
      // using the value attribute get the text from the textarea that matches
      var descText = $("#desc" + btnId).val();
      // incase the person is deleting the entry then remove the local storage item
      localStorage.removeItem("hour-" + btnId);
      // if text has been entered for hour save button pressed add data to local storage
      if (descText != "") {
        localStorage.setItem("hour-" + btnId, descText);
      }
    })

  })