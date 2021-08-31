import React, { Component } from 'react'

export default class NewsItem extends Component {
    
    render() {
        let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
            <div className="card " >
            <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}> 
                        {source}</span>
                <img src={imgUrl? imgUrl: "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fa08fe973-218f-4437-a5db-37ed55360e48.jpg?source=next-opengraph&fit=scale-down&width=900"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><small className="text-muted">By {author ? "Unknown": author} on {date}</small> </p>

                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
                </div>
            </div>
        )
    }
}
