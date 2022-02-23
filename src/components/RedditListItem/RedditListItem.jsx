import React from 'react'

const RedditListItem = (props) => {
    const { reddit, val } = props;
    
    const truncateText = (text, limit) => {
        const shortened = text.indexOf(' ', limit);
        if (shortened === -1) return text;
        return text.substring(0, shortened);
    };

    return (
        <div key={val} className="card">
            <div className="container">
                <h4><a href={reddit.url} target='_blank' rel="noreferrer">{truncateText(reddit.title, 50)}</a></h4>
                <img src={reddit.thumbnail} alt="No thumbnail"/>
                <p>{reddit.subreddit}</p>
            </div>
        </div>
    )
}

export default RedditListItem;