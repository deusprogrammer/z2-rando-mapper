import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'

import { Sprite } from '@inlet/react-pixi'

import palace from './assets/palace.png';
import city1 from './assets/city1.png';
import city2 from './assets/city2.png';
import city3 from './assets/city3.png';
import cave from './assets/cave.png';
import demon from './assets/demon.png';
import boulder from './assets/boulder.png';
import bridge from './assets/bridge.png';

import trophy from './assets/trophy.png';
import child from './assets/child.png';
import medicine from './assets/medicine.png';

import handyglove from './assets/handyglove.png';
import fairy from './assets/fairy.png';
import fairyhandyglove from './assets/fairy-handyglove.png';

import raft from './assets/raft.png';

import { Point } from 'pixi.js';

const itemMap: any = {
    palace: palace.src,
    city1: city1.src,
    city2: city2.src,
    city3: city3.src,
    cave: cave.src,
    demon: demon.src,
    boulder: boulder.src,
    bridge: bridge.src
}

const requirementMap : any = {
    city1: [null, trophy.src, child.src, medicine.src],
    city2: [null, trophy.src, child.src, medicine.src],
    city3: [null, trophy.src, child.src, medicine.src],
    palace: [null, fairy.src, handyglove.src, fairyhandyglove.src],
    cave: [null, fairy.src, fairyhandyglove.src],
    bridge: [null, raft.src],
    boulder: [null],
    demon: [null]
}

const App: React.FC<{ mouseState: MouseState, mapItems: Array<MapItem>, mode: string, onMapItemChange: Function, onMapItemClick: Function }> = ({ mouseState, mapItems, mode, onMapItemChange, onMapItemClick }) => {
    const [selectedMapItem, setSelectedMapItem] = useState<number>(-1);

    const onMousePress = (index : number) => {
        if (mode === "select") {
            console.log(mapItems[index].type);
            console.log(requirementMap[mapItems[index].type][mapItems[index].requirement % requirementMap[mapItems[index].type].length]);
            onMapItemClick(index);
            return;
        }

        setSelectedMapItem(index);
    }

    const onMouseRelease = (index : number) => {
        if (mode === "select") {
            return;
        }

        setSelectedMapItem(-1);
        onMapItemChange(index, mouseState.x, mouseState.y);
    }

    return (
        <>
            {mapItems.map(({ type, x: itemX, y: itemY, requirement }: MapItem, index: number) =>
                <React.Fragment key={`sprite-${index}`} >
                    <Sprite 
                        pointerdown={() => {onMousePress(index)}} 
                        pointerup={() => {onMouseRelease(index)}}
                        image={itemMap[type]} 
                        x={(mode === "move" && index === selectedMapItem) ? mouseState.x : itemX} 
                        y={(mode === "move" && index === selectedMapItem) ? mouseState.y : itemY} 
                        scale={new Point(2.5, 2.5)}
                        interactive={true} />
                    { requirementMap[type][requirement % requirementMap[type].length] !== null ?
                        <Sprite 
                            image={requirementMap[type][requirement % requirementMap[type].length]} 
                            x={(mode === "move" && index === selectedMapItem) ? mouseState.x - 32 : itemX - 32} 
                            y={(mode === "move" && index === selectedMapItem) ? mouseState.y - 32 : itemY - 32} 
                            scale={new Point(2.0, 2.0)} /> : null
                    }
                </React.Fragment>
            )}
            {!['select', 'move'].includes(mode) ?
                <Sprite 
                    image={itemMap[mode]} 
                    x={mouseState.x} 
                    y={mouseState.y} 
                    scale={new Point(2.5, 2.5)} /> : null
            }
        </>
    );
}

export default hot(App)
