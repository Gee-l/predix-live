import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farm } from './models/farm'
import { Node } from './models/node'
import { Sensor } from './models/sensor'

@Injectable()
export class NodesEndpointService {
  private url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  getAllNodes() {
    return this.http.get(this.url);
  }

  getNode(node, limit) {
    return this.http.get(this.url);//`http://smart-iot.bcx.co.za/iiot.cloud/services/sensors/node/${node}/1518688544/${limit}`);
  }

  getFarm(): Farm {
    let farm: Farm = new Farm();
    farm.name = "I dont know the name";
    farm.description = "this is the farm description";
    farm.uri = "/farm/1";
    farm.location = {lat: -33.5049805, lng: 19.5635469 }
    farm.nodes = this.getNodes(farm.uri);
    return farm;
  }

  getNodes(farmUri): Node[] {
    //Make a GEL query for nodes that match the given farm uri
    //Call get sensors for each node
     let nodes: Node[] = [];
      var APIJson = [
        {
          "uri": "/node/1",
          "name": "Node1",
          "manufacturer": "COMSOL",
          "location": {
            "lat":-33.50489829329936,
            "long": 19.564772844314575
          },
          "farm": "/farm/1"
        },
        {
          "uri": "/node/2",
          "name": "Node2",
          "manufacturer": "COMSOL",
          "location": {
            "lat": -33.50548873507302,
            "long": 19.563560485839844
          },
          "farm": "/farm/1"
        },
        {
          "uri": "/node/3",
          "name": "Node3",
          "manufacturer": "COMSOL",
          "location": {
            "lat": -33.50622230863511,
            "long": 19.56491231918335
          },
          "farm": "/farm/1"
        },
        {
          "uri": "/node/4",
          "name": "Node4",
          "manufacturer": "COMSOL",
          "location": {
            "lat": -33.507716274589654,
            "long": 19.565019607543945
          },
          "farm": "/farm/1"
        },
        {
          "uri": "/node/5",
          "name": "Node5",
          "manufacturer": "COMSOL",
          "location": {
            "lat":-33.507134793900434,
            "long": 19.566253423690796
          },
          "farm": "/farm/1"
        },
        {
          "uri": "/node/6",
          "name": "Node6",
          "manufacturer": "COMSOL",
          "location": {
            "lat": -32.434396,
            "long": 8.951497
          },
          "farm": "/farm/3"
        }
      ];

    APIJson.forEach((node, index) => {
      console.log(" ---------------- Each node farm uri = ", node.farm);
      if(node.farm == farmUri)
        nodes.push(new Node(node.uri, node.name, node.manufacturer, node.location, this.getSensors(node.uri)));
    });

    return nodes;
  }

  getSensors(nodeUri): Sensor[] {
    //Make a GEL query for sensors that match a specific node uri
    let sensorAPI = [
      {
        "uri": "/sensor/Bethlehem-Node1-Sensor1",
        "assetId": "Sensor13",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/5",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Bethlehem-Node1-Sensor2",
        "assetId": "Sensor14",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/5",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Bethlehem-Node1-Sensor3",
        "assetId": "Sensor15",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/5",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Bethlehem-Node2-Sensor1",
        "assetId": "Sensor16",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/6",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Bethlehem-Node2-Sensor2",
        "assetId": "Sensor17",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/6",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Bethlehem-Node2-Sensor3",
        "assetId": "Sensor18",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/6",
        "farm": "/farm/3"
      },
      {
        "uri": "/sensor/Hendrina-Node1-Sensor1",
        "assetId": "Sensor1",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/1",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/Hendrina-Node1-Sensor2",
        "assetId": "Sensor2",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/1",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/Hendrina-Node1-Sensor3",
        "assetId": "Sensor3",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/1",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/Hendrina-Node2-Sensor1",
        "assetId": "Sensor4",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/2",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/Hendrina-Node2-Sensor2",
        "assetId": "Sensor5",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/2",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/Hendrina-Node2-Sensor3",
        "assetId": "Sensor6",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/2",
        "farm": "/farm/1"
      },
      {
        "uri": "/sensor/HexRivier-Node1-Sensor1",
        "assetId": "Sensor7",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/3",
        "farm": "/farm/2"
      },
      {
        "uri": "/sensor/HexRivier-Node1-Sensor2",
        "assetId": "Sensor8",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/3",
        "farm": "/farm/2"
      },
      {
        "uri": "/sensor/HexRivier-Node1-Sensor3",
        "assetId": "Sensor9",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/3",
        "farm": "/farm/2"
      },
      {
        "uri": "/sensor/HexRivier-Node2-Sensor1",
        "assetId": "Sensor10",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/4",
        "farm": "/farm/2"
      },
      {
        "uri": "/sensor/HexRivier-Node2-Sensor2",
        "assetId": "Sensor11",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/4",
        "farm": "/farm/2"
      },
      {
        "uri": "/sensor/HexRivier-Node2-Sensor3",
        "assetId": "Sensor12",
        "category": "moisture",
        "dataType": "/datatype/soilMoisture",
        "dataFrequency": "180",
        "node": "/node/4",
        "farm": "/farm/2"
      }
    ];
    
    let sensors: Sensor[] = [];
    sensorAPI.forEach((sensor, index) => {
      console.log(" ---------------- Each sensor node uri = ", sensor.node);
      if(sensor.node == nodeUri)
        sensors.push(new Sensor(sensor.uri, sensor.assetId, sensor.category, sensor.dataType, parseInt(sensor.dataFrequency)));
    });

    return sensors;
  }
}