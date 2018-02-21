export class Sensor {
    uri: string
    tag: string
    category: string
    dataFrequency: number
    treshold: any
    readings: any[]
    lastReading: any
    uom: string

    constructor(uri: string, tag: string, category: string, dataFrequency: number, readings: any[], treshold: any, lastReading, uom: string) {
        this.uri = uri;
        this.tag = tag;
        this.category = category;
        this.dataFrequency = dataFrequency;
        this.readings = readings;
        this.treshold = treshold;
        this.lastReading = lastReading;
        this.uom = uom;
    }
}