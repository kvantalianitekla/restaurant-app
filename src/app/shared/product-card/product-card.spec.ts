import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      name: 'Test Burger',
      price: 9.99,
      nuts: false,
      image: 'burger.jpg',
      vegeterian: false,
      spiciness: 0,
      categoryId: 1,
    };

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
