let elems = [
    document.getElementById('hour1'),
    document.getElementById('hour2'),
    document.getElementById('minute1'),
    document.getElementById('minute2'),
    document.getElementById('second1'),
    document.getElementById('second2'),
];

function update(){
    const d = new Date();
    const hour = ('0' + d.getHours()).slice(-2);
    const minute = ('0' + d.getMinutes()).slice(-2);
    const second = ('0' + d.getSeconds()).slice(-2);
    const now = hour + minute + second;
    for (let index = 0; index < elems.length; index++) {
        elems[index].className = 'timebar n' + now[index];
    }
}
update();
setInterval(update,1000);