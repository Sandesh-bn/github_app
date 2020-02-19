import React from 'react';
import './App.css';
import HyperLinks from './HyperLinks';
import Pages from './Pages';
class App extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {
      chosenLink: 'All',
      chosenHyperLinks: [],
      allHyperLinks: [],
      totalCount: 0,
      maxStars: 0
    }
  }

  handleClick(linkName) {
   
    if (linkName == 'All') {
      this.setState({
        chosenHyperLinks: this.state.allHyperLinks,
        chosenLink: 'All'
      })
    }
    else {
      this.getData(linkName)
    }

  }

  getData(linkName, page = '1') {
    
    
    let url = `https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&page=${page}&per_page=5`;
    if (linkName === 'C++')
      url = `https://api.github.com/search/repositories?q=stars:%3E10000+language:cpp&sort=stars&page=${page}&per_page=5`
    else if (linkName != 'All')
      url = `https://api.github.com/search/repositories?q=stars:%3E10000+language:${linkName}&sort=stars&page=${page}&per_page=5`
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          
          this.setState((prevState, props) => {
              return {
                pageNumber: (result.items.length > 5)? 5: result.items.length,
                chosenHyperLinks: result.items,
                allHyperLinks: result.items,
                chosenLink: linkName,
                maxStars: Math.max(prevState.maxStars , result.items[0].stargazers_count)
              };
          })
        },
        (error) => {
          console.log('$$error')
          console.log(error);
        }
      )
  }

  componentDidMount() {
    this.getData('All');
    
  }

  render() {
    
    return (
    <div className="App">
      <div className='github-links'>
        {this.props.languages.map((language) => {
          return <span key={language} className={"anchor " + (this.state.chosenLink === language? 'selected-link': '')} 
                    onClick={this.handleClick.bind(this,language)}>
                   {language}
                </span>
        })}
      </div>
      <HyperLinks className='hyper-links' maxStars={this.state.maxStars} chosenHyperLinks={this.state.chosenHyperLinks}/>
      <Pages chosenLink={this.state.chosenLink} getData={this.getData} pageNumber={this.state.pageNumber}/>
    </div>
  );
  }
}
  
App.defaultProps = {
  languages : ['All', 'JavaScript', 'Ruby', 'C++', 'Java']
}

export default App;
