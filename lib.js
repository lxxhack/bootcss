function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}

class Store{
    add(input){
        if (localStorage.student != undefined) {
            let data = JSON.parse(localStorage.student);
            if (typeof data.list != typeof []) {
                delete localStorage.student;
                data.list = []
            }
            data.list.push(input);
            localStorage.student = JSON.stringify(data);
        }
        else {
            let data = {}
            data.list = [input]
            localStorage.student = JSON.stringify(data);
        }
    }
    get(input){
        if (localStorage.student==undefined){
            return;
        }
        let data=JSON.parse(localStorage.student);
        if (typeof data.list!=typeof []){
            return
        }
        for (item of data.list){
            if (item.StudentNo==input){
                return item;
            }
        }
    }
    getAll(){
        if (localStorage.student==undefined){
            return;
        }
        let data=JSON.parse(localStorage.student);
        if (typeof data.list!=typeof [] || data.list.length==0){
            return
        }
        return data.list;
    }
    del(input){
        let data=JSON.parse(localStorage.student);
        for (let index=0;index<data.list.length;index++){
            if (data.list[index].StudentNo==input){
                data.list.splice(index,1);
                localStorage.student = JSON.stringify(data);
                return true;
            }
        }
        return false;
    }
    alter(input){
        let data=JSON.parse(localStorage.student);
        for (let index=0;index<data.list.length;index++){
            if (data.list[index].StudentNo==input.StudentNo){
                data.list[index]=input;
                localStorage.student = JSON.stringify(data);
                return true;
            }
        }
        return false;
    }
}