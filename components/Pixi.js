import React from 'react';
import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax, Power2, Power3 } from 'gsap';
import '../styles/Pixi.module.css'
var FontFaceObserver = require('fontfaceobserver');

class PixiComponent extends React.Component {

    gameCanvas = HTMLDivElement;
    app = PIXI.Application;

    constructor() {
        super();
    }

    onFinishFunction(){
        if(typeof this.props.onFinish==='function')
            this.props.onFinish();
    }

    componentDidMount() {
        let isMobile = false;
        if(Math.max(window.innerWidth, window.innerHeight)<=767)
            isMobile = true;

        let that = this;

        var font = new FontFaceObserver('mcsaatchi');
        font.load().then(function () {
            console.log('My font family has loaded');

            that.app = new PIXI.Application(1920, 1080);

            // full screen
            that.app.renderer.view.style.position = "absolute";
            that.app.renderer.view.style.display = "block";
            that.app.renderer.autoResize = true;
            that.app.renderer.antialias = true;
            that.app.renderer.resize(window.innerWidth, window.innerHeight);
            let appResize = function(){
                that.app.renderer.resize(window.innerWidth, window.innerHeight);
            }
            that.app.renderer.backgroundColor = 0x000000;
            that.gameCanvas.appendChild(that.app.view);

            let loader = that.app.loader;
            loader.add('/image_02.png');
            loader.add('/logo2.svg');
            loader.load(()=>{
                // console.log('done loader')


                ////////////////////// BG
                let bg = new PIXI.Sprite(loader.resources["/image_02.png"].texture);
                let widthScale = (bg.width/that.app.screen.width)
                let heightScale = (bg.height/that.app.screen.height)

                let finalScale=1;
                if (widthScale<1&&heightScale<1){
                    finalScale = Math.max(1/widthScale,1/heightScale)
                } else if (widthScale>=1&&heightScale>=1){
                    finalScale = Math.max(1/widthScale,1/heightScale)
                } else if (widthScale<1){
                    finalScale=1/widthScale;
                } else{
                    finalScale=1/heightScale
                }
                let littleMoreFactor=(bg.width+20)/bg.width
                bg.scale.x=finalScale*littleMoreFactor;
                bg.scale.y=finalScale*littleMoreFactor;

                bg.x=-10;
                bg.y=that.app.screen.height;
                bg.alpha=0;
                let bgResize=function(){
                    let widthScale = (bg.width/that.app.screen.width)
                    let heightScale = (bg.height/that.app.screen.height)

                    let finalScale=1;
                    if (widthScale<1&&heightScale<1){
                        finalScale = Math.max(1/widthScale,1/heightScale)
                    } else if (widthScale>=1&&heightScale>=1){
                        finalScale = Math.max(1/widthScale,1/heightScale)
                    } else if (widthScale<1){
                        finalScale=1/widthScale;
                    } else{
                        finalScale=1/heightScale
                    }
                    bg.scale.x=finalScale;
                    bg.scale.y=finalScale;

                    bg.x=0;
                    bg.y=that.app.screen.height;
                }
                bg.anchor.x=0;
                bg.anchor.y=1;
                that.app.stage.addChild(bg);


                ////////////////////// TEXT

                let redChannelFilter = new PIXI.filters.ColorMatrixFilter();
                redChannelFilter.matrix = [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                ];
                let greenChannelFilter = new PIXI.filters.ColorMatrixFilter();
                greenChannelFilter.matrix = [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                ];
                let blueChannelFilter = new PIXI.filters.ColorMatrixFilter();
                blueChannelFilter.matrix = [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                ];


                let textArr = [];
                let resizeFunArr = [];

                function lineOfText(text, fontSizePixel, yPixel, xPos='center'){

                    const style = new PIXI.TextStyle({
                        fontFamily: 'mcsaatchi',
                        fontSize: fontSizePixel,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#ffffff',
                        wordWrap: true,
                        letterSpacing: 1,
                        wordWrapWidth: that.app.screen.width-50
                    });
                    const container = new PIXI.Container();
                    if(xPos=='left'){
                        container.x = 25;
                    } else{
                        container.x = that.app.screen.width / 2;
                    }
                    container.y = (that.app.screen.height / 2) + yPixel;

                    var textObj = new PIXI.Text(text, style);
                    var textObjGreen = new PIXI.Text(text, style);
                    var textObjBlue = new PIXI.Text(text, style);

                    const containner = new PIXI.Container();
                    containner.x=0;
                    containner.y=textObj.height+49;
                    container.addChild(containner)
                    containner.addChild(textObj)
                    // container.addChild(textObj);
                    // textObj.y = textObj.height+1;
                    if(xPos=='left'){
                        container.pivot.x = 0
                    } else{
                        container.pivot.x =textObj.width / 2
                    }
                    container.pivot.y =textObj.height / 2
                    containner.addChild(textObjGreen)
                    containner.addChild(textObjBlue)
                    textObj.filters = [redChannelFilter];
                    textObjGreen.filters = [greenChannelFilter];
                    textObjBlue.filters = [blueChannelFilter];
                    textObjGreen.filters[0].blendMode = PIXI.BLEND_MODES.ADD;
                    textObjBlue.filters[0].blendMode = PIXI.BLEND_MODES.ADD;
                    textObjGreen.x=3;
                    textObjBlue.x=5;


                    var mask = new PIXI.Graphics();
                    mask.x = container.x;
                    mask.y = container.y;
                    mask.lineStyle(0);
                    mask.beginFill(0x000000, 0.5);
                    mask.drawRect(0, 0, 2, 2);
                    mask.width = container.width+35;
                    mask.height = container.height+35;
                    if(xPos=='left') {
                        mask.pivot.x = 0;
                    }else{
                        mask.pivot.x =1; // pivot pixel value is relative to drawRect size...
                    }
                    mask.pivot.y =1;

                    that.app.stage.addChild(mask);
                    container.mask = mask;
                    that.app.stage.addChild(container);

                    textArr.push(containner);
                    let resizeFun = function(){

                        container.x = that.app.screen.width / 2;
                        container.y = (that.app.screen.height / 2)+yPixel;
                        mask.x = container.x;
                        mask.y = container.y;
                    }
                    resizeFunArr.push(resizeFun)
                }
                if(isMobile){
                    lineOfText('M&CSAATCHISPENCER', 20, -160, 'left')
                    lineOfText('CUDDLING WITH', 40, -60, 'left')
                    lineOfText('MY PET, WE WILL', 40, 0, 'left')
                    lineOfText('BE DONE SOON.', 40, 60, 'left')
                } else {
                    lineOfText('M&CSAATCHISPENCER', 30, -165)
                    lineOfText('CUDDLING WITH MY PET,', 60, -50)
                    lineOfText('WE WILL BE DONE SOON.', 60, 50)
                }


                let textRepos = function(){
                    resizeFunArr.forEach((thisTextReposFun)=>{
                        thisTextReposFun();
                    })
                }

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
                let logoResize = function(){
                    logo.x = that.app.screen.width / 2;
                    logo.y = that.app.screen.height / 2;
                }
                logo.scale.x=0.5;
                logo.scale.y=0.5;
                logo.alpha=0;
                that.app.stage.addChild(logo);

                // draw a rectangle
                // var rect = new PIXI.Graphics();
                // rect.beginFill(0xFFFF00);
                // rect.drawRect(0, 0, 5, 5);
                // that.app.stage.addChild(rect);
                // rect.pivot.x=3;
                // rect.pivot.y=3;

                let rectX = Math.floor(that.app.screen.width / 2);
                let rectY = Math.floor(that.app.screen.height / 2);

                // rect.x=rectX;
                // rect.y=rectY;

                ///////////// mouse event
                that.app.stage.interactive = true;
                let cursorMomentum = 0.14;
                let mouseX = Math.floor(that.app.screen.width / 2);
                let mouseY = Math.floor(that.app.screen.height / 2);
                that.app.stage.on("pointermove", (ev) => {
                    mouseX = Math.floor(ev.data.global.x);
                    mouseY = Math.floor(ev.data.global.y);

                });
                let count=0;
                that.app.ticker.add(function(delta) {
                    if(++count>1){
                        count=0;
                    } else {
                        bg.x = ((2*mouseX / that.app.screen.width)-1)*5-10 //0 ~ -20

                        if (rectX != mouseX || rectY != mouseY) {

                            rectX = Math.floor((rectX + mouseX) / 2)
                            rectY = Math.floor((rectY + mouseY) / 2)

                            // rect.x=rectX;
                            // rect.y=rectY;
                            let diffX = rectX - mouseX;
                            if (diffX > 300) diffX = 300;
                            else if (diffX < -300) diffX = -300;
                            let diffY = rectY - mouseY;
                            if (diffY > 300) diffY = 300
                            else if (diffY < -300) diffY = -300


                            textArr.forEach((textStack, index) => {
                                let factor = 1;
                                if (index === 0) {
                                    factor = 0.5
                                }

                                textStack.children[0].x = diffX * (diffX > 0 ? 0.08 : 0.12) * factor
                                textStack.children[0].y = diffY * (diffY > 0 ? 0.08 : 0.12) * factor

                                textStack.children[1].x = diffX * 0.1 * factor
                                textStack.children[1].y = diffY * 0.1 * factor

                                textStack.children[2].x = diffX * (diffX > 0 ? 0.12 : 0.08) * factor
                                textStack.children[2].y = diffY * (diffY > 0 ? 0.12 : 0.08) * factor

                            });
                        }
                    }

                });

                that.app.start();

                // TweenMax.set(logo, {alpha:0});
                // TweenMax.to(logo, 2.2, { alpha:1, ease: Power3.easeOut } );
                TweenMax.to(logo.scale, 3, { x: 0.3, y: 0.3, ease: Power2.easeOut} );

                var tl = new TimelineMax({onComplete:timelineEnd});
                tl.to(bg, 0.5, { alpha: 1 } )
                    .to(logo, 3, { alpha:1, ease: Power2.easeOut })
                    .to(logo, 1, {alpha:0, delay: 1.5, ease: Power3.easeOut})
                    .staggerTo(textArr, 1, { y: 0, ease: Power3.easeOut}, 0.1);

                function timelineEnd(){
                    console.log('ended')
                    that.onFinishFunction();
                }

                // TweenMax.to(text1, 1, { y: 0, ease: Power3.easeOut} );
                var resizeChain = function(){
                    appResize();
                    bgResize();
                    logoResize();
                    textRepos();
                };

                window.addEventListener('resize', resizeChain);
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