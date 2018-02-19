import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farm } from './models/farm'
import { Node } from './models/node'
import { Sensor } from './models/sensor'
//let async = require('../../node_modules/async');

@Injectable()
export class NodesEndpointService {
<<<<<<< HEAD
  bcxFarm: Farm;
=======
  private url = 'https://jsonplaceholder.typicode.com/posts';

>>>>>>> 887cecfc9228f9c27476d8ef937c39236d30852a
  constructor(private http: HttpClient) { }


  getFarm(): Farm {
    let farm: Farm = new Farm();
    farm.name = "Farm 1";
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
    this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/63f2a245-4f66-42ba-bf6f-decc73f09abd`)
      .subscribe(data => {
        this.bcxFarm = this.populateFarm(data);
        console.log('Final Farm', this.bcxFarm);
      },
      error => console.log(error),
      () => console.log("Finished....")
    )
  }

  populateFarm(farmObject) {
    let farm: Farm = new Farm();

    farm.name = farmObject.name;
    farm.uri = farmObject.uri;
    farm.location = farmObject.location;
    farm.description = farmObject.description;
    farm.nodes = this.getNodesApi(farm.uri.split('/')[2]);
    return farm;
  }

  getNodesApi(farmUri): Node[] {
    let nodes: Node[] = [];
    this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/farm/${farmUri}`)
      .subscribe(data => {
        console.log("nodes for a farm", data);
        //console.log('async', async);
        this.populateNodeLocations(data);
      },
      error => console.log(error),
      () => console.log("Finished....")
    )
    return nodes;
  }

  populateNodeLocations(data) {
    let nodes: Node[] = [];
    /*async.each(data.nodes, (node, callBack) => {
      console.log('each node: ',node);
      this.http.get(`https://soil-temp-backend.run.aws-usw02-pr.ice.predix.io/api/v1_0/node/${node.uri.split('/')[2]}`)
        .subscribe(node => {
          console.log(node);
          //nodes.push(new Node(node.uri, node.name, node.manufacture, node.location, node.sensors))
        }, 
        error => console.log(error),
        () => console.log("success")
      )
    })*/
  }
}