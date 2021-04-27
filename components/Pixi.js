import React from 'react';
import * as PIXI from "pixi.js";
import { TweenMax, Power3 } from 'gsap';

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
                backgroundColor: 0xFFFFFF
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

        // let texture = PIXI.utils.TextureCache["public/logo.svg"];
        let logo = PIXI.Sprite.from('/logo.svg')

        console.log(logo.width)
        console.log(logo.height)

        // var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
        logo.anchor.set(0.5);
        logo.x = window.innerWidth/2;
        logo.y = window.innerHeight/2;

        this.app.stage.addChild(logo);

        this.app.start();

        TweenMax.set(logo, {alpha:0});
        TweenMax.set(logo.scale, {x: 1.3, y: 1.3});
        TweenMax.to(logo, 2.5, { alpha:1, ease: Power3.easeOut } );
        TweenMax.to(logo.scale, 2.5, { x: 1, y: 1, ease: Power3.easeOut} );

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