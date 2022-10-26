import React, { MouseEvent, useState, WheelEvent } from 'react'
import { AutoResizeStage } from 'components/AutoResizeStage'
import App from 'App'

import select from './assets/select.png';
import pointer from './assets/pointer.png';
import move from './assets/move.png';

import palace from './assets/palace.png';
import city1 from './assets/city1.png';
import city2 from './assets/city2.png';
import city3 from './assets/city3.png';
import cave from './assets/cave.png';
import demon from './assets/demon.png';
import boulder from './assets/boulder.png';
import bridge from './assets/bridge.png';

const modes =   ["select", "select-b",  "move", "palace", "city1", "city2", "city3", "boulder", "demon", "bridge", "cave"];

const cursors = ["default", "pointer", "move", "none",   "none",  "none",  "none",  "none",    "none",  "none",   "none"];

export const Web = () => {
    const [mode, setMode] = useState(0);

    const [mouseState, setMouseState] = useState<MouseState>({
        x: 0,
        y: 0,
        buttons: {}
    });

    const [mapItems, setMapItems] = useState<Array<MapItem>>([]);

    const onMouseMove = ({ pageX: x, pageY: y, buttons }: { pageX: number, pageY: number, buttons: Object }) => {
        setMouseState({
            x,
            y,
            buttons
        })
    };

    const onMouseClick = () => {
        if (mode%modes.length <= 2) {
            return;
        }

        let newItem = { type: modes[mode % modes.length], x: mouseState.x - 16, y: mouseState.y - 16, requirement: 0, boss: 0 };
        setMapItems([...mapItems, newItem]);
    }

    const onRightMouseClick = () => {
    }

    const onMapItemChange = (index : number, x : number, y : number) => {
        let items = [...mapItems];
        mapItems[index].x = x;
        mapItems[index].y = y;
        setMapItems(items);
    }

    const onMapItemClick = (index : number) => {
        let items = [...mapItems];
        if (mode % modes.length === 0) {   
            mapItems[index].requirement++;
        } else if (mode % modes.length === 1) {
            mapItems[index].boss++;
        }
        setMapItems(items);
    }

    const onMouseWheel = ({deltaY} : WheelEvent<HTMLDivElement>) => {
        let newMode = 0;
        if (deltaY < 0) {
            newMode = mode - 1;
        } else if (deltaY > 0) {
            newMode = mode + 1;
        }

        if (newMode < 0) {
            newMode = modes.length - newMode;
        }

        setMode(newMode);
    }

    const onMenuClick = (index : number, e : MouseEvent<HTMLLIElement>) => {
        setMode(index);
        e.preventDefault();
    }

    return (
        <div style={{ cursor: cursors[mode % cursors.length] }} onMouseMove={onMouseMove} onClick={() => { onMouseClick() }} onWheel={(e) => {onMouseWheel(e);}} onContextMenu={(e) => { e.preventDefault(); onRightMouseClick(); }}>
            <div id="menu">
                <h2>Zelda 2 Rando Mapper</h2>
                <ul>
                    <li className={modes[mode % modes.length] === "select" ? "selected" : ""} onClick={(e) => {onMenuClick(0, e)}}><img src={select.src} title="Click on map items to add requirements"/></li>
                    <li className={modes[mode % modes.length] === "select-b" ? "selected" : ""} onClick={(e) => {onMenuClick(1, e)}}><img src={pointer.src} title="Click on palaces to set boss" /></li>
                    <li className={modes[mode % modes.length] === "move" ? "selected" : ""} onClick={(e) => {onMenuClick(2, e)}}><img src={move.src} title="Click and drag map items to move them" /></li>
                    <li className={modes[mode % modes.length] === "palace" ? "selected" : ""} onClick={(e) => {onMenuClick(3, e)}}><img src={palace.src} /></li>
                    <li className={modes[mode % modes.length] === "city1" ? "selected" : ""} onClick={(e) => {onMenuClick(4, e)}}><img src={city1.src} /></li>
                    <li className={modes[mode % modes.length] === "city2" ? "selected" : ""} onClick={(e) => {onMenuClick(5, e)}}><img src={city2.src} /></li>
                    <li className={modes[mode % modes.length] === "city3" ? "selected" : ""} onClick={(e) => {onMenuClick(6, e)}}><img src={city3.src} /></li>
                    <li className={modes[mode % modes.length] === "boulder" ? "selected" : ""} onClick={(e) => {onMenuClick(7, e)}}><img src={boulder.src} /></li>
                    <li className={modes[mode % modes.length] === "demon" ? "selected" : ""} onClick={(e) => {onMenuClick(8, e)}}><img src={demon.src} /></li>
                    <li className={modes[mode % modes.length] === "bridge" ? "selected" : ""} onClick={(e) => {onMenuClick(9, e)}}><img src={bridge.src} /></li>
                    <li className={modes[mode % modes.length] === "cave" ? "selected" : ""} onClick={(e) => {onMenuClick(10, e)}}><img src={cave.src} /></li>
                </ul>
            </div>
            <AutoResizeStage>
                <App 
                    mouseState={mouseState} 
                    mapItems={mapItems} 
                    mode={modes[mode % modes.length]} 
                    onMapItemChange={(index : number, x : number, y : number) => {onMapItemChange(index, x, y)}}
                    onMapItemClick={(index: number) => {onMapItemClick(index)}} />
            </AutoResizeStage>
        </div>
    )
}
