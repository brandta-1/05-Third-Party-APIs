$(function () {

  //initialize js variables
  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const hoursT = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var currH = dayjs().hour();
  var rel = "";

  function render() {

    //for each workday hour 
    hoursT.forEach((_, i) => {

      //determine if it is past, present, or future
      if (hoursT[i] < currH) {
        rel = "past";
      } else if (hoursT[i] == currH) {
        rel = "present";
      } else {
        rel = "future";
      }

      //create a new time block, set its id to its hour
      const currDiv = $("<div>").addClass("row time-block " + rel).attr("id", hoursT[i]);

      //append all necessary children
      currDiv.append([
        $("<div>" + hours[i] + "</div>").addClass("col-2 col-md-1 hour text-center py-3"),
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
        $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append(
          $("<i>").addClass("fas fa-save").attr("aria-hidden", "true")
        )
      ]);

      //append the finished div into the document
      $(".container-lg").append(currDiv);
    })
  };

  //render the page 
  render();
  var myT = [];

  //retrieve any stored tasks
  var storedT = JSON.parse(localStorage.getItem("myT"));

  if (storedT !== null) {
    myT = storedT;
  }

  //save button click event
  function saveItem(event) {
    event.preventDefault();

    let thisBlock = $(this).parent();

    //store the saved task's id and text
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

  //display all saved tasks into their respective timeblocks
  function displayT() {
    myT.forEach((_, i) => {
      let thisT = myT[i];
      $("#" + thisT.tBlock).children()[1].value = thisT.tTask;
    })
  }

  var btns = $(".saveBtn")
  btns.on('click', saveItem);
  displayT();

  //display the current date in the header of the page.
  $("#currentDay").text(dayjs().format('dddd, MMMM D YYYY'));

  //re-render every minute so page can update as hours pass
  setInterval(() => { currH = dayjs().hour(); render() }, 60000);
});
