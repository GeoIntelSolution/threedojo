onmessage=function(event){
    const result =event.data
    postMessage({
        type:'Love for cmf',
        msg:result
    })
}