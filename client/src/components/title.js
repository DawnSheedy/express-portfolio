import React from 'react';
import './../App.css'

const Title = (props) => {
    return (<div>
        <h1 className="App-headline">{/*<span className="entry-anim"><span className="welcome-text title-block">Hi, I'm</span>*/}<span style={{animationDelay:"0ms"}} className="App-headline title-block entry-anim">Dawn</span><span style={{animationDelay:"150ms"}} className="App-headline title-block entry-anim">Sheedy</span></h1>
        <h1 className="App-subline">{/*<span className="entry-anim"><span className="welcome-text title-block">Hi, I'm</span>*/}<span style={{animationDelay:"300ms"}} className="App-subline title-block entry-anim">(she/her)</span></h1>
        <h5 style={{animationDelay:"450ms"}} className="entry-anim">I make (and break) web apps.</h5>
        <hr style={{animationDelay:"1150ms"}} className="expand-anim"/>
    </div>);
}

export default Title;