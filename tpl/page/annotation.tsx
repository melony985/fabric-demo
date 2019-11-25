import * as React from 'react';
import { fabric } from 'fabric';

export class Annotation extends React.Component<{}, {}> {
    canvas: typeof fabric.Canvas;

    componentDidMount() {
        new fabric.Canvas('an');
    }

    render() {
        return (
            <div>
                <h1>Hello !</h1>
                <div id='an'></div>
            </div>
        );
    }
}
