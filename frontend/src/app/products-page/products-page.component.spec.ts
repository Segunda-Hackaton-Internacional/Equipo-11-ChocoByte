import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPageComponent } from './products-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new product', () => {
    component.toggleAddForm();
    component.productForm.setValue({
      name: 'Test Product',
      price: 50,
      description: 'Test Description',
      type: 'Café',
      imageUrl: 'https://via.placeholder.com/100',
      presentation: 'Molido',
      weight: 250,
    });

    component.onSubmit();

    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Test Product');
  });

  it('should delete a product', () => {
    component.products = [{
      id: 1,
      name: 'Product to Delete',
      price: 100,
      description: 'Description',
      type: 'Café',
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/100',
      presentation: 'Molido',
      weight: 250,
    }];

    component.selectedProductId = 1;
    component.confirmDelete();

    expect(component.products.length).toBe(0);
  });
});
