app.filter('timeStep', function() {
  return function(val) {
    if (parseInt(val, 10) < 10) {
      return '0' + val;
    } else {
      return val;
    }
  };
});
