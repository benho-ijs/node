define("hello", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.helloWorld = void 0;
    function helloWorld() {
        return 'Hello World';
    }
    exports.helloWorld = helloWorld;
});
define("index", ["require", "exports", "hello"], function (require, exports, hello_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HelloWorld {
        message(channel, msg) {
        }
        async route(session, request, response) {
            if (request.path == '/job') {
                let job;
                try {
                    job = await session.plugins.queue.createJob('job_queue_1', request.query, true);
                    response.end(JSON.stringify(job, null, 4));
                }
                catch (err) {
                    console.dir('exception');
                    console.dir(err.message);
                }
            }
            else if (request.path == '/message') {
                session.plugins.message.publish(0, JSON.stringify(request.query));
                response.end(JSON.stringify({
                    action: 'publish_message',
                    channel: 0,
                    msg: request.query
                }, null, 4));
            }
            else if (request.path == '/cache') {
                let key = 'cache_key';
                let data = '';
                try {
                    data = await session.plugins.cache.get(key);
                    await session.plugins.cache.set(key, request.query);
                }
                catch (err) { }
                response.end(JSON.stringify({
                    cachedData: data
                }, null, 4));
            }
            else if (request.path == '/db') {
                let con = session.plugins.db.getConnection('db1');
                try {
                    let result = await con.query('select sysdate()');
                    response.end(JSON.stringify({
                        result: result
                    }, null, 4));
                }
                catch (err) {
                    console.dir(err.message);
                }
            }
            else {
                response.end(JSON.stringify({
                    method: request.method,
                    path: request.path,
                    url: request.url,
                    origUrl: request.origUrl,
                    datetime: new Date(),
                    result: hello_1.helloWorld(),
                    query: request.query || '',
                    params: request.params || '',
                    body: request.body || '',
                    session: {
                        params: session.params
                    }
                }, null, 4));
            }
            return true;
        }
    }
    exports.default = HelloWorld;
});