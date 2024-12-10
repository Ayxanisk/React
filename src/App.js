import { useState } from 'react';
import './App.css';
import List from "./components/List";

let render = 0;

const App = () => {
  let test = 0;
  console.log('render', ++render);

  <List></List>
  <List></List>
  <List></List>
}

export default App;