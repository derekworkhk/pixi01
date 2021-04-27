import Head from 'next/head'
import styles from '../styles/Home.module.css'

import dynamic from 'next/dynamic'
const Pixi = dynamic(import('../components/Pixi'), {ssr: false})

export default function Home() {
  return (
    <>
      <Pixi />
    </>
  )
}
