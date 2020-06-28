import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTabPage } from './chat-tab.page';

describe('ChatTabPage', () => {
  let component: ChatTabPage;
  let fixture: ComponentFixture<ChatTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
