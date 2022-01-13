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
  private _width: number = 400;
  private _height: number = 350;
  private _margin: number = 50;

  public myForm: FormGroup;
  public allData: number = 30000;
  public nowData: number = 0;
  public nowDataSVG: any;
  public nowDataMinusSVG: any;

  private _arc: any = d3.arc()
    .innerRadius(130)
    .outerRadius(135)
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
      .attr('transform', `translate(162,185)`);
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
      .attr('width', '100%')
      .attr( 'height', '400px')
      .append('g')
     // .attr('transform', `translate(${this._margin},${this._margin})`)
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
/*
    this._svg.append('circle')
      .attr('cx',150)
      .attr('cy',185)
      .attr('r', 160)
      .style('fill', '#12151E')
      .attr('transform', `translate(0,0)`)
*/


/*    const arkOut: any = d3.arc()
      .innerRadius(88)
      .outerRadius(90)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkOut)
      .style('fill', '#272A38')
      .attr('transform', `translate(200,200)`);*/

    const a: any = 135;
    const arkForeground: any = d3.arc()
      .innerRadius(a-5)
      .outerRadius(a)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkForeground)
      .style('fill', 'rgba(247, 147, 30, 0.2)')
      .attr('transform', `translate(162,185)`);

    const arkInFirst: any = d3.arc()
      .innerRadius(a-7)
      .outerRadius(a-5)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkInFirst)
      .style('fill', '#272A38')
      .attr('transform', `translate(162,185)`);


    const arkInSecond: any = d3.arc()
      .innerRadius(a)
      .outerRadius(a+2)
      .startAngle(0)
      .endAngle(360 * Math.PI / 180);
    this._svg.append('path')
      .attr("d", arkInSecond)
      .style('fill', '#272A38')
      .attr('transform', `translate(162,185)`);



    this._svg.append('text')
      .attr("text-anchor", "middle")
      .style('font-size','40px')
      .text('тн')
      .attr('transform', 'translate(160,110)')
      .style('fill','#606580');

    this._svg.append('text')
      .attr("text-anchor", "middle")
      .style('font-size','36px')
      .text('Выработка')
      .attr('transform', 'translate(160,150)')
      .style('fill','white');

    this._svg.append('text')
      .attr("text-anchor", "middle")
      .style('font-size','36px')
      .text(`${this.allData}`)
      .attr('transform', 'translate(160,240)')
      .style('fill','#0089FF');

    this.nowDataSVG = this._svg.append('text')
      .attr("text-anchor", "middle")
      .style('font-size','36px')
      .text(`${this.nowData}`)
      .attr('transform', 'translate(160,195)')
      .attr('id','nowDataSVG')
      .style('fill','white');

    this.nowDataMinusSVG = this._svg.append('text')
      .attr("text-anchor", "middle")
      .style('font-size','36px')
      .text(`${this.nowData - this.allData}`)
      .attr('id','nowDataMinusSVG')
      .attr('transform', 'translate(155,280)')
      .style('fill','#F7931E');




   /* const arkTop = this._svg.append('defs')
      .append('g')
      .attr('id','arkTop')
      .append('path')
      .attr('d', "M12.2512 71.2886C27.266 51.7712 46.7405 35.8627 69.15 25.0878L72.6431 28.2316C92.3375 19.0112 114.317 13.86 137.5 13.86C160.683 13.86 182.663 19.0112 202.357 28.2316L205.85 25.0878C228.26 35.8627 247.734 51.7712 262.749 71.2886H274.629C258.949 48.981 237.963 30.6728 213.506 18.1974C211.375 17.1103 209.217 16.0675 207.035 15.0702C185.855 5.39285 162.307 0 137.5 0C112.693 0 89.1451 5.39285 67.9654 15.0702C65.7827 16.0675 63.6251 17.1103 61.494 18.1974C37.0367 30.6728 16.0513 48.981 0.371094 71.2886H12.2512Z")
      .style('fill',"#272A38")
      .style('fill-opacity','0.5')*/





    this._svg.append("g").attr("transform","translate(0,0)").attr("class","cloud")
      .append("use").attr("xlink:href","#arkTop")
  }



  public getData(): void {
    const now = this.myForm.get('inputData')?.value;
    this.nowData = Number(this.myForm.get('inputData')?.value);
    this.nowData =(this.nowData / this.allData) * 100;


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
