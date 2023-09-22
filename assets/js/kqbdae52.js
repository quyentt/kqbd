/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var domain_kqbd = 'https://ketquabongda.com/';
//var domain_kqbd ='http://localhost:8084/kqbd.v2/';

function loadImage() {
    $('img').each(function () {
        if ($(this).attr("data-src") !== undefined) {
            var this_image = this;
            var img = new Image();
            img.src = $(this).attr("data-src");
            $(img).load(function () {
                this_image.src = this.src;
            });
        }
    });
}

function load_football_champion_in_country(id) {
    try {
        var length = $('#' + id).html().length;
        if (length < 1) {
            $.ajax({
                url: domain_kqbd + 'ajax/champion_in_country.htm?id=' + id
            }).done(function (response) {
                console.log(response);
                $('#' + id).html(response);
                $('#' + id).show();
            });
        } else {
            $('#' + id).show();
        }
    } catch (e) {
        console.log(e);
    }

}

function load_more_news(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_more_news.htm?page=' + page
        }).done(function (response) {
            $('#result_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }

}

function load_more_news_transfer(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_more_news_transfer.htm?page=' + page
        }).done(function (response) {
            $('#result_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }

}

function load_more_news_tags(page, tagsUrl) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_more_news_tags.htm?page=' + page + '&tagsUrl=' + tagsUrl
        }).done(function (response) {
            $('#result_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }

}

function load_more_news_search(page, keywords) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_more_news_search.htm?page=' + page + '&keywords=' + keywords
        }).done(function (response) {
            $('#result_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }
}

function load_more_news_predicts(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_more_news_predicts.htm?page=' + page
        }).done(function (response) {
            $('#result_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }

}

function lichthidau_order_time() {
    lichthidau_of_time($('#inputdate').val(), function () {

    });
}

function lichthidau_of_time(sdate, fn) {
    try {
        var viewAS = $('#giaidau').val();
        $.ajax({
            url: domain_kqbd + 'ajax/get_lichthidau.htm?view=' + viewAS + '&sdate=' + sdate
        }).done(function (response) {
            $('#box-livescore').html(response);
            fn('OK');
        });
    } catch (e) {
        console.log(e);
    }
}

function licthidau_next_prev(sdate) {
    lichthidau_of_time(sdate, function () {
        $('#cal_prev').attr('href', 'lich-thi-dau-ngay-' + prevDate + '.html');
        $('#cal_next').attr('href', 'lich-thi-dau-ngay-' + nextDate + '.html');
        $('#inputdate').val(currDate);
    });
}

function lichthidau_change_time() {
    console.log($('#inputdate').val());
    lichthidau_of_time($('#inputdate').val(), function () {
        $('#cal_prev').attr('href', 'lich-thi-dau-ngay-' + prevDate + '.html');
        $('#cal_next').attr('href', 'lich-thi-dau-ngay-' + nextDate + '.html');
        $('#inputdate').val(currDate);
    });
}


function livescore_order_time() {
    livescore_of_time($('#inputdate').val(), function () {

    });
}



function livescore_of_time(sdate, fn) {
    try {
        var viewAS = $('#giaidau').val();
        $.ajax({
            url: domain_kqbd + 'ajax/get_match_date.htm?view=' + viewAS + '&sdate=' + sdate
        }).done(function (response) {
            $('#box-livescore').html(response);
            fn('OK');
        });
    } catch (e) {
        console.log(e);
    }

}

function cal_next_prev(sdate) {
    livescore_of_time(sdate, function () {
        $('#cal_prev').attr('href', '-ngay-' + prevDate + '.html');
        $('#cal_next').attr('href', 'ngay-' + nextDate + '.html');
        $('#inputdate').val(currDate);
    });
}

function handicap_change_time() {
    var date = $('#inputdate').val().replace('/', '-');
    date = date.replace('/', '-');
    window.location.href = 'ty-le-keo-bong-da-ngay-' + date + '.html';
}

function livescore_change_time() {
    console.log($('#inputdate').val());
    livescore_of_time($('#inputdate').val(), function () {
        $('#cal_prev').attr('href', 'ngay-' + prevDate + '.html');
        $('#cal_next').attr('href', 'ngay-' + nextDate + '.html');
        $('#inputdate').val(currDate);
    });
}


function livescore_push() {
    try {
        var rdLine = Math.floor((Math.random() * 3) + 1);
        $.ajax({
            url: domain_kqbd + 'ajax/livescore_push_'+rdLine+'.htm'
        }).done(function (response) {
            var data = JSON.parse(response);
            for (var i in data) {
                if (eval(data[i].status) !== 8) {
                    $('#time_' + data[i].mId).addClass("c_red");
                    if (eval(data[i].status) === 5) {
                        $('#time_' + data[i].mId).html("FT");
                    } else if (eval(data[i].status) === 2) {
                        $('#time_' + data[i].mId).html("HT");
                    } else {
                        $('#time_' + data[i].mId).html(data[i].ltime + "'");
                    }
                    $('#goals_' + data[i].mId).html(data[i].fgoal + ' - ' + data[i].sgoal);
                    $('#goals1_' + data[i].mId).html(data[i].fgoal);
                    $('#goals2_' + data[i].mId).html(data[i].sgoal);
                    if (eval(data[i].fgoal) > eval(data[i].sgoal)) {
                        $('#fteam_' + data[i].mId).addClass('p_5 team-home c_red');
                    } else if (eval(data[i].fgoal) < eval(data[i].sgoal)) {
                        $('#steam_' + data[i].mId).addClass('p_5 team-away c_red');
                    }
                }
            }
        });
    } catch (e) {

    }

}

function refresh_match_event(matchId, firstTeamCode, secondTeamCode, firstTeamCodeSMS, secondTeamCodeSMS) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/match_event.htm?matchId='+ matchId,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8'
        }).done(function (response) {
            var data = JSON.parse(response);
            console.log(data.events);
            var firstTeamGoals = '';
            var secondTeamGoals = '';
            var events = data.events;
            for (var i in events) {
                if ((events[i].type === 2 || eval(events[i].type) === 16 || eval(events[i].type) === 17) && (events[i].teamCode.toLowerCase() == firstTeamCode.toLowerCase() || events[i].teamCode.toLowerCase() == firstTeamCodeSMS.toLowerCase())) {
                    firstTeamGoals += '<span>'+ events[i].player +'<i style="color: #222;font-size: 11px;">('+ (events[i].type == 17 ? 'O.g' : '') + (events[i].type == 16 ? 'Pen' : '') + events[i].minute +'’)</i>' 
                            +'</span>';
                }
                if ((events[i].type === 2 || eval(events[i].type) === 16 || eval(events[i].type) === 17) && (events[i].teamCode.toLowerCase() === secondTeamCode.toLowerCase() || events[i].teamCode.toLowerCase() === secondTeamCodeSMS.toLowerCase())) {
                    secondTeamGoals += '<span>'+ events[i].player +'<i style="color: #222;font-size: 11px;">('+ (events[i].type == 17 ? 'O.g' : '') + (events[i].type == 16 ? 'Pen' : '') + events[i].minute +'’)</i>' 
                            +'</span>';
                }
            }
            $('#firstGoals').html(firstTeamGoals.replace('GOAL OVERTURNED BY VAR:', '<i style="color: #ff3333;font-size: 11px;">(Hủy bởi VAR)</i>'));
            $('#secondGoals').html(secondTeamGoals.replace('GOAL OVERTURNED BY VAR:', '<i style="color: #ff3333;font-size: 11px;">(Hủy bởi VAR)</i>'));
        });
    } catch (e) {

    }

}

