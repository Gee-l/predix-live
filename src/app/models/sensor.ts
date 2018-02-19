export class Sensor {
    uri: string
    assetId: string
    category: string
    dataType: string
    dataFrequency: number

    constructor(uri: string, assetId: string, category: string, dataType: string, dataFrequency: number) {
        this.uri = uri;
        this.assetId = assetId;
        this.category = category;
        this.dataType = dataType;
        this.dataFrequency = dataFrequency;
    }
}