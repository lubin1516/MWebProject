/**
 * Created by lubin on 2017/5/14.
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function () {
    var titles = $('notice-tit').getElementsByTagName('li');
    var cons = $('notice-con').getElementsByTagName('div');
    if (titles.length != cons.length)return;
    for (var i = 0; i < titles.length; i++) {
        titles[i].id = i;
        titles[i].onclick = function () {
            for (var j = 0; j < titles.length; j++) {
                titles[j].className = '';
                cons[j].style.display = 'none'
            }
            this.className = 'select';
            cons[this.id].style.display = 'block';
        }

    }
};