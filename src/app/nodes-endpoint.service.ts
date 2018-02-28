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
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/datapoints?timeseries=false&limit=10&order=desc&startValue=1&startPeriod=w&sensor=${tag}&resolution=3600&node=${nodeName}`);
  }

  private _getFarmObervables(farmUri) {
    let farm: Farm = null;
    return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${farmUri}`)
      .pipe(map((_farm: any) => {

        farm = new Farm(_farm.uri, _farm.name, _farm.description, _farm.location, new Array<Node>());
        return Rx.from(_farm.nodes)
          .map((node:any, nodeIndex) => {
            
            farm.nodes.push(new Node(node.uri, node.name, node.manufacturer, node.location, new Array<Sensor>(), node.status, node.description));
            return Rx.from(node.sensors)
              .map((sensor: any, sensorIndex) => {
                
                farm.nodes[nodeIndex].sensors.push(
                  new Sensor(sensor.uri, sensor.tag, sensor.category, sensor.dataFrequency, new Array(), sensor.treshold, null, sensor.uom));
                return this.getDataPoints(node.name, sensor.tag)
                  .pipe(map((readings:any) => {

                    farm.nodes[nodeIndex].sensors[sensorIndex].readings = readings;
                    if (readings[readings.length - 1])
                      farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = readings[readings.length - 1].value;
                    else
                      farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = 0;
                    return farm;
                  }));
              });
          });
      }));
  }

  getAllInfo() {
    var farms_main:Farm[] = new Array<Farm>();
    return this.getFarms()
      .pipe(map((farms: any, index) => {
        return Rx.from(farms)
          .map((farms: any, farmIndex) => {
            return Rx.of(farms)
              .map((farm: any) => {
                return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${farm.uri.split('/')[2]}`)
              .pipe(map((_farm: any) => {

                farms_main[farmIndex] = new Farm(_farm.uri, _farm.name, _farm.description, _farm.location, new Array<Node>());
                return Rx.from(_farm.nodes)
                  .map((node:any, nodeIndex) => {
                    
                    farms_main[farmIndex].nodes.push(new Node(node.uri, node.name, node.manufacturer, node.location, new Array<Sensor>(), node.status, node.description));
                    return Rx.from(node.sensors)
                      .map((sensor: any, sensorIndex) => {
                        
                        farms_main[farmIndex].nodes[nodeIndex].sensors.push(
                          new Sensor(sensor.uri, sensor.tag, sensor.category, sensor.dataFrequency, new Array(), sensor.treshold, null, sensor.uom));
                        return this.getDataPoints(node.name, sensor.tag)
                          .pipe(map((readings:any) => {

                            farms_main[farmIndex].nodes[nodeIndex].sensors[sensorIndex].readings = readings;
                            if (readings[readings.length - 1])
                              farms_main[farmIndex].nodes[nodeIndex].sensors[sensorIndex].lastReading = readings[readings.length - 1].value;
                            else
                            farms_main[farmIndex].nodes[nodeIndex].sensors[sensorIndex].lastReading = 0;
                            return Rx.of(farms_main);
                          }));
                      });
                  });
              }));
            
              })/*
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
                            if (readings[readings.length - 1])
                              farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = readings[readings.length - 1].value;
                            else
                              farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = 0;
                            return farm;
                          }));
                      });
                  });
              }));*/
            
          })
      }))
    /*return this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${farmUri}`)
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
                    if (readings[readings.length - 1])
                      farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = readings[readings.length - 1].value;
                    else
                      farm.nodes[nodeIndex].sensors[sensorIndex].lastReading = 0;
                    return farm;
                  }));
              });
          });
      }));*/
  }

  getFarm(farmUri) {
    return this._getFarmObervables(farmUri);
  }

  getFarms() {
    return this.http.get("https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm");
  }
}