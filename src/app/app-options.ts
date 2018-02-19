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
          backgroundColor: options['bgcolor'],
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
}
