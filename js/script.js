var prevGpa;
var subjectsMark;
var subjectGrade;
var paperCount;

$(document).ready(function () {
  $("#calculate").click(function() {
    prevGpa = $('#prev-gpa').val();
    var fail = 0;

    subjectsMark = $('.internal-input').map(function() {
      return this.value;
    }).get();

    labMark = $('.lab-input').map(function() {
      return this.value;
    }).get();

    paperCount = 0;
    tgp = 0;
    subjectsMark.forEach(subject => {
      if(subject != "") {
        paperCount++;
        gp = 0;
        var gp = gradeCalc(parseInt(subject), parseInt(prevGpa*10));
        if (gp != 0) {
          tgp += gp;
        }
        else {
          fail = 1;
        }
      }
    });
    labMark.forEach(lab => {
      if(lab != "") {
        paperCount++;
        gp = getGradePoint(parseInt(lab)); 
        if (gp != 0) {
          tgp += gp;
        }
        else {
          fail = 1;
        }
      }
    });
    printSGPA(tgp, paperCount, fail);
    $(".overlay").removeClass("hidden");
  });
  $("#recalculate").click(function() {
    $(".overlay").addClass("hidden");
  });
});


function gradeCalc(subInternal, gpa) {
  var examMark = (Math.round(gpa-2.5)) + 5;
  var maxInternal = (examMark/100)*1.25;
  if(subInternal/50 > (maxInternal)) {
    subInternal = maxInternal;
  }
  var percentage = ((examMark + subInternal)/150*100);
  return getGradePoint(percentage);
}

function printSGPA(tgp, count, fail) {
  if (fail == 0){
    var gpa = tgp/count;
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