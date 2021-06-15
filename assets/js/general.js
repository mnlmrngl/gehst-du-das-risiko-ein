document.getElementById('restart').addEventListener('click', function(){
    var cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {

        var cookieName = (cookieArray[i].substr(0, cookieArray[i].indexOf('=')));
        document.cookie = cookieName + '= ; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"';
        document.location = '/'
    }
});

