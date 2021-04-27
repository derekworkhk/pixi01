import React from 'react';
import * as PIXI from "pixi.js";
import gsap from 'gsap';

class PixiComponent extends React.Component {
    state = { width: 0, height: 0 };
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    gameCanvas = HTMLDivElement;
    app = PIXI.Application;

    constructor() {
        super();
    }

    componentDidMount() {
        this.app = new PIXI.Application(window.innerWidth, window.innerHeight,
            {
                backgroundColor: 0x10bb99
            });

        // full screen
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        this.gameCanvas.appendChild(this.app.view);

        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 48,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 440
        });

        console.log(this.app.view.width);
        console.log(this.app.view.height);

        var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
        richText.x = this.state.width/2;
        richText.y = this.state.height/2;

        this.app.stage.addChild(richText);

        this.app.start();

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        this.app.stop();
    }

    render() {
        let component = this;
        return (
            <div ref={(thisDiv) => { component.gameCanvas = thisDiv }} />
        );
    }
}

export default PixiComponent;