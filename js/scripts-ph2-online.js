let AttrPlayerId = 'plyr-id',

    AttrPlayerName = 'plyr-name',
    AttrPlayerTeam = 'plyr-team',
    AttrPlayerPosition = 'plyr-pos',
    AttrPlayerNumber = 'plyr-num',
    AttrPlayerPersonalImage = 'plyr-p-img',
    AttrPlayerTImg = 'plyr-t-img',
    AttrPlan = 'data-plan',

    palyersTableRowsSelector = '#playerAdd tbody tr',
    stadBlkRowSelector = '.stad-blk-row',
    stadPlayerSelector = '.stad-plyr',
    stadPlayerClickedSelector = '.stad-plyr.clicked',
    stadPlayerActionsSelector = '.stad-plyr-actions',
    saveTeamBtnSelector = '#saveTeam',
    deleteAllBtnSelector = '#deleteAllPlayers',

    playerListItemClass = 'plyr-list-item',
    clickedClass = 'clicked',
    chosenClass = 'chosen',
    activeClass = 'active',

    modalPlayerAddSelector = '#playerAdd',
    modalPlayerDetailsSelector = '#playerDetails',
    modalPlansSelector = '#plans',
    modalAlertSelector = '#alert'
;

let playerId, playerName, playerTeam, playerPosition, playerNumber, playerPersonalImage, playerTImg, players, HTML;

let loader = '<img src="'+assets_img_path+'/ph2/loader.gif" style="width:30px;margin: 10px auto;display:block;">';
let failMsg = '<p class="text-danger m-0" style="padding: 5px 10px;font-size: 14px;">Failed to load Players. Refresh Page.</p>';

// Check Player Data Availability
function checkDataAvailability() {
    if(playerId === 'null' || playerId === 'undefined' || playerId === null || playerId === undefined || playerId === ''){
        playerId = '';
    }
    if(playerName === 'null' || playerName === 'undefined' || playerName === null || playerName === undefined || playerName === ''){
        playerName = '';
    }
    if(playerTeam === 'null' || playerTeam === 'undefined' || playerTeam === null || playerTeam === undefined || playerTeam === ''){
        playerTeam = '';
    }
    if(playerPosition === 'null' || playerPosition === 'undefined' || playerPosition === null || playerPosition === undefined || playerPosition === ''){
        playerPosition = '';
    }
    if(playerNumber === 'null' || playerNumber === 'undefined' || playerNumber === null || playerNumber === undefined || playerNumber === ''){
        playerNumber = '';
    }
    if(playerPersonalImage === 'null' || playerPersonalImage === 'undefined' || playerPersonalImage === null || playerPersonalImage === undefined || playerPersonalImage === ''){
        playerPersonalImage = '';
    }
    if(playerTImg === 'null' || playerTImg === 'undefined' || playerTImg === null || playerTImg === undefined || playerTImg === ''){
        playerTImg = '';
    }
}

// Add Player
function playerAdd(){
    $(stadPlayerSelector).click(function (evt) {
        if($(evt.target).closest(stadPlayerActionsSelector).length <= 0 && !$(this).hasClass(chosenClass)){
            $(stadPlayerSelector).removeClass(clickedClass);
            $(this).addClass(clickedClass);
            $(modalPlayerAddSelector).modal();

            let rowPos = $(this).closest('.stad-blk-row').attr('row-pos');
            $('#playerAdd').attr('row-pos', rowPos);
            getPlayers(rowPos);
        }
    });
}

// Get Players by AJAX Modal
// function getPlayers(pos) {
//     console.log(pos);
//     let url = 'N_players.txt';
//     $.get( url, function() {
//         $('#plyrs-table tbody').html(loader);
//     })
//         .done(function(data) {
//             setTimeout(function () {
//                 $('#plyrs-table tbody').html(data);
//                 playerSelect();
//             }, 1000);
//         })
//         .fail(function() {
//             $('#plyrs-table tbody').html(failMsg);
//         })
//         .always(function() {
//
//         });
// }

// Change Player
function playerChange(e) {
    $(stadPlayerSelector).removeClass(clickedClass);
    $(e).closest(stadPlayerSelector).addClass(clickedClass);
    $(modalPlayerAddSelector).modal();
}

