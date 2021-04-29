import React from 'react';
import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax, Power3 } from 'gsap';
import '../styles/Pixi.module.css'
var FontFaceObserver = require('fontfaceobserver');

class PixiComponent extends React.Component {
    updateDimensions = () => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    gameCanvas = HTMLDivElement;
    app = PIXI.Application;

    constructor() {
        super();
    }

    componentDidMount() {
        let that = this;

        var font = new FontFaceObserver('mcsaatchi');
        font.load().then(function () {
            console.log('My font family has loaded');
            that.app = new PIXI.Application(1920, 1080);

            // full screen
            that.app.renderer.view.style.position = "absolute";
            that.app.renderer.view.style.display = "block";
            that.app.renderer.autoResize = true;
            that.app.renderer.resize(window.innerWidth, window.innerHeight);
            that.app.renderer.backgroundColor = 0x000000;
            that.gameCanvas.appendChild(that.app.view);

            let loader = that.app.loader;
            function loaderDone(){
                // console.log('done loader')

                let bg = new PIXI.Sprite(loader.resources["/image_02.png"].texture);

                // console.log('bgw '+bg.width)
                // console.log('bgh '+bg.height)

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
                    fontSize: 60,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#ffffff',
                    wordWrap: true,
                    wordWrapWidth: 440
                });

                const container = new PIXI.Container();
                container.x = that.app.screen.width / 2;
                container.y = that.app.screen.height / 2;

                var text1 = new PIXI.Text('HOLD MY BEER. CUDDLING WITH MY CAT', style);
                // text1.anchor.set(0.5);
                console.log('container w '+text1.width)
                console.log('container h '+text1.height)
                container.addChild(text1);
                text1.y = text1.height;
                container.pivot.x =text1.width / 2
                container.pivot.y =text1.height / 2
                // text1.alpha=0;

                // let's create a moving shape
                var thing = new PIXI.Graphics();

                thing.beginFill(0xFFFFFF, 0.5);
                thing.x = that.app.screen.width / 2;
                thing.y = that.app.screen.height / 2;
                thing.drawRect(0, 0, 2, 2);
                thing.width = container.width;
                thing.height = container.height;
                thing.pivot.x =1; // pivot pixel value is relative to drawRect size...
                thing.pivot.y =1;
                // thing.anchor.set(0.5);

                that.app.stage.addChild(thing);

                thing.beginFill(0x8bc5ff, 1);
                thing.lineStyle(0);
                thing.backgroundColor = 0xFF0000;

                container.mask = thing;


                that.app.stage.addChild(container);

                // let logo = PIXI.Sprite.from('/logo.svg')

                let logo = new PIXI.Sprite(loader.resources["/logo2.svg"].texture);
                // var tex = PIXI.Texture.from("/logo2.svg", {resourceOptions: {scale:1}});
                // let logo = new PIXI.Sprite(tex);
                // console.log('logow '+logo.width)
                // console.log('logoh '+logo.height)
                logo.anchor.set(0.5);
                logo.x = that.app.screen.width / 2;
                logo.y = that.app.screen.height / 2;
                logo.scale.x=0.5;
                logo.scale.y=0.5;
                logo.alpha=0;
                that.app.stage.addChild(logo);

                that.app.start();

                // TweenMax.set(logo, {alpha:0});
                // TweenMax.to(logo, 2.2, { alpha:1, ease: Power3.easeOut } );
                TweenMax.to(logo.scale, 2.2, { x: 0.3, y: 0.3, ease: Power3.easeOut} );

                var tl = new TimelineMax({onComplete:timelineEnd});
                tl.to(logo, 2.2, { alpha:1, ease: Power3.easeOut })
                    .to(logo, 1, {alpha:0, delay: 1.5, ease: Power3.easeOut})
                    .to(text1, 1, { y: 0, ease: Power3.easeOut});

                function timelineEnd(){
                    console.log('ended')
                }

                // TweenMax.to(text1, 1, { y: 0, ease: Power3.easeOut} );

                window.addEventListener('resize', that.updateDimensions);

            }
            loader
                .add('/image_02.png')
                .add('/mcsaatchiheavy.ttf')
                // .add('/logo.svg')
                .add('/logo2.svg')
                .load(loaderDone);

        });




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