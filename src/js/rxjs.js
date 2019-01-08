const Rx = require('rxjs/Rx');
const map = require('rxjs/operators/map').map;
const mergeMap = require('rxjs/operators/mergeMap').mergeMap;

const countUsersList = 3;
const userTemplate = (avatar, name, location, email) => ` 
<div class="main__user-block container-row">
  <img class="main__user-block-avatar" src="${avatar}">
  <div class="main__user-block-text container-column">
    <div class="main__user-block-text_name">${name}</div>
    <div class="main__user-block-text_location container-row">
    <i class="main__user-block-text_location-marker fas fa-map-marker-alt"></i>
    <div class="main__user-block-text_location-text">${location}</div>
  </div>
  <div class="main__user-block-text_mail">${email}</div>
</div>
<div class="main__user-block-arrow container-column">
  <i class="fas fa-chevron-right arrow"></i> 
</div>
<div class="main__user-block-trash not-active"> 
  <i class="far fa-trash-alt trash"></i>
</div> 
</div>`;

$(document).ready(() => {
// $('#usersBlock').prepend(userTemplate(1, "Tom Preston-Werner", "San Francisco", "@mojombo"));
// $('#usersBlock').prepend(userTemplate(2, "Vladimir", "San Francisco", "@mojombo"));
// $('#usersBlock').prepend(userTemplate(3, "Tom Preston-Werner", "San Francisco", "@mojombo"));

$('#usersBlock').on('click', '.arrow', function(event) {
event.preventDefault();

$(this).parent().siblings('.main__user-block-trash').toggle('not-active');
$(this).parent().siblings('img').toggle('.margin-left');
// $currentId = $(this).parent().parent().prop('id');
// console.log($currentId);
});
$('#usersBlock').on('click', '.trash', function(event) {
event.preventDefault();

$(this).parent().parent().remove();
console.log($(this).parent().parent().prop('id'));
});

const refreshButton = $('.refresh');
const refreshClick$ = Rx.Observable.fromEvent(refreshButton, 'click');

const request$ = refreshClick$.startWith('startup click')
.map(() => {
const randomNumber = Math.floor(Math.random() * 500);
return `https://api.github.com/users?since=${randomNumber}`;
});

const response$ = request$.pipe(
  mergeMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)))
);

response$.pipe(
  map((listUsers) => {
    let renderUsersList=[];
    for(let i=0; i<countUsersList; i+=1) {
      renderUsersList.push(listUsers[Math.floor(Math.random()*listUsers.length)]);
    }
    return renderUsersList;
  }
)).subscribe((res) => {
  $('#usersBlock').empty();
  res.forEach((el) => {
    renderBlock(el.avatar_url, el.login, el.login, el.id);
  });
});

});

function renderBlock(avatar, name, location, email) {
  $('#usersBlock').prepend(userTemplate(avatar, name, location, email));
}
