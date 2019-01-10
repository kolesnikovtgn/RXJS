const Rx = require('rxjs/Rx');
// eslint-disable-next-line prefer-destructuring
const map = require('rxjs/operators/map').map;
// eslint-disable-next-line prefer-destructuring
const mergeMap = require('rxjs/operators/mergeMap').mergeMap;
// eslint-disable-next-line prefer-destructuring

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

function renderBlock(avatar, name, location, email) {
  $('#usersBlock').prepend(userTemplate(avatar, name, location, email));
}

$(document).ready(() => {
  const refreshButton = $('.refresh');
  const refreshClick$ = Rx.Observable.fromEvent(refreshButton, 'click');
  const arrowClick$ = Rx.Observable.fromEventPattern(
    (handler) => {
      $('#usersBlock').on('click', '.arrow', handler);
    },
    (handler) => {
      $('#usersBlock').off('click', '.arrow', handler);
    },
  );

  const trashClick$ = Rx.Observable.fromEventPattern(
    (handler) => {
      $('#usersBlock').on('click', '.trash', handler);
    },
    (handler) => {
      $('#usersBlock').off('click', '.trash', handler);
    },
  );

  arrowClick$.subscribe((e) => {
    $(e.target).parent().siblings('.main__user-block-trash')
      .toggle('not-active');
    $(e.target).parent().siblings('img')
      .toggle('.margin-left');
  });

  trashClick$.subscribe((e) => {
    $(e.target).parent().parent().remove();
  });

  const requestTrash$ = trashClick$.pipe(
    map(() => {
      const randomNumber = Math.floor(Math.random() * 500);
      return `https://api.github.com/users?since=${randomNumber}`;
    }),
  );

  const responseTrash$ = requestTrash$.pipe(
    mergeMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl))),
    map((listUsers) => {
      const renderUsersList = [];
      for (let i = 0; i < 1; i += 1) {
        renderUsersList.push(listUsers[Math.floor(Math.random() * listUsers.length)]);
      }
      return renderUsersList;
    }),
  );

  responseTrash$.subscribe((res) => {
    res.forEach((el) => {
      renderBlock(el.avatar_url, el.login, el.login, el.id);
    });
  });

  const request$ = refreshClick$.startWith('startup click')
    .map(() => {
      const randomNumber = Math.floor(Math.random() * 500);
      return `https://api.github.com/users?since=${randomNumber}`;
    });

  const response$ = request$.pipe(
    mergeMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl))),
    map((listUsers) => {
      const renderUsersList = [];
      for (let i = 0; i < countUsersList; i += 1) {
        renderUsersList.push(listUsers[Math.floor(Math.random() * listUsers.length)]);
      }
      return renderUsersList;
    }),
  );

  response$.subscribe((res) => {
    $('#usersBlock').empty();
    res.forEach((el) => {
      renderBlock(el.avatar_url, el.login, el.login, el.id);
    });
  });
});