// Show Player Information
function playerDetailsShow(h) {
    $(modalPlayerDetailsSelector).modal();

    let stadPlayer;

    if($(h).hasClass(playerListItemClass )){
        stadPlayer = $(h);

    }else{
        stadPlayer = $(h).closest(stadPlayerSelector);
    }

    playerPersonalImage = stadPlayer.attr(AttrPlayerPersonalImage);
    playerName = stadPlayer.attr(AttrPlayerName);
    playerPosition = stadPlayer.attr(AttrPlayerPosition);
    playerTeam = stadPlayer.attr(AttrPlayerTeam);

    checkDataAvailability();

    HTML =
        '<img src='+playerPersonalImage+'>'+
        '<div class="mx-3">'+
        '<div class="text-secondary font-lg">'+playerName+'</div>'+
        '<div class="text-white">'+playerPosition+' - '+playerTeam+'</div>'+
        '</div>';
    $(modalPlayerDetailsSelector).find('.plyr-dets-blk').html(HTML);

}

// Select Player
function playerSelect() {
    let playersTableRow = document.querySelectorAll(palyersTableRowsSelector);
    for(let i=0; i<playersTableRow.length; i++){
        playersTableRow[i].addEventListener('click', function () {
            let $this, thisPlayerId;

            $this = this;

            thisPlayerId = $this.getAttribute(AttrPlayerId);
            playerName = $this.getAttribute(AttrPlayerName);
            playerTeam = $this.getAttribute(AttrPlayerTeam);
            playerPosition = $this.getAttribute(AttrPlayerPosition);
            playerNumber = $this.getAttribute(AttrPlayerNumber);
            playerPersonalImage = $this.getAttribute(AttrPlayerPersonalImage);
            playerTImg = $this.getAttribute(AttrPlayerTImg);

            checkDataAvailability();

            players = document.querySelectorAll(stadPlayerSelector);
            HTML =
                '<div class="stad-plyr-actions">' +
                '<a class="plyr-cancel" onclick="playerChange(this)" title="Change">' +
                '<i class="fas fa-sync"></i>' +
                '</a>' +
                '<a class="plyr-info" onclick="playerDetailsShow(this)" title="Info">' +
                '<i class="fas fa-exclamation"></i>' +
                '</a>' +
                '</div>' +
                '<div class="stad-plyr-t">' +
                '<img class="w-100" src='+playerTImg+'>' +
                '</div>' +
                '<div class="satd-plyr-dets">' +
                '<div class="stad-plyr-n">'+playerName+'</div>' +
                '<div class="stad-plyr-c">'+playerTeam+'</div>' +
                '</div>';

            let loopCompletedCounter = 0;

            for(let x= 0; x < players.length; x++){
                playerId = players[x].getAttribute(AttrPlayerId);
                if(thisPlayerId === playerId){
                    $(modalPlayerAddSelector).modal('hide');
                    $(modalAlertSelector).modal();
                    break;
                }
                ++loopCompletedCounter;
                if(loopCompletedCounter === players.length){
                    $(modalPlayerAddSelector).modal('hide');
                    let clickedPlayer = document.querySelector(stadPlayerClickedSelector);
                    clickedPlayer.innerHTML = HTML;
                    clickedPlayer.classList.add(chosenClass);
                    clickedPlayer.classList.remove(clickedClass);

                    clickedPlayer.setAttribute(AttrPlayerId, thisPlayerId);
                    clickedPlayer.setAttribute(AttrPlayerName, playerName);
                    clickedPlayer.setAttribute(AttrPlayerTeam, playerTeam);
                    clickedPlayer.setAttribute(AttrPlayerPosition, playerPosition);
                    clickedPlayer.setAttribute(AttrPlayerNumber, playerNumber);
                    clickedPlayer.setAttribute(AttrPlayerPersonalImage, playerPersonalImage);
                    clickedPlayer.setAttribute(AttrPlayerTImg, playerTImg);
                }
            }

            document.querySelector(saveTeamBtnSelector).style.display = 'inline-block';
            document.querySelector(deleteAllBtnSelector).style.display = 'inline-block';

        });
    }

}

