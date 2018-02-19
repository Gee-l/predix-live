import { Sensor } from './sensor'

export class Node {
    uri: string
    name: string
    manufacturer: string
    location: {}
    sensors: Sensor[]

    NodeConstructor(uri, name, manufacturer, location, sensors) {
        this.uri = uri;
        this.name = name;
        this.manufacturer = manufacturer;
        this.location = location;
        this.sensors = sensors;
    }

    constructor(uri: string, name:string, manufacturer:string, location:{}, sensors:Sensor[]) {
        this.uri = uri;
        this.name = name;
        this.manufacturer = manufacturer;
        this.location = location;
        this.sensors = sensors;
    }
}