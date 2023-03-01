$(function () {

  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const hoursT = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var currH = dayjs().hour();
  var rel = "";

  function render() {
    hoursT.forEach((_, i) => {

      if (hoursT[i] < currH) {
        rel = "past";
      } else if (hoursT[i] == currH) {
        rel = "present";
      } else {
        rel = "future";
      }

      const currDiv = $("<div>").addClass("row time-block " + rel).attr("id", hoursT[i]);

      currDiv.append([
        $("<div>" + hours[i] + "</div>").addClass("col-2 col-md-1 hour text-center py-3"),
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
        $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append(
          $("<i>").addClass("fas fa-save").attr("aria-hidden", "true")
        )
      ]);

      $(".container-lg").append(currDiv);
    })
  };

  render();
  var myT = [];

  var storedT = JSON.parse(localStorage.getItem("myT"));

  if (storedT !== null) {
    myT = storedT;
  }

  function saveItem(event) {
    event.preventDefault();

    let thisBlock = $(this).parent();

    var thisT = {
      tBlock: $(this).parent().attr('id'),
      tTask: thisBlock.children()[1].value
    }
    storeT(thisT);
  }

  function storeT(x) {
    myT.push(x);
    localStorage.setItem("myT", JSON.stringify(myT));
  }

  function displayT() {
    myT.forEach((_, i) => {
      let thisT = myT[i];
      $("#" + thisT.tBlock).children()[1].value = thisT.tTask;
    })
  }

  var btns = $(".saveBtn")

  btns.on('click', saveItem);
  displayT();


  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();

  $("#currentDay").text(today.format('dddd, MMMM D YYYY'));

  //re-render every minute so page can update as hours pass
  setInterval(() => { currH = dayjs().hour(); render() }, 60000);
});
