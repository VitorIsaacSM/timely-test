import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() eventChangePage = new EventEmitter<number>();

  emit(page: number) {
    this.eventChangePage.emit(page);
  }
  next() {
    if (this.currentPage >= this.totalPages) {
      return;
    }
    this.emit(this.currentPage + 1);
  }
  prev() {
    if (this.currentPage === 1) {
      return;
    }
    this.emit(this.currentPage - 1);
  }
}
