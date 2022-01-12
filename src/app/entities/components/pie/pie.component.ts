import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {arc} from "d3";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, AfterViewInit {

  private _svg: any;
  private _width: number = 1000;
  private _height: number = 400;
  private _margin: number = 50;

  public myForm: FormGroup;
  public allData: number = 30000;
  public nowData: number = 0;
  public nowDataSVG: any;
  public nowDataMinusSVG: any;

  private _arc: any = d3.arc()
    .innerRadius(65)
    .outerRadius(70)
/*    .startAngle(0)
    .endAngle(Math.PI * 2 );*/

  private _foreground: any;


  constructor( private _fb: FormBuilder) {
    this.myForm = this._fb.group({
        'inputData': new FormControl('',[Validators.required]),
      }
    )
  }

  ngOnInit(): void {
    this._createSvg();
    this._drawCircle();
    this._foreground = this._svg.append('path')
      .datum({
        endAngle: Math.PI * 2,
        startAngle: 0,
      })
      .style("fill", "rgba(247, 147, 30,0)")
      .attr("d", this._arc)
      .attr('transform', `translate(200,200)`);
    this.getData()
    // setInterval(() => this._changeColor(), 8000);
  }

  ngAfterViewInit(): void {
/*    setInterval( ()=> {
      this._foreground
        .transition()
        .duration(5000)
        .call(this._arcTween, 360 * Math.PI / 180, 0, this)
        .style("fill", "#05ffa5")
        .transition()
        .style("fill", "#000000")
        .duration(5000)
        .call(this._arcTween, 0, 360 * Math.PI / 180 , this);
    }, 10000)*/

    }


  private _arcTween(transition: any, newStartAngle: any, newFinishAngle:any, hell: any) {
/*   transition.attrTween("fill", function () {
     return d3.interpolateRgb("yellow", "blue");
   })*/
    transition.attrTween("d",function (d: any) {
      let interpolateStart = d3.interpolate(d.startAngle, newStartAngle);
      return function (t: any) {
        d.endAngle = newFinishAngle;
        d.startAngle = interpolateStart(t);
        return hell._arc(d)
      }
    });
  }

  private _createSvg(): void {
    this._svg = d3.selectAll('figure#pie')
      .append("svg")
      .attr('width', this._width + this._margin)
      .attr( 'height', this._height + this._margin)
      .append('g')
      .attr('transform', `translate(${this._margin},${this._margin})`)
  }

  private _changeColor(): void {
    this._svg.select('circle')
      .transition()
      .duration(2000)
      .style('fill','blue')
      .transition()
      .duration(2000)
      .style('fill','green')
      .transition()
      .duration(2000)
      .style('fill','red')
      .transition()
      .duration(2000)
      .style('fill', '#565656')

  }

  private _drawCircle(): void {
    this._svg.append('circle')
      .attr('cx',200)
      .attr('cy',300)
      .attr('r', 90)
      .style('fill', '#12151E')
      .attr('transform', `translate(0,-100)`)

    const arkOut: any = d3.arc()
      .innerRadius(88)
      .outerRadius(90)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkOut)
      .style('fill', '#272A38')
      .attr('transform', `translate(200,200)`);

    const arkForeground: any = d3.arc()
      .innerRadius(65)
      .outerRadius(70)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkForeground)
      .style('fill', 'rgba(247, 147, 30, 0.2)')
      .attr('transform', `translate(200,200)`);

    const arkInFirst: any = d3.arc()
      .innerRadius(63)
      .outerRadius(65)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkInFirst)
      .style('fill', '#272A38')
      .attr('transform', `translate(200,200)`);

    const arkInSecond: any = d3.arc()
      .innerRadius(70)
      .outerRadius(72)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkInSecond)
      .style('fill', '#272A38')
      .attr('transform', `translate(200,200)`);

    const allText = this._svg.append('div')
      .attr('id','allText')

    this._svg.append('text')
      .attr("text-anchor", "middle")
      .text('тн')
      .attr('transform', 'translate(199,160)')
      .style('fill','#606580');

    this._svg.append('text')
      .attr("text-anchor", "middle")
      .text('Выработка')
      .attr('transform', 'translate(200,180)')
      .style('fill','white');

    this._svg.append('text')
      .attr("text-anchor", "middle")
      .text(`${this.allData}`)
      .attr('transform', 'translate(199,225)')
      .style('fill','#0089FF');

    this.nowDataSVG = this._svg.append('text')
      .attr("text-anchor", "middle")
      .text(`${this.nowData}`)
      .attr('transform', 'translate(199,205)')
      .attr('id','nowDataSVG')
      .style('fill','white');

    this.nowDataMinusSVG = this._svg.append('text')
      .attr("text-anchor", "middle")
      .text(`${this.nowData - this.allData}`)
      .attr('id','nowDataMinusSVG')
      .attr('transform', 'translate(196,245)')
      .style('fill','#F7931E');

  }



  public getData(): void {
    const now = this.myForm.get('inputData')?.value;
    this.nowData = Number(this.myForm.get('inputData')?.value);
    this.nowData =(this.nowData / this.allData) * 100;
    console.log(this.nowData);




    setInterval( () =>{
      this.nowData = Math.round(Math.random() * 100);
      console.log(this.nowData);
      this._foreground.style("fill", "white")
        .transition()
        .duration(2000)
        .call(this._arcTween,2 * Math.PI / 100 * this.nowData, 0, this);
     this._svg.select('text#nowDataSVG')
       .attr("text-anchor", "middle")
      .text(`${Math.round(this.allData / 100 * this.nowData)}`)
     this._svg.select('text#nowDataMinusSVG')
       .attr("text-anchor", "middle")
      .text(`${Math.round(this.allData / 100 * this.nowData) - this.allData}`)
    },2500)
 }

}
