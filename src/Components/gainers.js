import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import {unwrap, addKeys} from '../function';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  code : {
    color : 'blue'
  },
  changeUp : {
    color: 'green'
  },
  changeDown : {
    color: 'red'
  }
};

export default class Gainers extends Component{
    render()
    {
        const { code, changeUp, changeDown } = styles;
        const {slists} = this.props;
        var gainers = slists.sort((a, b) => { let valueA = a.price * a.volumn; let valueB = b.price * b.volumn; return valueB - valueA}).slice(0,20);
        return (
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Code</TableHeaderColumn>
                  <TableHeaderColumn>Company</TableHeaderColumn>
                  <TableHeaderColumn>Default Price</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>Value</TableHeaderColumn>
                  <TableHeaderColumn>Change</TableHeaderColumn>
                  <TableHeaderColumn>%Change</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  gainers.map(e => (
                      <TableRow key={e.code}>
                        <TableRowColumn style={code}>{e.code}</TableRowColumn>
                        <TableRowColumn>{e.company}</TableRowColumn>
                        <TableRowColumn>{e.defaultPrice}</TableRowColumn>
                        <TableRowColumn>{e.price}</TableRowColumn>
                        <TableRowColumn>{parseInt((e.price * e.volumn), 10)}</TableRowColumn>
                        {
                          e.change != 0 ? 
                            unwrap(<wrap>
                              <TableRowColumn style={e.change > 0 ? changeUp: changeDown }>{parseFloat(e.change.toFixed(2))}</TableRowColumn>
                              <TableRowColumn style={e.changePercent > 0 ? changeUp: changeDown }>{parseFloat(e.changePercent.toFixed(2))}%</TableRowColumn>
                            </wrap>)  
                          :
                            unwrap(<wrap>
                              <TableRowColumn>--</TableRowColumn>
                              <TableRowColumn>--</TableRowColumn>
                            </wrap>)
                        }
                      </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        )
    }
}