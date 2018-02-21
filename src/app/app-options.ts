export class AppOptions {
  constructor(private chart_option?: Object) {}

  public chart_options(options) {
    this.chart_option = {
      type: options['type'],
      data: {
        labels: options['labels'],
        datasets: [{
          label: options['label'],
          data: options['data'],
          borderColor: options['bcolor'],
          borderWidth: options['width']
        }]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: options['startZero']
            }
          }]
        }
      }
    };
    return this.chart_option;
  }
  public farmData() {
    return {
        'uri': '/farm/1',
        'name': 'Bethlehem',
        'description': 'Research farm in Bethlehem',
        'location':
            {
                'lat':  -33.5049805,
                'long': 19.5635469
            },
        'nodes': [{
            'uri': '/node/1',
            'name': 'Node1',
            'manufacturer': 'COMSOL',
            'location':
                {
                    'lat':-33.50489829329936,
                    'long': 19.564772844314575
                },
            'status': 'ON',
            'farm': '/farm/1',
            'sensors':[{
                'uri': '/sensor/Hendrina-Node1-Sensor2',
                'assetId': 'Sensor2',
                'category': 'temperature',
                'dataType': '/datatype/soilMoisture',
                'dataFrequency': '180',
                'node': '/node/1',
                'uom': 'C'
            },
                {
                    'uri': '/sensor/Hendrina-Node1-Sensor3',
                    'assetId': 'Sensor3',
                    'category': 'moisture',
                    'dataType': '/datatype/soilMoisture',
                    'dataFrequency': '180',
                    'node': '/node/1',
                    'uom': 'm3'
                },
                {
                    'uri': '/sensor/Hendrina-Node2-Sensor1',
                    'assetId': 'Sensor4',
                    'category': 'humidity',
                    'dataType': '/datatype/soilMoisture',
                    'dataFrequency': '180',
                    'node': '/node/2',
                    'uom': '%'
                }]
        },
            {
                'uri': '/node/2',
                'name': 'Node2',
                'manufacturer': 'COMSOL',
                'location':
                    {
                        'lat': -33.50548873507302,
                        'lng': 19.563560485839844
                    },
                'status': 'OFF',
                'farm': '/farm/1',
                'sensors':[{
                    'uri': '/sensor/Hendrina-Node1-Sensor2',
                    'assetId': 'Sensor5',
                    'category': 'temperature',
                    'dataType': '/datatype/soilMoisture',
                    'dataFrequency': '180',
                    'node': '/node/1',
                    'uom': 'C'
                },
                    {
                        'uri': '/sensor/Hendrina-Node1-Sensor3',
                        'assetId': 'Sensor6',
                        'category': 'moisture',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/1',
                        'uom': 'm3'
                    },
                    {
                        'uri': '/sensor/Hendrina-Node2-Sensor1',
                        'assetId': 'Sensor7',
                        'category': 'humidity',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/2',
                        'uom': '%',
                        "readings": [{"Humidity": 50, "x": 1518775642395}, {"Humidity": 50, "x": 1518775642395}]
                    }]
            },
            {
                'uri': '/node/3',
                'name': 'Node3',
                'manufacturer': 'COMSOL',
                'location':
                    {
                        'lat': -33.50622230863511,
                        'long': 19.56491231918335
                    },
                'status': 'ON',
                'farm': '/farm/2',
                'sensors':[{
                    'uri': '/sensor/Hendrina-Node1-Sensor2',
                    'assetId': 'Sensor8',
                    'category': 'moisture',
                    'dataType': '/datatype/soilMoisture',
                    'dataFrequency': '180',
                    'node': '/node/1',
                    'uom': 'm3'
                },
                    {
                        'uri': '/sensor/Hendrina-Node1-Sensor3',
                        'assetId': 'Sensor9',
                        'category': 'humidity',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/1',
                        'uom': '%'
                    },
                    {
                        'uri': '/sensor/Hendrina-Node2-Sensor1',
                        'assetId': 'Sensor10',
                        'category': 'temperature',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/2',
                        'uom': 'C'
                    }]
            },
            {
                'uri': '/node/4',
                'name': 'Node4',
                'manufacturer': 'COMSOL',
                'location':
                    {
                        'lat': -33.507716274589654,
                        'long': 19.565019607543945
                    },
                'status': 'OFF',
                'farm': '/farm/2',
                'sensors':[{
                    'uri': '/sensor/Hendrina-Node1-Sensor2',
                    'assetId': 'Sensor11',
                    'category': 'moisture',
                    'dataType': '/datatype/soilMoisture',
                    'dataFrequency': '180',
                    'node': '/node/1',
                    'uom': 'm3'
                },
                    {
                        'uri': '/sensor/Hendrina-Node1-Sensor3',
                        'assetId': 'Sensor12',
                        'category': 'humidity',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/1',
                        'uom': '%'
                    },
                    {
                        'uri': '/sensor/Hendrina-Node2-Sensor1',
                        'assetId': 'Sensor13',
                        'category': 'temperature',
                        'dataType': '/datatype/soilMoisture',
                        'dataFrequency': '180',
                        'node': '/node/2',
                        'uom': 'C'
                    }]
            }]
    };
  }
}
