$('#schedule .toggle-btn').click(function() {
  if ($(this).hasClass('selected')) {
  } else {
    $('.toggle-btn.selected').removeClass('selected');
    $(this).addClass('selected');
  }
  var dayInfo = $(this).attr('id');
  var tableid = '#' + dayInfo;
  $('#schedule table.selected').removeClass('selected');
  $('#schedule').find('table' + tableid).addClass('selected');
});

$('#faqs dt').click(function() {
  $(this).siblings('dt').removeClass('active');
  $(this).addClass('active');
  $(this).next().slideDown().siblings('dd').slideUp();
});
