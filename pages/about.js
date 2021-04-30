import Logo from '../components/logo'
import Bwbutton from '../components/Bwbutton'

function About() {
    function doSomething(){
        console.log('adslfkalsdfasdf ')
    }
    return <>
        <div>About page 101</div><Logo />
        <div><Bwbutton click={doSomething}>Contact us now?</Bwbutton></div>
    </>
}

export default About