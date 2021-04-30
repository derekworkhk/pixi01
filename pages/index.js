import Head from 'next/head'
import { TweenMax } from 'gsap'

import dynamic from 'next/dynamic'
import style2 from "../styles/Home2.module.css";
import Bwbutton from "../components/Bwbutton";
const Pixi = dynamic(import('../components/Pixi'), {ssr: false})

export default function Home() {
  let myButton = <Bwbutton>Contact us now?</Bwbutton>;
    // TweenMax.set(myButton,{alpha: 0})
    // TweenMax.to(myButton,1,{alpha: 1, delay: 8})
    //TODO make the animation work
  return (
    <>
      <Pixi />
      <div className={style2.buttonWrap}>{myButton}</div>
    </>
  )
}
