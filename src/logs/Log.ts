import {config} from "../config.js";

export class Log {
    public static info(data: any, prefix: string = "INFO") {
        this.send(() => {
            console.log(this.format(prefix), data);
        });
    }

    public static warn(data: any, prefix: string = "WARN") {
        this.send(() => {
            console.warn(this.format(prefix), data);
        });
    }
    public static error(data: any, prefix: string = "ERROR") {
        this.send(() => {
            console.warn(this.format(prefix), data);
        });
    }
    public static debug(data: any, prefix: string = "DEBUG") {
        this.send(() => {
            console.debug(this.format(prefix), data);
        });
    }

    private static send(callback: () => void) {
        if (config.DEBUG) { callback(); }
    }
    private static format(prefix: string): string {
        return "[FCK-TON | " + prefix + "] ";
    }
}
