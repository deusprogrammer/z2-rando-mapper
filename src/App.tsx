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

import c0 from './assets/0.png';
import c1 from './assets/1.png';
import c2 from './assets/2.png';
import c3 from './assets/3.png';
import c4 from './assets/4.png';
import c5 from './assets/5.png';
import c6 from './assets/6.png';
import c7 from './assets/7.png';
import c8 from './assets/8.png';
import c9 from './assets/9.png';
import ca from './assets/a.png';
import cb from './assets/b.png';

import land from './assets/green.png';

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

const bossMap : any = {
    palace: [ null, horsehead.src, helmethead.src, rebo.src, karrock.src, gooma.src, barba.src, thunderbird.src],
    cave: [ null, c0.src, c1.src, c2.src, c3.src, c4.src, c5.src, c6.src, c7.src, c8.src, c9.src, ca.src, cb.src]
}

const App: React.FC<{ mouseState: MouseState, mapItems: Array<MapItem>, landMasses: Array<LandMass>, newLand: LandMass | null, mode: string, onMapItemChange: Function, onMapItemClick: Function }> = ({ mouseState, mapItems, landMasses, newLand, mode, onMapItemChange, onMapItemClick }) => {
    const [selectedMapItem, setSelectedMapItem] = useState<number>(-1);

    const onMousePress = (index : number) => {
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
            {landMasses.map(({top, left, bottom, right}: LandMass, index) => {
                return (
                    <Sprite 
                        key={`landmass-${index}`}
                        image={land.src} 
                        x={Math.min(left, right)} 
                        y={Math.min(top, bottom)} 
                        width={Math.abs(right - left)} 
                        height={Math.abs(bottom - top)} /> 
                )
            })}
            {newLand ? 
                <Sprite 
                    image={land.src} 
                    x={Math.min(newLand.left, newLand.right)} 
                    y={Math.min(newLand.top, newLand.bottom)} 
                    width={Math.abs(newLand.right - newLand.left)} 
                    height={Math.abs(newLand.bottom - newLand.top)} /> : null
            }
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
                    { ["cave", "palace"].includes(type) && bossMap[type][boss % bossMap[type].length] !== null ?
                        <Sprite 
                            image={bossMap[type][boss % bossMap[type].length]} 
                            x={(mode === "move" && index === selectedMapItem) ? mouseState.x + 32 : itemX + 32 + 16} 
                            y={(mode === "move" && index === selectedMapItem) ? mouseState.y - 32 - 16 : itemY - 32} 
                            scale={new Point(2.0, 2.0)} /> : null
                    }
                </React.Fragment>)
                }
            )}
            {!['select', 'select-b', 'move', 'land'].includes(mode) ?
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