// Delete All Players
function deleteAll() {
    document.querySelector(deleteAllBtnSelector).addEventListener('click', function () {
        players = document.querySelectorAll(stadPlayerSelector);
        HTML =
            '<div class="stad-plyr-t">'+
            '<img class="w-100" src="images/ph2/tshirt.png">'+
            '</div>';
        for(let x= 0; x < players.length; x++){
            players[x].innerHTML = HTML;
            players[x].classList.remove(chosenClass);
            players[x].classList.remove(clickedClass);

            players[x].removeAttribute(AttrPlayerId);
            players[x].removeAttribute(AttrPlayerName);
            players[x].removeAttribute(AttrPlayerTeam);
            players[x].removeAttribute(AttrPlayerPosition);
            players[x].removeAttribute(AttrPlayerNumber);
            players[x].removeAttribute(AttrPlayerPersonalImage);
            players[x].removeAttribute(AttrPlayerTImg);

        }

        document.querySelector(saveTeamBtnSelector).style.display = 'none';
        document.querySelector(deleteAllBtnSelector).style.display = 'none';
    });
}

// Change Plan
function changePlan(t) {

    let plan = $(t).attr(AttrPlan);
    plan = plan.toString();

    $('.plan-item').removeClass(activeClass);
    $(t).addClass(activeClass);

    let planArr = plan.split('-');

    HTML =
        '<div class="stad-plyr">'+
        '<div class="stad-plyr-t">'+
        '<img class="w-100" src="'+assets_img_path+'/ph2/tshirt.png">'+
        '</div>'+
        '</div>';

    let rows = document.querySelectorAll(stadBlkRowSelector);
    for(let i = 1; i<rows.length; i++){
        if(rows[i].children.length>planArr[i-1]){
            while(rows[i].children.length>planArr[i-1]){
                let lastChild1 = rows[i].lastChild;
                lastChild1.remove();
                //rows[i+1].append(lastChild1);
            };
        }else if(rows[i].children.length<planArr[i-1]){
            while(rows[i].children.length<planArr[i-1]){
                /*let lastChild1 = rows[i+1].lastChild;
                lastChild1.remove();
                rows[i].append(lastChild1);*/
                rows[i].innerHTML += HTML;
                playerAdd();
            };
        }

        $(modalPlansSelector).modal('hide');


    }
    
}

// Get Players by AJAX List
// Trainer Panel
// function getPlayersList() {
//     let url = 'N_players-list.txt';
//     $.get( url, function() {
//
//         $('.players-lst-blk').html(loader);
//     })
//         .done(function(data) {
//             setTimeout(function () {
//                 $('.players-lst-blk').html(data);
//             }, 1000);
//         })
//         .fail(function() {
//             $('.players-lst-blk').html(failMsg);
//         })
//         .always(function() {
//
//         });
// }

/*function plyrSearch() {
    let input, filter0, table, tr, td0, i, txtValue, dropDown, dropVal, td1, filter1;
    input = document.getElementById("plyrSearchInput");

    dropDown = document.getElementById("plyrSearchDropDown");

    filter0 = input.value.toUpperCase();
    filter1 = dropDown.value.toUpperCase();

    table = document.getElementById("plyrs-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        if (td0 && td1) {
            txtValue = td0.textContent || td0.innerText;
            dropVal = td1.textContent || td1.innerText;
            if(filter1.toUpperCase().includes('ALL')  ||  filter1.toUpperCase().includes('كل')){
                if(txtValue.toUpperCase().indexOf(filter0) > -1){
                    tr[i].style.display = "";
                }else {
                    tr[i].style.display = "none";
                }
            }else{
                if (txtValue.toUpperCase().indexOf(filter0) > -1 && dropVal.toUpperCase().indexOf(filter1) > -1) {
                    tr[i].style.display = "";
                }else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}*/


$(window).on('resize', function(e){

});


$(window).on('scroll', function(){

});

$(document).ready(function () {
    // getPlayersList();
    playerAdd();
    playerSelect();
    deleteAll();

    if(document.getElementById('showPlayersListHandler')){
        document.getElementById('showPlayersListHandler').addEventListener('click', function (e) {
            if(window.innerWidth <= 991.98){
                if(document.getElementById('showPlayersListHandler').classList.contains('active')){
                    document.getElementById('showPlayersListHandler').classList.remove('active');
                    document.querySelector('.plyrs-list-search').style.display = 'none';
                    document.querySelector('.players-lst-blk').style.display = 'none';

                    document.body.style.overflow = 'auto';
                }else{
                    document.getElementById('showPlayersListHandler').classList.add('active');
                    document.querySelector('.plyrs-list-search').style.display = 'block';
                    document.querySelector('.players-lst-blk').style.display = 'block';

                    document.body.style.overflow = 'hidden';
                }
            }
        });
    }

});
