import { Sensor } from './sensor'

export class Node {
    uri: string
    name: string
    manufacturer: string
    location: {}
    sensors: Sensor[]
    status: string
    description: string

    NodeConstructor(uri, name, manufacturer, location, sensors) {
        this.uri = uri;
        this.name = name;
        this.manufacturer = manufacturer;
        this.location = location;
        this.sensors = sensors;
    }

    constructor(uri: string, name:string, manufacturer:string, location:{}, sensors:Sensor[], status: string, description: string) {
        this.uri = uri;
        this.name = name;
        this.manufacturer = manufacturer;
        this.location = location;
        this.sensors = sensors;
        this.status = status;
        this.description = description
    }
}