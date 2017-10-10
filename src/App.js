import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Gainers from './Components/gainers';
import Losers from './Components/losers';
import stocklists from './data';
import {Tabs, Tab} from 'material-ui/Tabs';
import {TextField} from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import SwipeableViews from 'react-swipeable-views';

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      stocklists,
      slideIndex : 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  randomFloat(min, max)
  {
    var randomFloat = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    return randomFloat;
    
  }

  randomInteger(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    var randomInteger =  Math.floor(Math.random() * (max - min)) + min;
    return randomInteger;
  }

  changePriceAndVolumn(minVolumn, maxVolumn, minPercent, maxPercent)
  {
    var {stocklists} = this.state;
    for(var i=0; i<stocklists.length; i++)
    {
      var randomPercent = this.randomInteger(minPercent, maxPercent);
      let newPrice = parseFloat(((stocklists[i].price * (100 + randomPercent)) / 100).toFixed(2));
      let change = newPrice - stocklists[i].defaultPrice;
      let changePercent = (change/stocklists[i].defaultPrice) * 100;
      stocklists[i].price = newPrice;
      stocklists[i].change = change;
      stocklists[i].changePercent = changePercent;

      //change Volumn
      var randomVolumn = this.randomInteger(minVolumn, maxVolumn);
      stocklists[i].volumn += randomVolumn;
    }
    this.setState({
      stocklists
    })
  }

  componentDidMount() {
    var stocklists = this.state.stocklists;
    for(var i=0; i<stocklists.length; i++)
    {
      let randomVolumn = this.randomInteger(1000, 1000000);
      let randomPrice = this.randomFloat(0.01, 99.99);
      
      stocklists[i].defaultPrice = randomPrice;
      stocklists[i].price = randomPrice;
      stocklists[i].volumn = randomVolumn;
    }
    this.setState({
      stocklists
    }, () => {
      setInterval(() => {
        this.changePriceAndVolumn(10, 30, -5, 5);
      }, 5000)
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title = 'S&P/ASX'
          showMenuIconButton = {false}
        >
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="Gainers" value={0} style={{paddingLeft: 50, paddingRight: 50}}/>
            <Tab label="Losers" value={1} style={{paddingLeft: 50, paddingRight: 50}}/>
          </Tabs>
        </AppBar>

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <Gainers slists = {this.state.stocklists}/>
          </div>
          <div style={styles.slide}>
            <Losers slists = {this.state.stocklists} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};