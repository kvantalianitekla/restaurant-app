import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BasketService } from './basket';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
