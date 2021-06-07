import { Injectable } from '@angular/core';

let infiniteX = Infinity;
let infiniteY = Infinity;

@Injectable()
export class PaintService {
  private canvas: any = null;
  private ctx: any;

  initialize(mountPoint: HTMLElement) {
    this.canvas = mountPoint.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = mountPoint.offsetWidth;
    this.canvas.height = mountPoint.offsetHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  paint(clientX: number, clientY: number, size: number, color: string) {
    this.ctx.strokeStyle = `${color}`;
    this.ctx.lineWidth = size;
    this.ctx.beginPath();
    if (
      Math.abs(infiniteX - clientX) < 100 &&
      Math.abs(infiniteY - clientY) < 100
    ) {
      this.ctx.moveTo(infiniteX, infiniteY);
    }
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    infiniteX = clientX;
    infiniteY = clientY;
  }
}
