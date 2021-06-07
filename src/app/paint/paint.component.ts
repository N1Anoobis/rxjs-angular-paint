import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { mergeMap, takeUntil, switchMap } from 'rxjs/operators';

import { PaintService } from './paint.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss'],
})
export class PaintComponent implements OnInit, AfterViewInit {
  color: string = `#000000`;
  size: number = 30;
  constructor(private paintSvc: PaintService, private elRef: ElementRef) {}
  ngOnInit() {
    console.log(this.elRef);
    this.paintSvc.initialize(this.elRef.nativeElement);
    this.startPainting();
  }
  ngAfterViewInit() {}

  private startPainting() {
    const { nativeElement } = this.elRef;
    const canvas = nativeElement.querySelector('canvas') as HTMLCanvasElement;
    const move$ = fromEvent<MouseEvent>(canvas, 'mousemove');
    const down$ = fromEvent<MouseEvent>(canvas, 'mousedown');
    const up$ = fromEvent<MouseEvent>(canvas, 'mouseup');
    const strokeStyle$ = fromEvent(canvas, 'input');
    const lineWidth$ = fromEvent(canvas, 'input');

    const paints$ = down$.pipe(
      mergeMap((down) => move$.pipe(takeUntil(up$)))
      // mergeMap(down => move$)
    );

    // down$.subscribe(console.info);
    lineWidth$.subscribe(console.info);

    const offset = getOffset(canvas);

    paints$.subscribe((event: MouseEvent) => {
      const clientX = event.clientX - offset.left;
      const clientY = event.clientY - offset.top;
      this.paintSvc.paint(clientX, clientY, this.size, this.color);
    });
  }
}

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}
