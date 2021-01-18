$(document).ready(function () {

    var dateTime = luxon.DateTime;
    var localTime = dateTime.local();

    function populateCurrentDate() {
      var fullDate = dateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' });
      var day = dateTime.local().toLocaleString({ day: '2-digit' });
      var daySuffix = getDayNumberSuffix(day);
      fullDate += daySuffix;
      $("#currentDay").text(fullDate);

      function getDayNumberSuffix(day) {
        if (day >= 11 && day <= 13) {
          return "th";
        }
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

    function addRows() {
      var saveIcon = '<i class="fas fa-save"></i>'
      var hour = 9;
      var amPmText = "AM";
      var currentHour = localTime.hour;
      currentHour = 11;

      for (var i = 9; i < 18; i++) {
        var newRow = $("<div>").addClass("row").attr("id", "hr");
        var newCol1 = $("<div>").addClass("col-1 time-block hour").text(hour + amPmText);
        var newCol2 = $("<textarea>").addClass("col-10 decription").attr({ id: "desc" + i }).val(localStorage.getItem("hour-" + i));

        if (i === currentHour) {
          newCol2.addClass("present");
        }
        else if (i <= currentHour) {
          newCol2.addClass("past");
        }
        else {
          newCol2.addClass("future");
        }

        var newCol3 = $("<button>").addClass("col-1 saveBtn").attr({ value: i }).html(saveIcon);

        newRow.append(newCol1, newCol2, newCol3);
        $(".container").append(newRow);

        if (hour === 11) {
          amPmText = "PM";
        }
        else if (hour === 12) {
          hour = 0;
        }
        hour++;
      }
    }

    populateCurrentDate();
    addRows();

    $(".saveBtn").click(function () {
      console.log("save");
      var btnId = $(this).attr("value");
      var descText = $("#desc" + btnId).val();
      console.log("descText: " + descText);
      localStorage.removeItem("hour-" + btnId);
      if (descText != "") {
        localStorage.setItem("hour-" + btnId, descText);
      }
    })

  })