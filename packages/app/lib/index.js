"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const http_1 = require("@ijstech/http");
const schedule_1 = require("@ijstech/schedule");
const queue_1 = require("@ijstech/queue");
;
;
;
class AppServer {
    constructor(options) {
        this.options = options;
    }
    async start() {
        if (this.running)
            return;
        if (this.options.http && (this.options.http.port || this.options.http.securePort)) {
            this.httpServer = new http_1.HttpServer(this.options.http);
            this.httpServer.start();
        }
        ;
        if (this.options.schedule) {
            this.scheduler = new schedule_1.Scheduler(this.options.schedule);
            this.scheduler.start();
        }
        if (this.options.queue) {
            this.queue = new queue_1.Queue(this.options.queue);
            this.queue.start();
        }
        this.running = true;
    }
    ;
}
exports.AppServer = AppServer;
;