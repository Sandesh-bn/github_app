import React from 'react';
import HyperLink from './HyperLink';

export default class HyperLinks extends React.Component {
    render(){
     
        return (
            <div className='hyper-links'>
                {
                    this.props.chosenHyperLinks.map((hyperLinkInfo) => <HyperLink maxStars={this.props.maxStars} key={hyperLinkInfo.id} hyperLinkInfo={hyperLinkInfo}/>)
                }
            </div>
        )
    }
}