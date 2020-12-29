import React from 'react';
import './../App.css'

const Socials = (props) => {
    return (<div>
        <span className="entry-anim social-span" style={{animationDelay:"1000ms"}}><a href="mailto:contact@dawnsheedy.com">Contact</a></span>
        <div style={{animationDelay:"2500ms"}} className="vl"></div>
        <span className="entry-anim social-span" style={{animationDelay:"1250ms"}}><a href={process.env.PUBLIC_URL + '/resume-dawn-2020.pdf' }>Resumé</a></span>
        <div style={{animationDelay:"2500ms"}} className="vl"></div>
        <span className="entry-anim social-span" style={{animationDelay:"1500ms"}}><a href="https://github.com/dawnsheedy">GitHub</a></span>
        <div style={{animationDelay:"2500ms"}} className="vl"></div>
        <span className="entry-anim social-span" style={{animationDelay:"1750ms"}}><a href="https://www.linkedin.com/in/dawn-sheedy-a641b780/">LinkedIn</a></span>
    </div>);
}

export default Socials;