import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Table from './Table.jsx';

const elements = [{First: "Elliot", Last: "Chibe"}, {First: "Greta", Last: "Zola"}, {First: "Kris", Last: "Bryant"}];

var testElements = []

for (var i = 0; i < 100; i++) {
    var aircraftMappingDummyData = {
        ID: '',
        Tail: '',
        Nose: '',
        MRO: ''
    }
    aircraftMappingDummyData.ID = i;
    aircraftMappingDummyData.Tail = ("N00" + (i + 1).toString());
    aircraftMappingDummyData.Nose = ("00" + (i + 1).toString());
    aircraftMappingDummyData.MRO = (i % 2)
        ? "MTX"
        : "Trax";
    testElements.push(aircraftMappingDummyData);
}

ReactDOM.render(<App elements = {testElements}/>, document.getElementById('app'));
