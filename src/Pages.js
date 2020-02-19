import React from 'react';
import './Pages.css';



class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick(page) {
        console.log('page: ' +  page)
        this.props.getData(this.props.chosenLink, page)
    }

    render() {
        let pages = [];
        for (let i = 0; i < this.props.pageNumber; i++)
            pages.push(i + 1);
        return (
            <div>
                {pages.map((page) => <a className="page-link" onClick={this.handlePageClick.bind(this,page)} key={page}>{page}</a>)}
            </div>
        )
    }
}

export default Pages;