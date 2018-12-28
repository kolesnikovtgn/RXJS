const userTemplate = (id, name, location, email) => `            
    <div class="main__user-block container-row" id="${id}">
        <img class="main__user-block-avatar" src="https://picsum.photos/72/72/?random">
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
    $('#usersBlock').prepend(userTemplate(1, "Tom Preston-Werner", "San Francisco", "@mojombo"));
    $('#usersBlock').prepend(userTemplate(2, "Vladimir", "San Francisco", "@mojombo"));
    $('#usersBlock').prepend(userTemplate(3, "Tom Preston-Werner", "San Francisco", "@mojombo"));

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
});
