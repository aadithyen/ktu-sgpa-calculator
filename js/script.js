var prevGpa;
var subjectsMark;
var subjectGrade;
var paperCount;

$(document).ready(function () {
  $("#calculate").click(function() {
    prevGpa = $('#prev-gpa').val();

    subjectsMark = $('.internal-input').map(function() {
      return this.value;
    }).get();

    labMark = $('.lab-input').map(function() {
      return this.value;
    }).get();

    paperCount = 0;
    gp = 0;

    subjectsMark.forEach(subject => {
      if(subject != "") {
        paperCount++;
        gp += gradeCalc(parseInt(subject), parseInt(prevGpa*10));
      }
    });

    labMark.forEach(lab => {
      if(lab != "") {
        paperCount++;
        gp += getGradePoint(parseInt(lab))
      }
    });
    printSGPA(gp, paperCount);
    $(".overlay").removeClass("hidden");
  });

  $("#recalculate").click(function() {
    $(".overlay").addClass("hidden");
  });

});


function gradeCalc(subInternal, gpa) {
  var examMark = (Math.round(gpa-2.5)) + 5;
  console.log(examMark);
  var maxInternal = (examMark/100)*1.25;
  if(subInternal/50 > (maxInternal)) {
    subInternal = maxInternal;
  }
  console.log(subInternal);
  var percentage = ((examMark + subInternal)/150*100);
  console.log(percentage);
  return getGradePoint(percentage);
}

function printSGPA(gp, count) {
  var gpa = gp/count;
  $(".result").html(gpa.toFixed(2));
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