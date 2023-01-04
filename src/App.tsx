import React from 'react';
import {bind, Subscribe} from '@react-rxjs/core'
import {map} from 'rxjs/operators'
import { createSignal } from '@react-rxjs/utils';

import './App.css';

// A signal is an entry point to react-rxjs. It's equivalent to using a subject
const [textChange$, setText] = createSignal<string>();

// bind returns a tuple that contains the hook, plus the underlying shared observable so it can be used by other streams
const [useText, text$] = bind(textChange$, "")

const [useCharCount, charCount] = bind(text$.pipe(map((text)=>text.length)))

const CharacterCount:React.FC = ()=>{
  const count = useCharCount()

  return <>Character Count: {count}</>
}

const App:React.FC = ()=>{
  const text = useText()

  return (
    <div className="App">
      <Subscribe>
      <input type="text" value={text} onChange={e=>{setText(e.target.value)}}/>
      <br />
      <span>Echo: {text}</span>
      <br />
      <CharacterCount />

      </Subscribe>
    </div>
  );
}

export default App;
