import { Component, Input, OnInit } from '@angular/core';
import { SigmineRecordModel } from '@app/domain/models/simine-record.model';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss'],
})
export class RecordModalComponent implements OnInit {

  @Input() record!: SigmineRecordModel;

  constructor() { }

  ngOnInit() { }

}
