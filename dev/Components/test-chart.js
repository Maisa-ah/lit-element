import { select, csv, scaleLinear, max, scaleBand } from 'd3';
import {LitElement, html, css} from 'lit-element';

 
export class BarChart extends LitElement {
  render() {
    const svg = select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    // svg.style('background-color', 'red');

    const render = data => {
      const xScale = scaleLinear()
        .domain([0, max(data, d => d.population)])
        .range([0, width]);

      const yScale = scaleBand()
        .domain(data.map(d => d.country))
        .range([0,height]);

      svg.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('y', d => yScale(d.country))
          .attr('width', d => xScale(d.population))
          .attr('height', yScale.bandwidth());
    };

    csv('./data/test.csv').then(data => {
      console.log(data);
      data.forEach(d => {
        console.log(d.country);
        d.population = +d.population * 1000;
        console.log(d.population);
      });
      render(data);
    });
    return html`
    <div></div>
    `;
  }
}
 
customElements.define('bar-chart', BarChart);