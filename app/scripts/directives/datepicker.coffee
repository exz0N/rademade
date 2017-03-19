app.directive 'datepicker', () ->
  restrict: "A",
  replace: true,
  templateUrl: "../views/datepicker.html",
  link: (scope, elements, attrs) ->
    scope.id = attrs.id
    scope.name = attrs.name

    currentDate = new Date()
    scope.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    scope.days = [1...36]
    months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октябра', 'Ноября',
      'Декабря']
    visibleMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
      'Ноябрь', 'Декабрь']
    scope.showPicker = false;

    timeFormatFix = (time) ->
      if parseInt(time, 10) < 10 then '0' + time else time


    scope.Date =
      year: currentDate.getFullYear()
      month: currentDate.getMonth()
      currentDat: currentDate.getDate()
      selectedDate: null
      selectedTime: {
        timeHours: currentDate.getHours()
        timeMinutes: currentDate.getMinutes()
      }
      days: scope.monthDays[@month]
      currentWeekDayNum: currentDate.getDay()
      getFullDate: () ->
        if @selectedDate
          "#{@selectedDate.getDate()} #{months[@selectedDate.getMonth()]}  #{@selectedDate.getFullYear()},
          #{timeFormatFix(@selectedTime.timeHours)} : #{timeFormatFix(@selectedTime.timeMinutes)}"
      getCurrentVisibleDate: () ->
        "#{visibleMonths[@month]} #{@year}"
      startDay: () ->
        new Date(@.year, @.month, 1).getDay() || 7
      nextMonth: () ->
        if months[@.month] == "Декабря"
          @.year += 1
          @.month = 0
        else
          @.month += 1
      prevMonth: () ->
        if months[@.month] == "Января"
          @.year -= 1
          @.month = 11
        else
          @.month -= 1
      selectDate: (n) ->
        @.selectedDate = new Date(@.year, @.month, n)

    return