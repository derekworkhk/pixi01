import React from 'react';
import * as PIXI from "pixi.js";
import { TweenMax, Power3 } from 'gsap';
import '../styles/Pixi.module.css'

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
        let that = this

        that.app = new PIXI.Application(window.innerWidth, window.innerHeight,
            {
                backgroundColor: 0xFFFFFF
            });

        // full screen
        that.app.renderer.view.style.position = "absolute";
        that.app.renderer.view.style.display = "block";
        that.app.renderer.autoResize = true;
        that.app.renderer.resize(window.innerWidth, window.innerHeight);

        that.gameCanvas.appendChild(this.app.view);

        let loader = that.app.loader;
        function loaderDone(){
            console.log('done loader')

            let bg = new PIXI.Sprite(loader.resources["/image_02.png"].texture);

            console.log('bgw '+bg.width)
            console.log('bgh '+bg.height)

            let widthScale = (window.innerWidth/bg.width)
            let heightScale = (window.innerWidth/bg.height)

            if (widthScale>=1&&heightScale>=1){
                bg.scale.x=Math.min(widthScale,heightScale)
            } else {
                bg.scale.x=Math.max(widthScale,heightScale)
            }


            bg.x=0;
            bg.y=window.innerHeight;
            bg.anchor.x=0;
            bg.anchor.y=1;
            that.app.stage.addChild(bg);

            var style = new PIXI.TextStyle({
                fontFamily: 'mcsaatchi',
                fontSize: 48,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#ffffff',
                wordWrap: true,
                wordWrapWidth: 440
            });
            var text1 = new PIXI.Text('HOLD MY BEER. CUDDLING WITH MY CAT', style);
            text1.x = window.innerWidth/2;
            text1.y = window.innerHeight/2;
            // text1.alpha=0;
            that.app.stage.addChild(text1);

            // let logo = PIXI.Sprite.from('/logo.svg')
            let logo = new PIXI.Sprite(loader.resources["/logo.svg"].texture)
            console.log('logow '+logo.width)
            console.log('logoh '+logo.height)
            logo.anchor.set(0.5);
            logo.x = window.innerWidth/2;
            logo.y = window.innerHeight/2;
            logo.scale.x=1.3;
            logo.scale.y=1.3;
            logo.alpha=0;
            that.app.stage.addChild(logo);

            that.app.start();

            // TweenMax.set(logo, {alpha:0});
            TweenMax.to(logo, 2.5, { alpha:1, ease: Power3.easeOut } );
            TweenMax.to(logo.scale, 2.5, { x: 1, y: 1, ease: Power3.easeOut} );

            window.addEventListener('resize', that.updateDimensions);

        }
        loader
            .add('/image_02.png')
            .add('/mcsaatchiheavy.ttf')
            .add('/logo.svg')
            .load(loaderDone);
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