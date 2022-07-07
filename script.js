function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}



let currentdate = new Date()
let updatedate
let resetdate
let hourdata = {
    "NA": {
        resethour: 20,
        updatehour: 5,
    },
}
let resethour = hourdata["NA"].resethour
let updatehour = hourdata["NA"].updatehour
function UpdateEndDate(){
    updatedate = new Date()
    resetdate = new Date()
    if (resetdate.getUTCHours() >= resethour) {
        resetdate.setUTCDate(resetdate.getUTCDate() + 1)
    }
    if (updatedate.getUTCHours() >= updatehour) {
        updatedate.setUTCDate(updatedate.getUTCDate() + 1)
    }
    resetdate.setUTCHours(resethour, 0, 0, 0)
    updatedate.setUTCHours(updatehour, 0, 0, 0)
}

UpdateEndDate()

let x

function UpdateTimers() {
    let currentdate = new Date()
    let distance = resetdate.getTime() - currentdate.getTime();
    let distance2 = updatedate.getTime() - currentdate.getTime();

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    let hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    let seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
    

    if (!document.getElementById("reset")) {
        clearInterval(x);
        return;
    }
    if (distance <= 0) {
        resetdate.setUTCDate(resetdate.getUTCDate() + 1)
        resetdate.setUTCHours(resethour, 0, 0, 0)
    }
    if (distance2 <= 0) {
        updatedate.setUTCDate(updatedate.getUTCDate() + 1)
        updatedate.setUTCHours(updatehour, 0, 0, 0)
    }

    document.getElementById("reset").innerHTML = hours.toString().padStart(2, '0') + ":"
        + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
    document.getElementById("update").innerHTML = hours2.toString().padStart(2, '0') + ":"
        + minutes2.toString().padStart(2, '0') + ":" + seconds2.toString().padStart(2, '0')
        $("#reset.date").text(resetdate.toDateString() + " " + resetdate.toTimeString().split(" ")[0])
        $("#update.date").text(updatedate.toDateString() + " " + updatedate.toTimeString().split(" ")[0])
    }

waitForElm('#reset').then((elem) => {
    UpdateTimers()
    x = setInterval(function () {
        UpdateTimers()
    }, 1000);
})