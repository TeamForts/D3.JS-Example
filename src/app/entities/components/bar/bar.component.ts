import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {

  private _svg: any;
  private _data: any[] =[80, 100, 56, 120, 180, 30, 40, 120, 160, 80, 100, 56, 120, 180, 30, 40, 120, 160];
  // @ts-ignore
  @Input() margin;
  // @ts-ignore
  @Input() width;
  // @ts-ignore
  @Input() height;


  constructor() { }

  ngOnInit(): void {
    this._createSvg();
    this._drawBars(this._data);
    this._drawAxis(this._data);


  }

  ngAfterViewInit(): void{
    /*setInterval( ()=> {
      let h= this._data.map((el) => Math.round(Math.random()*200));
      this._svg.selectAll("*").remove();
      this.drawBars(h);
      this.drawAxis(this._data);
    }, 300)*/

    setInterval( () => {
      let h= this._data.map((el) => Math.round(Math.random()*200));
      this._svg.selectAll("*").remove();
      this._drawBars(h);
      this._drawAxis(this._data);
    }, 2500)
  }

  private _createSvg(): void {
    this._svg = d3.select('figure#bar')
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", `translate(${this.margin},${this.margin})`)
  }

  private _drawAxis(data: any[]): void {
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range( [0, this.width])
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([this.height, 0])

    let xAxis = d3.axisBottom(xScale);

    let yAxis = d3.axisLeft(yScale);

    this._svg.append('g')
      .attr("transform", "translate (0, 0)")
      .style("font-size","14px")
      .style("color","white")
      .call(yAxis)
    this._svg.append('g')
      .attr("transform", `translate (0, ${this.height } )`)
      .style("font-size","14px")
      .style("color","white")
      .call(xAxis)
  }

  private _drawBars(data: any[]): void {

    let scale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, this.height])

    this._svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("y", (d: any) => 400)
      .attr('height',(d: any) => 0)
      .attr('width', (d: any) => this.width/data.length - 10)
      .attr("transform", (d: any, i: any) => `translate(${(this.width/data.length)*i},0)`)
      .style("fill", (d: any) => d > 100 ? 'green' : 'orange')
   /* this._svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text( (d: any) => d)
      .attr('y', (d:any) => this.height - scale(d) )
      .attr('x', (d: any, i: any) => (this.width/data.length)*i)
      .style('fill','black')
      .style('font-size','18px')*/
    this._svg.selectAll('rect')
      .transition()
      .duration(800)
      .attr("y", (d: any) => this.height - scale(d))
      .attr('height',(d: any) => scale(d))
      .delay(function(d: any,i: any){return(i*100)})
  }
}
