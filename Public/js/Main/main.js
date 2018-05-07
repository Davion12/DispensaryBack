$(function () {

    $('#main_page').mouseenter(function () {
        $(this).find("li").css("color", "lawngreen");
    });

    $('#main_page').mouseleave(function () {
        $(this).find("li").css("color", "lightskyblue");
    });

    $('#dispensary_page').mouseenter(function () {
        $(this).find("li").css("color", "lawngreen");
    });

    $('#dispensary_page').mouseleave(function () {
        $(this).find("li").css("color", "lightskyblue");
    });
    $('#window_page').mouseenter(function () {
        $(this).find("li").css("color", "lawngreen");
    });

    $('#window_page').mouseleave(function () {
        $(this).find("li").css("color", "lightskyblue");
    });
    $('#account_page').mouseenter(function () {
        $(this).find("li").css("color", "lawngreen");
    });

    $('#account_page').mouseleave(function () {
        $(this).find("li").css("color", "lightskyblue");
    });

    $('#window_page').click(function () {
       $("#changePage").load("./changeWindowPage");
        transferNego("#window_page");
        displayWindowInfo();
    });

    $('#main_page').click(function () {
        $("#changePage").load("./changeMainPage");
        transferNego("#main_page");
    });

    $('#account_page').click(function () {
        $("#changePage").load("./changeAccountPage");
        transferNego("#account_page");
        displayAccountInfo();
    });

    $('#dispensary_page').click(function () {
        $("#changePage").load("./changeDispensaryPage");
       transferNego("#dispensary_page");
       displayDispensaryInfo();
    });
});


function chooseDispensary() {
    $("#changePage").load("./changeDispensaryPage");
    transferNego("#dispensary_page");
    displayDispensaryInfo();
}

function chooseWindow() {
    $("#changePage").load("./changeWindowPage");
    transferNego("#window_page");
    displayWindowInfo();
}

function chooseUser() {
    $("#changePage").load("./changeAccountPage");
    transferNego("#account_page");
    displayAccountInfo();
}


var dispensaryInfo;
var windowInfo;
var accountInfo;


function transferNego(id) {
    $("#window_page").attr("class","noactive");
    $("#main_page").attr("class","noactive");
    $("#account_page").attr("class","noactive");
    $("#dispensary_page").attr("class","noactive");
    $(id).attr("class","active");
}

function modify() {
    $('#modify').click(function(){
        displayFrame(1);
    });

    $('.theme-poptit .close').click(function(){
        hideFrame();
    })
}

function displayFrame(type) {
    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);
    if(type === 1){
        if(name === "dispensary"){
            $('#dispensary_id').html(dispensaryInfo[0]["roomId"]);
            $('#dispensary_name').html(dispensaryInfo[0]["roomName"]);
            $('#rule').html(dispensaryInfo[0]["rule"]);
        }
        if(name === "window"){
            $('#dispensary_id').html(windowInfo[0]["windowId"]);
            $('#dispensary_name').html(windowInfo[0]["windowName"]);
            $('#rule').html(windowInfo[0]["roomId"]);
        }
    }
}

function hideFrame(name) {
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
    if(name === "dispensary"){
        $('#dispensary_id').html("");
        $('#dispensary_name').html("");
        $('#rule').html("");
    }
    if(name === "window"){
        $('#window_id').html("");
        $('#window_name').html("");
        $('#bind_dispensary_id').html("");
    }
}


function displayDispensaryInfo() {
    $.ajax({
        url: "../Page/getDispensaryInfo",
        type: "GET",
        success: function (jsonData) {
            if(jsonData["code"] === 0){
                dispensaryInfo = jsonData["rooms"];
                var name = "dispensary";
                for(var i = 0; i < dispensaryInfo.length; i++)
                {
                    var trHtml = "<tr>";
                    trHtml += "<td>" + dispensaryInfo[i]["roomId"] + "</td>";
                    trHtml += "<td>" + dispensaryInfo[i]["roomName"] + "</td>";
                    trHtml += "<td>" + dispensaryInfo[i]["rule"] + "</td>";
                    trHtml += "<td> <a href='javascript:' onclick='displayFrame(1)' id='modify'>修改</a>  |  <a href=''>删除</a></td>";
                    $("#dispensary_table").append(trHtml);
                }
            } else {
                alert(jsonData['msg']);
            }
        }
    })
}


function displayWindowInfo() {
    $.ajax({
        url: "../Page/getWindowInfo",
        type: "GET",
        success: function (jsonData) {
            if(jsonData["code"] === 0){
                windowInfo = jsonData["windows"];
                for(var i = 0; i < windowInfo.length; i++)
                {
                    var trHtml = "<tr>";
                    trHtml += "<td>" + windowInfo[i]["windowId"] + "</td>";
                    trHtml += "<td>" + windowInfo[i]["windowName"] + "</td>";
                    trHtml += "<td>" + windowInfo[i]["roomId"] + "</td>";
                    trHtml += "<td> <a href='javascript:' onclick='modify(1)' id='modify'>修改</a>  |  <a href=''>删除</a></td>";
                    $("#dispensary_table").append(trHtml);
                }
            } else {
                alert(jsonData['msg']);
            }
        }
    })
}

function displayAccountInfo() {
    $.ajax({
        url: "../Page/getAccountInfo",
        type: "GET",
        success: function (jsonData) {
            if(jsonData["code"] === 0){
                accountInfo = jsonData["accounts"];
                for(var i = 0; i < accountInfo.length; i++)
                {
                    var trHtml = "<tr>";
                    trHtml += "<td>" + accountInfo[i]["accountId"] + "</td>";
                    trHtml += "<td>" + accountInfo[i]["accountName"] + "</td>";
                    trHtml += "<td>" + accountInfo[i]["displayName"] + "</td>";
                    trHtml += "<td>" + accountInfo[i]["password"] + "</td>";
                    trHtml += "<td> <a href='javascript:' onclick='displayFrame(1)' id='modify'>修改</a>  |  <a href=''>删除</a></td>";
                    $("#dispensary_table").append(trHtml);
                }
            } else {
                alert(jsonData['msg']);
            }
        }
    })
}
function submitModify() {
    hideFrame();
}

