import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatResultsComponent } from './combat-results.component';

describe('CombatResultsComponent', () => {
  let component: CombatResultsComponent;
  let fixture: ComponentFixture<CombatResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
