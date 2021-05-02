import style from '../styles/bwbutton.module.css'

function Bwbutton({buttonProp}){
    let finalProps = {
        // click: props.click || null,
        staticText: buttonProp.staticText || 'Click Me',
        hoverText: buttonProp.hoverText || null,
        clickType: buttonProp.clickType || 'onClickFunction',
        link: buttonProp.link || null,
        onClickFunction: buttonProp.onClickFunction || function(){console.log('click')}
    }
    return <a href={buttonProp.link}><div onClick={finalProps.onClickFunction} className={style.bwbutton1}>
        <div className={style.wbackground}></div>
        <div className={style.staticInner}>{finalProps.staticText}</div>
        <div className={style.hoverInner}>{finalProps.hoverText}</div>
    </div></a>
}

export default Bwbutton