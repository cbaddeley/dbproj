import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ActorService } from '../services/actors.service';

@Component({
  selector: 'app-actor-success-results',
  templateUrl: './actor-success-results.component.html',
})
export class ActorSuccessResultsComponent {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
