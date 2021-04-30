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
            loader.add('/image_02.png');
            loader.add('/logo2.svg');
            loader.load(()=>{
                // console.log('done loader')


                ////////////////////// BG
                let bg = new PIXI.Sprite(loader.resources["/image_02.png"].texture);
                let widthScale = (that.app.screen.width/bg.width)
                let heightScale = (that.app.screen.height/bg.height)

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


                ////////////////////// TEXT
                let textArr = [];

                function lineOfText(text, fontSizePixel, yPercentUpTo50){

                    const style = new PIXI.TextStyle({
                        fontFamily: 'mcsaatchi',
                        fontSize: fontSizePixel,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#ffffff',
                        wordWrap: true,
                        wordWrapWidth: that.app.screen.width / 2
                    });
                    const container = new PIXI.Container();
                    container.x = that.app.screen.width / 2;
                    container.y = (that.app.screen.height / 2)+(that.app.screen.height*yPercentUpTo50/200);

                    var textObj = new PIXI.Text(text, style);

                    container.addChild(textObj);
                    textObj.y = textObj.height;
                    container.pivot.x =textObj.width / 2
                    container.pivot.y =textObj.height / 2

                    var mask = new PIXI.Graphics();
                    mask.x = container.x;
                    mask.y = container.y;
                    mask.lineStyle(0);
                    mask.beginFill(0x000000, 0.1);
                    mask.drawRect(0, 0, 2, 2);
                    mask.width = container.width;
                    mask.height = container.height;
                    mask.pivot.x =1; // pivot pixel value is relative to drawRect size...
                    mask.pivot.y =1;

                    that.app.stage.addChild(mask);
                    container.mask = mask;
                    that.app.stage.addChild(container);

                    textArr.push(textObj);
                }
                lineOfText('M&CSAATCHISPENCER', 30, -33)
                lineOfText('CUDDLING WITH MY PET,', 60, -9)
                lineOfText('WE WILL BE DONE SOON', 60, 8)


                ////////////////////// LOGO
                let logo = new PIXI.Sprite(loader.resources["/logo2.svg"].texture);
                // let logo = PIXI.Sprite.from('/logo.svg')
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

                function mouseMoved(){
                    console.log('mouse '+Math.random())
                }
                // container.on('mousemove', mouseMoved);

                that.app.start();

                // TweenMax.set(logo, {alpha:0});
                // TweenMax.to(logo, 2.2, { alpha:1, ease: Power3.easeOut } );
                TweenMax.to(logo.scale, 2.2, { x: 0.3, y: 0.3, ease: Power3.easeOut} );

                var tl = new TimelineMax({onComplete:timelineEnd});
                tl.to(logo, 2.2, { alpha:1, ease: Power3.easeOut })
                    .to(logo, 1, {alpha:0, delay: 1.5, ease: Power3.easeOut})
                    .staggerTo(textArr, 1, { y: 0, ease: Power3.easeOut}, 0.1);

                function timelineEnd(){
                    console.log('ended')
                }

                // TweenMax.to(text1, 1, { y: 0, ease: Power3.easeOut} );

                window.addEventListener('resize', that.updateDimensions);

            });

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