$(document).ready(() => {
  $('#arrow').click((event) => {
    event.preventDefault();
    $('#trash').toggle('not-active');
  });
});
