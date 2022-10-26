import React, { useState } from 'react'
import { AutoResizeStage } from 'components/AutoResizeStage'
import App from 'App'

import { Provider } from 'react-redux'
import { configureStore } from 'store/configureStore'

const store = configureStore();

const modes = ["select", "move", "palace", "city1", "city2", "city3", "boulder", "demon", "bridge", "cave"];

const cursors = ["default", "move", "none", "none", "none", "none", "none", "none" ];

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
        if (mode%modes.length <= 1) {
            return;
        }

        let newItem = { type: modes[mode % modes.length], x: mouseState.x, y: mouseState.y, requirement: 0 };
        setMapItems([...mapItems, newItem]);
    }

    const onRightMouseClick = () => {
        setMode(mode + 1);
    }

    const onMapItemChange = (index : number, x : number, y : number) => {
        let items = [...mapItems];
        mapItems[index].x = x;
        mapItems[index].y = y;
        setMapItems(items);
    }

    const onMapItemClick = (index : number) => {
        let items = [...mapItems];
        mapItems[index].requirement++;
        setMapItems(items);
    }

    return (
        <div style={{ cursor: cursors[mode % modes.length] }} onMouseMove={onMouseMove} onClick={() => { onMouseClick() }} onContextMenu={(e) => { e.preventDefault(); onRightMouseClick(); }}>
            <AutoResizeStage>
                <Provider store={store}>
                    <App 
                        mouseState={mouseState} 
                        mapItems={mapItems} 
                        mode={modes[mode % modes.length]} 
                        onMapItemChange={(index : number, x : number, y : number) => {onMapItemChange(index, x, y)}}
                        onMapItemClick={(index: number) => {onMapItemClick(index)}} />
                </Provider>
            </AutoResizeStage>
        </div>
    )
}