function refresh_live(matchId) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_live.htm?matchId=' + matchId
        }).done(function (response) {
            $('#tuongthuat_live').html(response);
        });
    } catch (e) {

    }
}

function load_standing(championCode) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_standing.htm?championCode=' + championCode
        }).done(function (response) {
            $('#code_standing').find("a").each(function () {
                if ($(this).attr("id") === championCode) {
                    $(this).addClass("current");
                } else {
                    $(this).removeClass("current");
                }
            });
            $('#champion_standing').html(response);
        });
    } catch (e) {

    }
}


function livescore_handicap() {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/keo_push.htm'
        }).done(function (response) {
            if (response !== '') {
                $('#livescore_handicap').html(response);
//                $('#head_top').hide();
            }
        });
    } catch (e) {

    }
}

function changeBangXepHang() {
    var code = $('#giai').val();
    $('#giai').find('option').each(function () {
        if (code === $(this).attr('value')) {
            console.log($(this).attr('data-url'));
            window.location.href = $(this).attr('data-url');
        }
    });
}

function handicap_standing(code, seasonId, view) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/handicap_standing.htm?code=' + code + '&seasonId=' + seasonId + '&view=' + view
        }).done(function (response) {
            if (response !== '') {
                $('#tabs_handicap_standing').find('a').each(function () {
                    if ($(this).attr("id") === view) {
                        $(this).addClass("current");
                    } else {
                        $(this).removeClass("current");
                    }
                });
                $('#handicap_standing').html(response);
            }
        });
    } catch (e) {

    }
}

function load_match_of_round(round) {

    var code = $('#giai').val();
    var seasonId = $('#muagiai').val();
    if (round === '') {
        round = $('#vongdau').val();
    } else {
        $('#vongdau').val(round);
    }

    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_match_of_round.htm?code=' + code.trim() + '&seasonId=' + seasonId + '&round=' + round
        }).done(function (response) {
            if (response !== '') {
                $('#table_match').html(response);
            }
        });
    } catch (e) {

    }
}

function load_keo_chi_tiet(code, seasonId) {
    var round = $('#vongdau').val();
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/load_keo_chi_tiet.htm?code=' + code + '&seasonId=' + seasonId + '&round=' + round
        }).done(function (response) {
            if (response !== '') {
                $('#keo_chi_tiet').html(response);
            }
        });
    } catch (e) {

    }
}

function refreshPredict(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_predict.htm'
        }).done(function (response) {
            $('#predict').html(response);
        });
    } catch (e) {
        console.log(e);
    }
}

function refreshNews(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_news.htm'
        }).done(function (response) {
            $('#news_index').html(response);
        });
    } catch (e) {
        console.log(e);
    }
}

function refreshNewsM(page) {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_news_m.htm'
        }).done(function (response) {
            $('#news_index_1').html(response);
        });
    } catch (e) {
        console.log(e);
    }
}

function refreshLstNews() {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_list_news.htm'
        }).done(function (response) {
            $('#lst_news').html(response);
        });
    } catch (e) {
        console.log(e);
    }
}

function refreshLstPredict() {
    try {
        $.ajax({
            url: domain_kqbd + 'ajax/refresh_list_predict.htm'
        }).done(function (response) {
            $('#lst_predict').html(response);
            loadads();
        });
    } catch (e) {
        console.log(e);
    }
}

function getCurrHHMMSS() {
    var currentdate = new Date();
    var currentHH = (currentdate.getHours() < 10 ? '0' + currentdate.getHours() : currentdate.getHours());
    var currentMM = (currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes());
    var currentSS = (currentdate.getSeconds() < 10 ? '0' + currentdate.getSeconds() : currentdate.getSeconds());
    return parseInt(currentHH + '' + currentMM + '' + currentSS);
}