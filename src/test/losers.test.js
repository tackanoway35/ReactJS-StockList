import React from 'react';
import ReactDOM from 'react-dom';
import Losers from '../Components/losers';
import {shallow} from 'enzyme';
import App from '../App';

describe(<Losers />, () => {
    it('Đã nhận được props slists App Component chuyển qua', () => {
        var AppComponent = shallow(<App/>);
        var stocklists = AppComponent.state('stocklists');
        var LosersComponent = shallow(<Losers slists = {stocklists}/>)
        expect(LosersComponent)
    })
})