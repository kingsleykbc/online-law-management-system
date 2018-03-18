module.exports = {
    toggleLightBox(id) {
        var box = document.getElementById(id);

        //LightBox Animation
        if (box.style.display !== 'block') {
            var op = 0;
            var it = setInterval(() => {
                op += 0.1;

                box.style.display = 'block';
                box.style.opacity = op;

                if (op >= 1) {
                    op = 1;
                    clearInterval(it);
                };
            }, 20);
        } else {
            op = 1;
            it = setInterval(() => {
                op -= 0.1;
                box.style.opacity = op;

                if (op <= 0) {
                    box.style.display = 'none';
                    clearInterval(it);
                };
            }, 20);
        }
    },
    dismissDOM(id){
        //Remove a message after it has been added
        var dom = document.getElementById(id);
        
        setTimeout(() => {
          dom.style.opacity = 0;
        }, 1000);

        setTimeout(() => {          
          dom.style.display="none";
        }, 5000);
    }
}