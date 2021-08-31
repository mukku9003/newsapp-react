import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
   static defaultProps = {
       country: "in",
       pageSize: 5,
       category: 'general'

   }

   static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


    constructor(){
        super();

        this.state = {
            articals:[],
            loading: false,
            page: 1,
            
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cee53ddee6c84fada808d3b8c82fb972&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let datas = await fetch(url);
        let  parsedData = await datas.json()
        this.setState({
            articals: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handleNext = async () =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cee53ddee6c84fada808d3b8c82fb972&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let datas = await fetch(url);
            let  parsedData = await datas.json()

            this.setState({
                articals: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }

    handlePre = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cee53ddee6c84fada808d3b8c82fb972&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        
        let datas = await fetch(url);
        let  parsedData = await datas.json()

        this.setState({
            articals: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" >Kal Tk Ki Taaza Khabar - Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articals.map((element)=>{
                        return <div className="col-md-4" key={element.url} >
                            <NewsItem title={element.title?element.title.slice(0,40):""} author={element.author} source={element.source.name} date={element.publishedAt} description={element.description?element.description.slice(0,88): ""} imgUrl={element.urlToImage} newsUrl={element.url}/>

                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between ">
                    
                <button disabled={this.state.page <=1 } type="button" className="btn btn-dark" onClick={this.handlePre}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} type="button" className="btn btn-dark"  onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
