function absorbEventWrapper(func){
    function wrappedfunc(e) {
        e.stopPropagation();
        return func(e)
    }
    return wrappedfunc
  }

function absorbEvents(elem, etype=['mouseup','touchend']) {
    for (let et of etype) {
        elem.addEventListener(et, function (e) {
            e.stopPropagation();
        }, true)
    }
}