import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs';

describe(<App />, () => {
  it('Có chứa Component App Bar material-ui', () => {
    var AppComponent = shallow(<App />); 
    expect(AppComponent.find(AppBar)).toHaveLength(1);
  });

  it('Có chứa Component Tabs inside App Bar', () => {
    var AppComponent = shallow(<App />);
    var AppBarComponent = AppComponent.find(AppBar)
    var TabsComponent = AppBarComponent.find(Tabs);
    expect(TabsComponent.length).toBeGreaterThan(0); 
  })
})