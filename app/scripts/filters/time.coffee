app.filter 'timeStep', () ->
  (val) ->
    if parseInt(val, 10) < 10 then '0' + val else val