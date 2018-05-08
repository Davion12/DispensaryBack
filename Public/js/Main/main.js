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
        window.onload = displayWindowInfo();
    });

    $('#main_page').click(function () {
        $("#changePage").load("./changeMainPage");
        transferNego("#main_page");
    });

    $('#account_page').click(function () {
        $("#changePage").load("./changeAccountPage");
        transferNego("#account_page");
        window.onload = displayAccountInfo();
    });

    $('#dispensary_page').click(function () {
        $("#changePage").load("./changeDispensaryPage");
        transferNego("#dispensary_page");
        window.onload = displayDispensaryInfo(1);
    });
});


function chooseDispensary() {
    $("#changePage").load("./changeDispensaryPage");
    transferNego("#dispensary_page");
    window.onload = displayDispensaryInfo(1);
}

function chooseWindow() {
    $("#changePage").load("./changeWindowPage");
    transferNego("#window_page");
    window.onload = displayWindowInfo();
}

function chooseUser() {
    $("#changePage").load("./changeAccountPage");
    transferNego("#account_page");
    window.onload = displayAccountInfo();
}


var dispensaryInfo;
var windowInfo;
var accountInfo;


function transferNego(id) {
    $("#window_page").attr("class", "noactive");
    $("#main_page").attr("class", "noactive");
    $("#account_page").attr("class", "noactive");
    $("#dispensary_page").attr("class", "noactive");
    $(id).attr("class", "active");
}

function displayFrame(type, id) {
    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);
    $("textarea").html("");
    if(id)
    {
        if (type === 1) {
            var index = findIndex(dispensaryInfo, id);
            $('#dispensary_id').html(dispensaryInfo[index]["room_id"]);
            $('#dispensary_name').html(dispensaryInfo[index]["room_name"]);
            $('#rule').html(dispensaryInfo[index]["rule"]);
        } else if (type === 2) {
            var index = findIndex(windowInfo, id);
            $('#dispensary_id').html(windowInfo[index]["window_id"]);
            $('#dispensary_name').html(windowInfo[index]["window_name"]);
            $('#rule').html(windowInfo[index]["room_id"]);
        } else {
            var index = findIndex(accountInfo, id);
            $('#dispensary_id').html(accountInfo[index]["account_id"]);
            $('#dispensary_name').html(accountInfo[index]["account_name"]);
            $('#rule').html(accountInfo[index]["display_name"]);
            $('#pwd').html(accountInfo[index]["password"]);
        }
        $('#dispensary_id').attr("readonly", "readonly");
    } else {
        $('#dispensary_id').removeAttr("readonly");
    }

}

function deleteContent(type, id) {
    if (type == 1) {
        var index = findIndex(dispensaryInfo, id);
        if (index !== -1) {
            //药房删除
            $.ajax({
                url: "../Page/deleteDispensaryInfo",
                type: "post",
                data: {'room_id': dispensaryInfo[index]["room_id"]},
                dataType: 'json',
                success: function (jsonData) {
                    if (jsonData === 1) {
                        alert("删除成功");
                        displayDispensaryInfo(0);
                    } else {
                        alert("删除失败");
                    }
                }
            })
        } else {
            alert("请选中");
        }
    } else if (type == 2) {
        //窗口删除
        var index = findIndex(windowInfo, id);
        if (index !== -1) {
            //药房删除
            $.ajax({
                url: "../Page/deleteWindowInfo",
                type: "post",
                data: {'window_id': windowInfo[index]["window_id"]},
                dataType: 'json',
                success: function (jsonData) {
                    if (jsonData === 1) {
                        alert("删除成功");
                        displayWindowInfo();
                    } else {
                        alert("删除失败");
                    }
                }
            })
        } else {
            alert("请选中");
        }
    } else {
        //账号删除
        //窗口删除
        var index = findIndex(accountInfo, id);
        if (index !== -1) {
            //药房删除
            $.ajax({
                url: "../Page/deleteAccountInfo",
                type: "post",
                data: {'account_id': accountInfo[index]["account_id"]},
                dataType: 'json',
                success: function (jsonData) {
                    if (jsonData === 1) {
                        alert("删除成功");
                        displayAccountInfo();
                    } else {
                        alert("删除失败");
                    }
                }
            })
        } else {
            alert("请选中");
        }
    }
}

function hideFrame() {
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
}

