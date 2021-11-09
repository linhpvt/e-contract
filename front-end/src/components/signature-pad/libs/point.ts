// Interface for point data structure used e.g. in SignaturePad#fromData method
export interface BasicPoint {
  x: number;
  y: number;
  time: number;
}

export class Point implements BasicPoint {
  public time: number;

  constructor(public x: number, public y: number, time?: number) {
    this.time = time || Date.now();
    this.x = x;
    this.y = y;
  }

  public distanceTo(start: BasicPoint): number {
    const xlen = this.x - start.x;
    const ylen = this.y - start.y;
    return Math.sqrt(xlen * xlen + ylen * ylen);
  }

  public equals(other: BasicPoint): boolean {
    return this.x === other.x && this.y === other.y && this.time === other.time;
  }

  public velocityFrom(start: BasicPoint): number {
    return this.time !== start.time
      ? this.distanceTo(start) / (this.time - start.time)
      : 0;
  }
}
