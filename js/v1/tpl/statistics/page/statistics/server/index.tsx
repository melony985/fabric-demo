import { Radium } from 'common/radium';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { fabric } from 'fabric';
import { IRectOptions } from 'fabric/fabric-impl';

@Radium
class ServerView extends React.Component<RouteComponentProps<any>, {}> {
    private PROPORTION = { width: 1, height: 1 };
    private canvas: fabric.Canvas;

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

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('an');
        window.addEventListener('resize', this.handleWindowResize)
        this.handleWindowResize();
        this.drowRect();
        this.drowPath();
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
    private handleWindowResize = (e?: Event, factor = this.PROPORTION) => {
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
    private getCanvasSize = (factor = this.PROPORTION) => {
        const { width, height } = this.clientRect;

        return {
            width: (width - 188) * factor.width,
            height: (height - 60 * 2) * factor.height
        }
    }

    private drowRect(config: IRectOptions) {
        var rect = new fabric.Rect(Object.assign({}, {
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
        }, config));

        this.canvas.add(rect);
    }

    private drowPath() {
        var line = new fabric.Path('M 65 0 Q 100, 100, 200, 0', { fill: '', stroke: 'black', objectCaching: false });
    }
}

export const Server = withRouter(ServerView);
