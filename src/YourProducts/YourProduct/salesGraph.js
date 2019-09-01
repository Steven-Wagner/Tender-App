import React, {Component} from 'react';
import * as d3 from "d3";

class salesGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 200,
            margin: 20,
            leftMargin: 20
        }
        this.reportWindowSize = this.reportWindowSize.bind(this);
    }

    componentDidMount() {
        this.reportWindowSize();
        window.addEventListener("resize", this.reportWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.reportWindowSize);
    } 

    reportWindowSize() {
        if (document.getElementById(`${this.props.parentId}`)) {
            const newWidth = document.getElementById(`${this.props.parentId}`).clientWidth
            this.setState({
                width: newWidth-40
            })
        }
    }

    parseData() {
        const parseTime = d3.timeParse("%Y-%m-%d");
        const data = this.props.data.map(row => {
            return {
                date: parseTime(row.date),
                count: parseInt(row.count)
            }
        })
        data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return a.date - b.date;
        });
        return data;
    }

    getXScale(data, w) {
        const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date)) //domain: [min,max] of a
        .range([this.state.leftMargin+this.state.margin, w+this.state.margin])
    
        return x;
    }

    getYScale(data, h) {
        const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.count)) // domain [0,max] of b (start from 0)
        .range([h+this.state.margin, this.state.margin])

        return y;
    }

    generateLine(x, y) {
            //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.count))

        return line;
    }

    generateYTicks(y, h, w) {
        const yFormat = d3.format(".1n");
        const yTicks = y.ticks(4).map(d => (
            y(d) > 10 && y(d) < h && d % 1 === 0? 
            <g key={y(d)} transform={`translate(${this.state.margin+this.state.leftMargin},${y(d)})`}>  
                <text x="-10" y="5">{yFormat(d)}</text>
                <line x1='5' x2="5" y1='0' y2='0' transform="translate(-5,0)"/>
                <line className='gridline' x1={w - this.state.margin} y1='0' y2='0' transform="translate(-5,0)"/> 
            </g>
            : null
        ))

        return yTicks;
    }

    generateXTicks(x, h, w) {
        const xFormat = d3.timeFormat("%a");

        const xTicks = x.ticks(8).map(d => (
            <g key={x(d)} transform={`translate(${x(d)},${this.state.height})`}>  
            <text>{xFormat(d)}</text>
            <line x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
            </g>
        ))

        return xTicks;
    }

    render() {

    const data = this.parseData(this.state.data)
    const h = this.state.height - 2 * this.state.margin, w = this.state.width - 2 * this.state.margin
    
    //x and y scale'
    const x = this.getXScale(data, w);
    const y = this.getYScale(data, h);
    
    //Line of graph
    const line = this.generateLine(x, y);

    //Tick marks for graph
    const xTicks = this.generateXTicks(x, h, w);
    const yTicks = this.generateYTicks(y, h, w);

    return  (
    <div className="graph-wrapper">
      <svg className="sales-svg" width={this.state.width} height={this.state.height}>
         <line className="axis" x1={this.state.margin+this.state.leftMargin} x2={w+this.state.margin} y1={h+this.state.margin} y2={h+this.state.margin}/>
         <line className="axis" x1={this.state.margin+this.state.leftMargin} x2={this.state.margin+this.state.leftMargin} y1={this.state.margin} y2={h+this.state.margin}/>
         <path className="sales-path" d={line(data)}/>
         <g className="axis-labels">
           {xTicks}
         </g>
         <g className="axis-labels">
           {yTicks}
         </g>
         <text className="y-label" transform={`rotate(-90)`} y={this.state.margin} x={0-this.state.height/2} style={{"textAnchor": "middle"}}>Sales</text>
      </svg>
    </div>
    )
  }
}


export default salesGraph;