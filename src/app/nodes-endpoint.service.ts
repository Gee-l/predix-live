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

  getFarm(farmUri) {
    let farm: Farm = null;
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${farmUri}`)
      .pipe(map((_farm: any) => {

        farm = new Farm(_farm.uri, _farm.name, _farm.description, _farm.location, new Array<Node>());
        return Rx.from(_farm.nodes)
          .map((node:any, nodeIndex) => {
            
            farm.nodes.push(new Node(node.uri, node.name, node.manufacturer, node.location, new Array<Sensor>(), node.status));
            return Rx.from(node.sensors)
              .map((sensor: any, sensorIndex) => {
                
                farm.nodes[nodeIndex].sensors.push(
                  new Sensor(sensor.uri, sensor.tag, sensor.category, sensor.dataFrequency, new Array(), sensor.treshold, null, sensor.uom));
                return this.getDataPoints(node.name, sensor.tag)
                  .pipe(map((readings:any) => {

                    farm.nodes[nodeIndex].sensors[sensorIndex].readings = readings;
                    Object.keys(readings[readings.length - 1])
                      .forEach(key => {
                        if(key == "Humidity" || key == "InternalTemperature" || key == "Temperature" ||  key == "Bat" || key == "Motion" || key == "Light")
                          farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = readings[readings.length - 1][key];
                      });
                    return farm;
                  }));
              });
          });
      }));
  }

  getFarms() {
    return this.http.get("https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm")
      .pipe(map((farms:any) => {
        return Rx.of(farms);
      }));
  }
}