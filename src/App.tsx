import { hot } from 'react-hot-loader/root'
import React from 'react'

import { Sprite } from '@inlet/react-pixi'

import palace from './assets/palace.png';
import city1 from './assets/city1.png';
import city2 from './assets/city2.png';
import city3 from './assets/city3.png';
import cave from './assets/cave.png';
import demon from './assets/demon.png';
import boulder from './assets/boulder.png';
import bridge from './assets/bridge.png';
import { Point } from 'pixi.js';

const itemMap : any = {
    palace: palace.src,
    city1: city1.src,
    city2: city2.src,
    city3: city3.src,
    cave: cave.src,
    demon: demon.src,
    boulder: boulder.src,
    bridge: bridge.src
} 

const App : React.FC<{mouseState : MouseState, mapItems : Array<MapItem>, mode: string}> = ({mouseState, mapItems, mode}) => {
    return (
        <>
            { mapItems.map(({type, x: itemX, y: itemY} : MapItem, index : number) => 
                <Sprite key={`sprite-${index}`} image={itemMap[type]} x={itemX} y={itemY} scale={new Point(2, 2)} />
            )}
            <Sprite image={itemMap[mode]} x={mouseState.x} y={mouseState.y} scale={new Point(2, 2)} />
        </>
    );
}

export default hot(App)
