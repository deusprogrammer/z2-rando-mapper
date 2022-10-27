import { Graphics } from 'pixi.js';
import { PixiComponent, Stage } from '@inlet/react-pixi';

type RectangleProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    fill: number,
    alpha: number
}

export const Rectangle = PixiComponent('Rectangle', {
    create: props => new Graphics(),
    applyProps: (instance, oldProps: RectangleProps, props: RectangleProps) => {
        const { x, y, width, height, fill, alpha }: RectangleProps = props;

        if (x !== oldProps.x || y !== oldProps.y || width !== oldProps.width || height !== oldProps.height || fill !== oldProps.fill) {
            instance.clear();
            instance.beginFill(fill);
            instance.drawRect(x, y, width, height);
            instance.endFill();
        }

        if (alpha !== oldProps.alpha) {
            instance.alpha = alpha;
        }
    },
});