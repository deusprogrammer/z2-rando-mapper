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

import horsehead from './assets/horsehead.png';
import helmethead from './assets/helmethead.png';
import rebo from './assets/rebo.png';
import karrock from './assets/karrock.png';
import gooma from './assets/gooma.png';
import barba from './assets/barba.png';
import thunderbird from './assets/thunderbird.png';

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

const bossMap : any = [
    null,
    horsehead.src,
    helmethead.src,
    rebo.src,
    karrock.src,
    gooma.src,
    barba.src,
    thunderbird.src
]

const App: React.FC<{ mouseState: MouseState, mapItems: Array<MapItem>, mode: string, onMapItemChange: Function, onMapItemClick: Function }> = ({ mouseState, mapItems, mode, onMapItemChange, onMapItemClick }) => {
    const [selectedMapItem, setSelectedMapItem] = useState<number>(-1);

    const onMousePress = (index : number) => {
        console.log("MODE: " + mode);
        if (mode !== "move") {
            onMapItemClick(index);
            return;
        }

        setSelectedMapItem(index);
    }

    const onMouseRelease = (index : number) => {
        if (mode !== "move") {
            return;
        }

        setSelectedMapItem(-1);
        onMapItemChange(index, mouseState.x - 16, mouseState.y - 16);
    }

    return (
        <>
            {mapItems.map(({ type, x: itemX, y: itemY, requirement, boss }: MapItem, index: number) => {
                return (<React.Fragment key={`sprite-${index}`} >
                    <Sprite 
                        pointerdown={() => {onMousePress(index)}} 
                        pointerup={() => {onMouseRelease(index)}}
                        image={itemMap[type]} 
                        x={(mode === "move" && index === selectedMapItem) ? mouseState.x - 16 : itemX} 
                        y={(mode === "move" && index === selectedMapItem) ? mouseState.y - 16 : itemY} 
                        scale={new Point(3, 3)}
                        interactive={true} />
                    { requirementMap[type][requirement % requirementMap[type].length] !== null ?
                        <Sprite 
                            image={requirementMap[type][requirement % requirementMap[type].length]} 
                            x={(mode === "move" && index === selectedMapItem) ? mouseState.x - 48 : itemX - 32} 
                            y={(mode === "move" && index === selectedMapItem) ? mouseState.y - 48 : itemY - 32} 
                            scale={new Point(2.0, 2.0)} /> : null
                    }
                    { bossMap[boss % bossMap.length] !== null && type === "palace" ?
                        <Sprite 
                            image={bossMap[boss % bossMap.length]} 
                            x={(mode === "move" && index === selectedMapItem) ? mouseState.x + 32 : itemX + 32 + 16} 
                            y={(mode === "move" && index === selectedMapItem) ? mouseState.y - 32 - 16 : itemY - 32} 
                            scale={new Point(2.0, 2.0)} /> : null
                    }
                </React.Fragment>)
                }
            )}
            {!['select', 'select-b', 'move'].includes(mode) ?
                <Sprite 
                    image={itemMap[mode]} 
                    x={mouseState.x - 16} 
                    y={mouseState.y - 16} 
                    scale={new Point(3, 3)} /> : null
            }
        </>
    );
}

export default hot(App)
