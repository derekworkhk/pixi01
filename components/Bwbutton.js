import style from '../styles/bwbutton.module.css'

function Bwbutton(props){
    let finalProps = {
        click: props.click || null
    }
    return <div onClick={finalProps.click} className={style.bwbutton1}>{props.children}</div>
}

export default Bwbutton