var prevGpa;
var theoryMarks;
var labMarks;
var subjectGrade;
var moreButton = $("#more-button");
var calculateButton = $("#calculate");
var backButton = $("#recalculate");

$(document).ready(function () {
  calculateButton.click(function() {
    prevGpa = $('#prev-gpa').val();
    var fail = 0;
    var scheme = $('#scheme:checked').val();
    theoryMarks = $('.theory-group').map(function() {
      return {
        internal: $(this).children().eq(1).val(),
        credit: $(this).children().eq(0).val()
      };
    }).get();

    labMarks = $('.lab-group').map(function() {
      return {
        internal: $(this).children().eq(1).val(),
        credit: $(this).children().eq(0).val()
      }
    }).get();

    var totalCredits = 0;
    wgp = 0;
    fail = 0;

    theoryMarks.forEach(paper => {
      if(paper.internal != "") {
        credit = parseInt(paper.credit);
        totalCredits += credit;
        var gp = gradeCalc(parseInt(paper.internal), parseInt(prevGpa*10), scheme);
        if (gp != 0) {
          wgp += (gp*credit);
        }
        else {
          fail = 1;
        }
      }
    });
    labMarks.forEach(lab => {
      if(lab.internal != "") {
        credit = parseInt(lab.credit);
        totalCredits += credit;
        gp = getGradePoint(lab.internal); 
        if (gp != 0) {
          wgp += (gp*credit);
        }
        else {
          fail = 1;
        }
      }
    });
    printSGPA(wgp, totalCredits, fail);
    $(".overlay").removeClass("hidden");
  });
  backButton.click(function() {
    $(".overlay").addClass("hidden");
  });
  moreButton.click(function (){
    var extraFields = $(".no-display");
    extraFields.slideToggle({
      start: function () {
        $(this).css({
          display: "flex"
        })
      }
    });
    moreButton.html()=="More..." ? moreButton.html("Less...") : moreButton.html("More...");
  });
});


function gradeCalc(subInternal, gpa, scheme) { //Moderation
  var examMark = moderation(gpa, scheme);
  var maxInternal = (examMark/100)*1.25;
  if(subInternal/50 > (maxInternal)) {
    subInternal = maxInternal;
  }
  var percentage = ((examMark + subInternal)/150*100);
  return getGradePoint(percentage);
}

function moderation(gpa, scheme) {
  if (scheme == 2019) {
    var examMark = (Math.round(gpa-2.5));
  }
  else if (scheme == 2015) {
    var examMark = (Math.round(gpa-3.75));
  }
  examMark += 5;
  return examMark;
}

function printSGPA(wgp, totalCredits, fail) {
  if (fail == 0){
    console.log(wgp);
    var gpa = wgp/totalCredits;
    if (!isNaN(gpa)) {
      $(".result").html(gpa.toFixed(2));
      $(".tagline").html("SGPA");
    }
    else {
      $(".result").html("Please enter internal marks");
      $(".tagline").html("");
    }
  }
  else {
    $(".result").html("Sorry about that");
    $(".tagline").html("You might have failed in a paper.");
  }
}

function getGradePoint(percentage) {
  if(percentage>=90) {
    return 10;
  }
  else if (percentage >= 85) {
    return 9;
  }
  else if (percentage >= 80) {
    return 8;
  }
  else if (percentage >= 70) {
    return 7;
  }
  else if (percentage >= 60) {
    return 6;
  }
  else if (percentage >= 50) {
    return 5;
  }
  else if (percentage >= 45) {
    return 4;
  }
  else return 0;
} 