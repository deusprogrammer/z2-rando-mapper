import React, {useState} from 'react'
import { AutoResizeStage } from 'components/AutoResizeStage'
import App from 'App'

import { Provider } from 'react-redux'
import { configureStore } from 'store/configureStore'
import { NoEmitOnErrorsPlugin } from 'webpack'

const store = configureStore();

const modes = ["palace", "city1", "city2", "city3", "boulder", "demon", "bridge", "cave"];

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
        let newItem = { type: modes[mode%modes.length], x: mouseState.x, y: mouseState.y };
        setMapItems([...mapItems, newItem]);
    }

    const onRightMouseClick = () => {
        setMode(mode + 1);
    }

    return (
        <div style={{cursor: "none"}} onMouseMove={onMouseMove} onClick={() => {onMouseClick()}} onContextMenu={(e) => {e.preventDefault();onRightMouseClick();}}>
            <AutoResizeStage>
                <Provider store={store}>
                    <App mouseState={mouseState} mapItems={mapItems} mode={modes[mode % modes.length]} />
                </Provider>
            </AutoResizeStage>
        </div>
    )
}
