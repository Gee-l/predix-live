import { Sensor } from './sensor'

export class Node {
    uri: string
    name: string
    manufacturer: string
    location: {}
    sensors: Sensor[]
}