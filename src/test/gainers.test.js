import React from 'react';
import ReactDOM from 'react-dom';
import Gainers from '../Components/gainers';
import {shallow} from 'enzyme';
import App from '../App';

describe(<Gainers />, () => {
    it('Đã nhận được props slists App Component chuyển qua', () => {
        var AppComponent = shallow(<App/>);
        var stocklists = AppComponent.state('stocklists');
        var GainersComponent = shallow(<Gainers slists = {stocklists}/>)
        expect(GainersComponent)
    })
})