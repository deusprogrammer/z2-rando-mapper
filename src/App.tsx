import { hot } from 'react-hot-loader/root'
import React from 'react'

import { Sprite } from '@inlet/react-pixi'

import palace from './assets/palace.png';

const App = () => (
  <>
    <Sprite image={palace.src} x={500} y={500} />
  </>
)

export default hot(App)
