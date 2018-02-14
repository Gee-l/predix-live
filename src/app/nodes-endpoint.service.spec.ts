import { TestBed, inject } from '@angular/core/testing';

import { NodesEndpointService } from './nodes-endpoint.service';

describe('NodesEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodesEndpointService]
    });
  });

  it('should be created', inject([NodesEndpointService], (service: NodesEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
