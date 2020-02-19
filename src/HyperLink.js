import React from 'react';
import './HyperLink.css';

const HyperLink = (props) => {
    let info = props.hyperLinkInfo;
    let maxStars = props.maxStars;
    return (
        <div className='link'>
                <img src={info.owner.avatar_url}/>
                <div>{info.name}</div>
                <a href={info.html_url}>@{info.owner.login}</a>
                <div>{info.stargazers_count} stars</div>
                <div>SAFGD: {maxStars - info.stargazers_count}</div>
            </div>
    )
}

export default HyperLink;