function displayDispensaryInfo(type) {
    $.ajax({
        url: "../Page/getDispensaryInfo",
        type: "GET",
        success: function (jsonData) {
            dispensaryInfo = jsonData;
            $('#dispensary_table').find("td").remove();
            for (var i = 0; i < jsonData.length; i++) {
                var trHtml = "<tr>";
                trHtml += "<td>" + jsonData[i]["room_id"] + "</td>";
                trHtml += "<td>" + jsonData[i]["room_name"] + "</td>";
                trHtml += "<td>" + jsonData[i]["rule"] + "</td>";
                trHtml += "<td> <a href='javascript:' onclick='displayFrame(1, " + jsonData[i]['room_id'] + ")' id='modify'>修改</a>  |  <a href='javascript:void(0)' onclick='deleteContent(1, " + jsonData[i]['room_id'] + ")'>删除</a></td>";
                $("#dispensary_table").append(trHtml);
            }
        }
    })
}


function displayWindowInfo() {
    $.ajax({
        url: "../Page/getWindowInfo",
        type: "GET",
        success: function (jsonData) {
            windowInfo = jsonData;
            $('#dispensary_table').find("td").remove();
            for (var i = 0; i < jsonData.length; i++) {
                var trHtml = "<tr>";
                trHtml += "<td>" + jsonData[i]["window_id"] + "</td>";
                trHtml += "<td>" + jsonData[i]["window_name"] + "</td>";
                trHtml += "<td>" + jsonData[i]["room_id"] + "</td>";
                trHtml += "<td> <a href='javascript:' onclick='displayFrame(2, " + jsonData[i]['window_id'] + ")' id='modify'>修改</a>  |  <a href='javascript:void(0)' onclick='deleteContent(2, " + jsonData[i]['window_id'] + ")'>删除</a></td>";
                $("#dispensary_table").append(trHtml);
            }

        }
    })
}

function displayAccountInfo() {
    $.ajax({
        url: "../Page/getAccountInfo",
        type: "GET",
        success: function (jsonData) {
            accountInfo = jsonData;
            $('#dispensary_table').find("td").remove();
            for (var i = 0; i < jsonData.length; i++) {
                var trHtml = "<tr>";
                trHtml += "<td>" + jsonData[i]["account_id"] + "</td>";
                trHtml += "<td>" + jsonData[i]["account_name"] + "</td>";
                trHtml += "<td>" + jsonData[i]["display_name"] + "</td>";
                trHtml += "<td>" + jsonData[i]["password"] + "</td>";
                trHtml += "<td> <a href='javascript:' onclick='displayFrame(3, " + jsonData[i]['account_id'] + ")' id='modify'>修改</a>  |  <a href='javascript:void(0)' onclick='deleteContent(3, " + jsonData[i]['account_id'] + ")'>删除</a></td>";
                $("#dispensary_table").append(trHtml);
            }
        }
    })
}

function findIndex(source, value) {
    for (var i = 0; i < source.length; i++) {
        for (var key in source[i]) {
            if (value == source[i][key]) {
                return i;
            }
        }
    }
    return -1;
}

function submitModify(part) {
    if (part == 1) {
        //药房修改
        var params = {
            "room_id": $('#dispensary_id').val(),
            "room_name": $('#dispensary_name').val(),
            "rule": $('#rule').val()
        };
        $.ajax({
            url: "../Page/modifyDispensaryInfo",
            type: "POST",
            data: params,
            dataType: "json",
            success: function (jsonData) {
                if (jsonData !== 0) {
                    alert("修改成功");
                } else {
                    alert("修改失败");
                }
                hideFrame();
                displayDispensaryInfo(0);
            }
        })
    } else if (part == 2) {
        //窗口修改
        var params = {
            "window_id": $('#dispensary_id').val(),
            "window_name": $('#dispensary_name').val(),
            "room_id": $('#rule').val()
        };
        $.ajax({
            url: "../Page/modifyWindowInfo",
            type: "POST",
            data: params,
            dataType: "json",
            success: function (jsonData) {
                if (jsonData !== 0) {
                    alert("修改成功");
                } else {
                    alert("修改失败");
                }
                hideFrame();
                displayWindowInfo();
            }
        })
    } else {
        var params = {
            "account_id": $('#dispensary_id').val(),
            "account_name": $('#dispensary_name').val(),
            "display_name": $('#rule').val(),
            "password": $('#pwd').val()
        };
        $.ajax({
            url: "../Page/modifyAccountInfo",
            type: "POST",
            data: params,
            dataType: "json",
            success: function (jsonData) {
                if (jsonData !== 0) {
                    alert("修改成功");
                } else {
                    alert("内容一致，无需修改");
                }
                hideFrame();
                displayAccountInfo();
            }
        })
    }
}

