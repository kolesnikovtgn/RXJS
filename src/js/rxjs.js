const Rx = require('rxjs/Rx');

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

const refreshButton = document.querySelector('.refresh');
const refreshClick$ = Rx.Observable.fromEvent(refreshButton, 'click'); 

const request$ = refreshClick$.startWith('startup click') 
  .map(() => { 
    const randomNumber = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomNumber}`;
  });

const response$ = request$ 
   .flatMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)));  

let suggestion1Stream = response$
  .map(function(listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
});

let suggestion2Stream = response$
  .map(function(listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
});

let suggestion3Stream = response$
  .map(function(listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
});

suggestion1Stream.subscribe(function(res) {
    renderBlock(res.avatar_url, res.login, res.login, res.id);
});

suggestion2Stream.subscribe(function(res) {
    renderBlock(res.avatar_url, res.login, res.login, res.id);
});

suggestion3Stream.subscribe(function(res) {
    renderBlock(res.avatar_url, res.login, res.login, res.id);
});

});

function renderBlock(avatar, name, location, email) {
    $('#usersBlock').prepend(userTemplate(avatar, name, location, email));
}