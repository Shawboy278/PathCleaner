import { IEnvironment } from './IEnvironment';

export class Environment implements IEnvironment {
    public get platform() {
        return process.platform;
    }

    public get now(): Date {
        return new Date(Date.now());
    }
}
