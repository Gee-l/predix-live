import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farm } from './models/farm'
import { Node } from './models/node'
import { Sensor } from './models/sensor'
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Observable as Rx } from 'rxjs'
import { parse } from 'path';
import { mergeMap } from 'rxjs/operator/mergeMap';
let async = require('../../node_modules/async');

@Injectable()
export class NodesEndpointService {
  bcxFarm: Farm;
  constructor(private http: HttpClient) { }

  getDataPoints(nodeName, tag) {
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/datapoints?limit=10&node=${nodeName}&sensor=${tag}`);
  }

  getFarm() {
    let farm: Farm = null;
    return this.http.get("https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/63f2a245-4f66-42ba-bf6f-decc73f09abd")
      .pipe(map((_farm: any) => {

        farm = new Farm(_farm.uri, _farm.name, _farm.description, _farm.location, new Array<Node>());
        return Rx.from(_farm.nodes)
          .map((node:any, nodeIndex) => {

            farm.nodes.push(new Node(node.uri, node.name, node.manufacturer, node.location, new Array<Sensor>(), node.status));
            return Rx.from(node.sensors)
              .map((sensor: any, sensorIndex) => {

                farm.nodes[nodeIndex].sensors.push(new Sensor(sensor.uri, sensor.tag, sensor.category, sensor.dataFrequency, new Array(), sensor.treshold));
                return this.getDataPoints(node.name, sensor.tag)
                  .pipe(map((readings:any) => {

                    farm.nodes[nodeIndex].sensors[sensorIndex].readings = readings;
                    return farm;
                  }))
              })
          });
      }))
  }
  /*
  getNodes() {
    return this.http.get('http://localhost:3000/nodes/63f2a245-4f66-42ba-bf6f-decc73f09abd')
      .pipe(map((nodes:any) => {
        return Rx.from(nodes)
          .switchMap((node: any) => {
            return Rx.of(node);
          })
      }));
  }

  getNodes2() {
    return this.http.get('http://localhost:3000/nodes/63f2a245-4f66-42ba-bf6f-decc73f09abd')
  }

  getNodeSensors(nodes) {

  }

  getSensors(nodeUri) {
    return this.http.get(`http://localhost:3000/sensors/${nodeUri}`);
  }

  addSensorsToNodes(nodes) {
    return Rx.from(nodes)
      .map((node:any) => {
        return this.getSensors(node.uri.split('/')[2])
          .pipe(map((sensors:any) => {
            node.sensors = sensors;
            return node;
          }))
      });
  }

  getDataPerSensor(sensors) {
    return Rx.from(sensors)
      .map((sensor: any) => {
        return this.getDataPoints(sensor.tag)
          .pipe(map((dataPoint:any) => {
            sensor.reading = dataPoint;
            return sensor;
          }))
      })
  }

  getDataPerSensor2(sensors) {
    return Rx.from(sensors)
      .map((sensor: any) => {
        return this.getDataPoints(sensor.tag)
          .pipe(map((dataPoint:any) => {
            sensor.reading = dataPoint;
            return sensor;
          }))
      })
  }

  addSensorReadings(node) {
    return Rx.from(node.sensors)
      .map((sensor: any, index) => {
        return this.getDataPoints(sensor.tag)
          .pipe(map((data: any) => {
            sensor.readings = data;
            node.sensors[index] = sensor;
            return node;
          }));
      })
  }

  getDataPoints(tag) {
    return this.http.get(`http://localhost:3000/datapoints/${tag}`)
  }*/

  /*getFarm(): Farm {
    let farm: Farm = new Farm("/farm/1", "Farm 1", "this is the farm description", {lat: -33.5049805, lng: 19.5635469 }, this.getNodes("/farm/1"));
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
          "status": "ON",
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
          "status": "OFF",
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
          "status": "ON",
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
          "status": "OFF",
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
          "status": "ON",
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
          "status": "ON",
          "location": {
            "lat": -32.434396,
            "long": 8.951497
          },
          "farm": "/farm/3"
        }
      ];

    APIJson.forEach((node, index) => {
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
      if(sensor.node == nodeUri)
        sensors.push(new Sensor(sensor.uri, sensor.assetId, sensor.category, sensor.dataType, parseInt(sensor.dataFrequency)));
    });

    return sensors;
  }

  getAPIFarm(){
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/63f2a245-4f66-42ba-bf6f-decc73f09abd`);
  }

  popNodes(nodes) {
    return Rx.from(nodes)
      .flatMap((node:any) => {
        return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${node.name}`);
      })
  }

  popSensor(nodeName, tag): Observable<any> {
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/datapoints?node=${nodeName}&order=asc&sensor=${tag}&limit=4`);
  }*/
}