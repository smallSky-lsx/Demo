/*
 * @Author: Admin_CXx
 * @Date:   2021-02-11 16:31:26
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-02-11 20:41:53
 */
function ajax(options) {
    var url = options.url || '',
        type = options.type || 'get',
        data = options.data || '',
        async = options.async || true,
            success = options.success,
            error = options.error;
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            success && success(JSON.parse(this.responseText));
        }
    };
    xhr.onerror = function(e) {
        error && error(new Error(e));
    };
    type = type.toUpperCase();
    if (type === 'GET') {
        url = data ? url + '?' + data : url;
        xhr.open(type, url, async);
        xhr.send();
    } else if (type === 'POST') {
        xhr.open(type, url, async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}