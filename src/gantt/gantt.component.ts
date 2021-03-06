import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGanttOptions, Project} from '../interfaces';
import {GanttService} from '../gantt.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  _project: Project;
  _options: IGanttOptions;

  // TODO(dale): this may be causing an issue in the tree builder?
  @Input()
  set project(project: any) {
    if (project) {
      this._project = project;
    } else {
      this.setDefaultProject();
    }
  }

  get project() {
    return this._project;
  }

  @Input()
  set options(options: any) {
    if (options.scale) {
      this._options = options;
    } else {
      this.setDefaultOptions();
    }
  }

  get options() {
    return this._options;
  }

  @Output() onGridRowClick: EventEmitter<any> = new EventEmitter<any>();

  private ganttContainerWidth: number;

  constructor(private ganttService: GanttService) {
  }

  ngOnInit() {

  }

  setSizes(): void {
    this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
  }

  setDefaultOptions() {
    const scale = this.ganttService.calculateGridScale(this._project.tasks);

    this._options = {
      scale: scale
    };
  }

  setDefaultProject() {
    this._project = {
      id: '',
      name: '',
      startDate: null,
      tasks: []
    };
  }

  gridRowClicked(task: any) {
    this.onGridRowClick.emit(task);
  }

  onResize($event: any): void {
    this.setSizes();
  }

}
