import Path from 'path';
const RootPath = process.cwd();
import {AppServer} from './index'
var Config: any;
var SCConfig: any;
try{
    if (process.argv[2])
        Config = require(Path.join(RootPath, process.argv[2]));
    SCConfig = require(Path.join(RootPath, 'scconfig.json'));
}
catch(err){};
Config = Config || {};
async function main(){
    let appServer = new AppServer({
        http: { 
            port: Config.router?.port || 8080,
            cors: Config.router?.cors || false
        },
        schedule: {
            
        }
    });
    if (SCConfig.router)
        appServer.httpServer.addDomainPackage(Config.domain || 'localhost', {
            baseUrl: Config.router?.baseUrl || SCConfig.router.baseUrl, 
            packagePath: Path.resolve(RootPath, './'),
            params: Config.router?.params || SCConfig.router.params,
            options: {
                plugins: Config.plugins
            }
        });
    if (SCConfig.scheduler)
        appServer.scheduler.addDomainPackage(Config.domain || 'localhost', {
            packagePath: Path.resolve(RootPath, './'),
            params: Config.scheduler?.params || SCConfig.scheduler.params,
            schedules: Config.scheduler?.schedules || SCConfig.scheduler.schedules || [],
            options: {
                plugins: Config.plugins
            }
        });
    await appServer.start();
};
main();


