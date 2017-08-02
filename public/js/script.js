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
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).next().slideUp();
    return false;
  }
  $(this).siblings('dt').removeClass('active');
  $(this).addClass('active');
  $(this).next().slideDown().siblings('dd').slideUp();
});

$('header i#open').click(function() {
  $('ul#mobile-menu').addClass('active');
  $('html').css('overflow', 'hidden');
  $('body').bind('touchmove', function(e) {
      e.preventDefault()
  });
});

$('header i#close').click(function() {
  $('ul#mobile-menu').removeClass('active');
  $('html').css('overflow', 'scroll');
  $('body').unbind('touchmove');
});
