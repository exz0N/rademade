var app;

app = angular.module('dpApp', []);

app.directive('datepicker', function() {
  return {
    restrict: "A",
    replace: true,
    templateUrl: "../views/datepicker.html",
    link: function(scope, elements, attrs) {
      var currentDate, i, months, results, timeFormatFix, visibleMonths;
      scope.id = attrs.id;
      scope.name = attrs.name;
      currentDate = new Date();
      scope.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      scope.days = (function() {
        results = [];
        for (i = 1; i < 36; i++){ results.push(i); }
        return results;
      }).apply(this);
      months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октябра', 'Ноября', 'Декабря'];
      visibleMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      scope.showPicker = false;
      timeFormatFix = function(time) {
        if (parseInt(time, 10) < 10) {
          return '0' + time;
        } else {
          return time;
        }
      };
      scope.Date = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        currentDat: currentDate.getDate(),
        selectedDate: null,
        selectedTime: {
          timeHours: currentDate.getHours(),
          timeMinutes: currentDate.getMinutes()
        },
        days: scope.monthDays[this.month],
        currentWeekDayNum: currentDate.getDay(),
        getFullDate: function() {
          if (this.selectedDate) {
            return (this.selectedDate.getDate()) + " " + months[this.selectedDate.getMonth()] + "  " + (this.selectedDate.getFullYear()) + ", " + (timeFormatFix(this.selectedTime.timeHours)) + " : " + (timeFormatFix(this.selectedTime.timeMinutes));
          }
        },
        getCurrentVisibleDate: function() {
          return visibleMonths[this.month] + " " + this.year;
        },
        startDay: function() {
          return new Date(this.year, this.month, 1).getDay() || 7;
        },
        nextMonth: function() {
          if (months[this.month] === "Декабря") {
            this.year += 1;
            return this.month = 0;
          } else {
            return this.month += 1;
          }
        },
        prevMonth: function() {
          if (months[this.month] === "Января") {
            this.year -= 1;
            return this.month = 11;
          } else {
            return this.month -= 1;
          }
        },
        selectDate: function(n) {
          return this.selectedDate = new Date(this.year, this.month, n);
        }
      };
    }
  };
});

app.filter('timeStep', function() {
  return function(val) {
    if (parseInt(val, 10) < 10) {
      return '0' + val;
    } else {
      return val;
    }
  };
});
