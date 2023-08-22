$(document).ready(()=>{

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('err');
    if (myParam) {
        $("errbox").val(myParam)
    }
    let ss = checkToken()
    let code = 0;
    ss.done((resp)=>{
        code = resp.code

    })
    if (code !== 1 ){
        console.log("token invalid")
        Cookies.remove("token")
    }
    console.log(Cookies.get("token")=== undefined)
    if (Cookies.get("token")=== undefined) {
        document.getElementById("popupLogin").showModal()
        document.getElementById("login").addEventListener("change", (ev) => {

            document.getElementById("capframe").src = `https://route.sandboxol.com/user/api/v1/vc/cimage?uid=${document.getElementById("login").value}&type=0&r=0.9685514427109945`


        })
    }
    else {
        document.getElementById("popupLogin").remove()
        $.ajax({
            url: './assets/botids.txt',
            type: 'get',
            success: function(result) {

                lines = result


            }
        }).then(()=>{
            let ids = lines.split("\n")

            let UserFriends = getFriends()
            for (let userFriend in UserFriends) {
                if (ids.includes(UserFriends[userFriend].toString())){
                    setTimeout(ebalrot,500,UserFriends[userFriend])
                }

            }



        });
    }
    let lines =""
    function ebalrot(id){

        let dat = $.ajax({
            url: `http://modsgs.sandboxol.com/friend/api/v1/friends?friendId=${id}`,
            headers: {
                "Access-Token": Cookies.get("token"),
                "userid": Cookies.get("id")
            },
            type: 'DELETE',
            async: false
        }).responseText
        document.getElementById("log").append(dat+"\n")
    }






})
function getFriends() {
    let resp = $.ajax({
        url: 'https://www.blockmango.com/cubo-api/friend/api/v1/friends',
        crossDomain: true,
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
            'access-token': Cookies.get("token"),
            'cache-control': 'no-cache',
            'language': 'ru_RU',
            'os_platform': 'web',
            'pragma': 'no-cache',
            'userid': Cookies.get("id")
        },
        data: {
            'pageSize': '500',
            'pageNo': '0'
        },
        dataType: 'json',
        async:false,

    }).responseJSON.data.data;

    let ids = []

    for (let respKey in resp) {


       ids.push(resp[respKey].userId)
    }

    return ids

}
function checkToken(){

    return $.ajax({
        url: 'https://www.blockmango.com/cubo-api/user/api/v1/user/details/info',
        crossDomain: true,
        method: 'post',
        async: false,
        headers: {

            'access-token': Cookies.get("token"),
            'applanguage': 'ru',
            'apptype': 'web',
            'appversion': '10014',
            'appversionname': '10014',
            'cache-control': 'no-cache',
            'channel': 'gruel',
            'eventtype': 'app',
            'language': 'ru_RU',

            'os': 'web',
            'os_platform': 'web',
            'package-name': 'com.app.blockmango',
            'package_name_en': 'com.sandboxol.blockymods',
            'packagename': 'com.app.blockmango',
            'packagenamefull': 'com.app.blockmango',
            'userdeviceid': Cookies.get("id"),
            'userid': Cookies.get("id"),
            'userlanguage': 'ru',
            'usertype': '0'
        },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify({})
    })

}
function onClickLogin() {
    const  login = document.getElementById("login").value
    const passwd = document.getElementById("password").value
    const captcha = document.getElementById("capval").value
    $.ajax({
        url: 'https://route.sandboxol.com/user/api/v1/login',
        crossDomain: true,
        method: 'post',
        headers: {
            'applanguage': 'ru',
            'apptype': 'web',
            'appversion': '10014',
            'appversionname': '10014',
            'cache-control': 'no-cache',
            'channel': 'sandbox',
            'language': 'ru_RU',
            'origin': 'https://www.blockmango.com',
            'os': 'web',
            'os_platform': 'web',
            'package-name': 'com.sandboxol.blockymods',
            'package_name_en': 'com.sandboxol.blockymods',
            'packagename': 'com.sandboxol.blockymods',
            'packagenamefull': 'com.sandboxol.blockymods',
            'platform': '',
            'pragma': 'no-cache',
            'referer': 'https://www.blockmango.com/',
            'userlanguage': 'ru'
        },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify({
            'appType': 'web',
            'uid': login,
            'platform': '',
            'password': passwd,
            'code': captcha
        })
    }).done(function(response) {
        if (response.code !== 1){
            window.location.replace(window.location+"?err="+encodeURIComponent(response.message))

        }
        Cookies.set("token",response.data.accessToken)
        Cookies.set("id",response.data.userId)
        Cookies.set("pfp",response.data.picUrl)
        Cookies.set("nick",response.data.nickName)
        document.getElementById("popupLogin").close()
        window.location.reload()
    });


}

