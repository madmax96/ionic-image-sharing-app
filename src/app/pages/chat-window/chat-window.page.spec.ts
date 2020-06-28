import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowPage } from './chat-window.page';

describe('ChatWindowPage', () => {
  let component: ChatWindowPage;
  let fixture: ComponentFixture<ChatWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
