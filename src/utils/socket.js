/**
 * 一个WebSocket简单封装
 * @param host
 * @param options
 * @returns {Function}
 */
export default function funsocket( host, options ){
    const defaultOptions = {
        host: 'gcmdb.fun.tv',
        path:'/wss',
        onopen:function(){},
        onclose:function(){},
        onerror:function(){},
        onmessage:function(){}
    };
    return function(){
        const newOptions = { ...defaultOptions, ...options };
        console.log("....init socket", "ws://" + newOptions.host +  newOptions.path)
        let conn = null;
        try{
            conn  = new WebSocket("ws://" + newOptions.host +  newOptions.path);
        }catch(e){
            newOptions.onerror({ code:4001,message:"不支持WebSocket"})
        }
        conn.onclose = function(evt) {
            console.log(".....")
            newOptions.onclose( evt );
        };
        conn.onmessage = function(evt) {
            console.log("............meesage")
            var result = null;
            try{
                result = JSON.parse(evt.data);
            }catch(e){}
            newOptions.onmessage( evt );
            /*
            var result = JSON.parse(evt.data);

            console.log(result);
            if (result.active === "CallBackTask" ){
                appendtask($("<tr><td class=\"active\" ><p>" + result.Data.ip + "<p></td><td class=\"success\">"  + result.Data.status + "</td><td class=\"info\"><pre>" + result.Data.msg + "</pre></td><td class=\"warning\">" + result.Data.time + "</td></tr>"))
            }else{
                appendLog($("<tr><td class=\"active\" ><p>" + result.Data.ip + "<p></td><td class=\"success\">"  + result.code + "</td><td class=\"info\"><pre>" + result.msg + "</pre></td><td class=\"warning\">" + result.time + "</td></tr>"))
            }
            */
        };
        conn.onopen = function(e) {
            console.log("socket open", e);
            conn.send('{"active": "login"}');
            newOptions.onopen(e);
        };
        return conn;
    }
};