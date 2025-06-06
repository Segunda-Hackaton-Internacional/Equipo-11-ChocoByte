import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainPageComponent } from './blockchain-page.component';

describe('BlockchainPageComponent', () => {
  let component: BlockchainPageComponent;
  let fixture: ComponentFixture<BlockchainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockchainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockchainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
