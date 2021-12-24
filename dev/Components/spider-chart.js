// import { select, csv, scaleLinear, max, scaleBand } from 'd3';
import * as d3 from 'd3'
import {LitElement, html, css} from 'lit-element';

 
export class SpiderChart extends LitElement {
  render() {
    
    
    return html`
      <div id="spider-chart"></div>
    `;
  }

  firstUpdated(){
    console.log("hey");
    let data = [];
    let features = ["A","B","C","D","E","F"];
    //generate the data
    for (var i = 0; i < 3; i++){
        var point = {}
        //each feature will be a random number from 1-9
        features.forEach(f => point[f] = 1 + Math.random() * 8);
        data.push(point);
    }
    console.log(data);
    let element = this.shadowRoot.querySelector('#spider-chart');
    console.log(element);
    this.drawSpiderChart(element, features, data);
  }

  drawSpiderChart(elem, features, data){
    console.log(elem);
    let svg = d3.select(elem).append("svg")
      .attr("width", 600)
      .attr("height", 600);

    let radialScale = d3.scaleLinear()
      .domain([0,10])
      .range([0,250]);
    let ticks = [2,4,6,8,10];

    ticks.forEach(t =>
      svg.append("circle")
      .attr("cx", 300)
      .attr("cy", 300)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", radialScale(t))
    );
    ticks.forEach(t =>
      svg.append("text")
      .attr("x", 305)
      .attr("y", 300 - radialScale(t))
      .text(t.toString())
    );

    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      let line_coordinate = angleToCoordinate(angle, 10);
      let label_coordinate = angleToCoordinate(angle, 10.5);
  
      //draw axis line
      svg.append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","black");
  
      //draw axis label
      svg.append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .text(ft_name); //add title to data points
    }

    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];

    for (var i = 0; i < data.length; i ++){
      let d = data[i];
      let color = colors[i];
      let coordinates = getPathCoordinates(d);
  
      //draw the path element
      svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", "transparent")
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.8);
    }


    function getPathCoordinates(data_point){
      let coordinates = [];
      //grab corrdinates for each data point and create a path
      for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
      }

      //create path to connect final and first data point
      let ft_name = features[0];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));

      console.log(coordinates);
      return coordinates;
    }

    function angleToCoordinate(angle, value){
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return {"x": 300 + x, "y": 300 - y};
    }
  }
}
 
customElements.define('spider-chart', SpiderChart);