import * as React from 'react';
import { fabric } from 'fabric';

export class Annotation extends React.Component<{}, {}> {
    canvas: fabric.Canvas;

    /**
     * 获取文档的大小
     */
    get clientRect() {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        return {
            width,
            height
        }
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('an');
        window.addEventListener('resize', this.handleWindowResize)
        this.handleWindowResize();
        this.createRect();
        this.canvas.on('mouse:dblclick', (e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <canvas id='an'></canvas>
            </div>
        );
    }

    /**
     * 处理window `resize`事件
     * @param factor draw 画布大小计算缩放比例
     */
    private handleWindowResize(e?: Event, factor = { width: 0.5, height: 0.5 }) {
        const { width, height } = this.getCanvasSize(factor);
        this.canvas.setDimensions({
            width,
            height
        });
    }

    /**
     * 获取画布大小
     * @param factor draw 画布大小计算缩放比例
     */
    private getCanvasSize(factor = { width: 0.5, height: 0.5 }) {
        const { width, height } = this.clientRect;

        return {
            width: (width - 188) * factor.width,
            height: (height - 60 * 2) * factor.height
        }
    }

    private createRect() {
        var rect = new fabric.Rect({
            left: 100,
            top: 50,
            fill: '#D81B60',
            width: 50,
            height: 50,
            strokeWidth: 2,
            stroke: "#880E4F",
            rx: 10,
            ry: 10,
            angle: 45,
            scaleX: 3,
            scaleY: 3,
            hasControls: true,
            // evented: false,
            // selectable: false
        });

        this.canvas.add(rect);
    }
}
