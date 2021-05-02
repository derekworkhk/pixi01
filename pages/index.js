import Head from 'next/head'
import { TweenMax } from 'gsap'
import React from 'react'

import dynamic from 'next/dynamic'
import style2 from "../styles/Home2.module.css";
import Bwbutton from "../components/Bwbutton";
const Pixi = dynamic(import('../components/Pixi'), {ssr: false})

export default function Home() {
    let buttonProp = {
        'staticText': 'Contact us now?',
        'hoverText': 'Email',
        'clickType': 'link',
        'link': 'mailto:spencer@mcsaatchi.com'
    }
    let email = 'spencer@mcsaatchi.com';
    // TweenMax.set(myButton,{alpha: 0})
    //TODO make the animation work

    let buttonWrap = React.createRef();


    // TweenMax.set(buttonWrap.current,{alpha: 0})
    function showButton(){
        console.log('trigger parent finishFunction')
        TweenMax.set(buttonWrap.current, {display: 'block'})
        TweenMax.to(buttonWrap.current,0.5,{alpha: 1})
    }
  return (
    <>
      <Pixi onFinish={showButton} />
      <div className={style2.buttonWrap} ref={buttonWrap}><Bwbutton buttonProp={buttonProp} /></div>
    </>
  )
}
