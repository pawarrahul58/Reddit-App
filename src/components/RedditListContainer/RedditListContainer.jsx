import React, { useEffect, useState } from 'react'
import "./RedditListContainer.css";
import RedditListItem from '../RedditListItem';

const RedditListContainer = () => {

    const [reddits, setReddits] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const limit = 25;
    const sort = 'relevance';
    const searchQuery = 'aww';
    const key = 0;
    
    const getKey = () => key+1;

    const loadMoreReddits = () => {
        fetch(
            `https://www.reddit.com/search.json?q=${searchQuery}&limit=${limit}&sort=${sort}`
          )
            .then(res => res.json())
            .then(data => {
                data.data.children.map(data => data.data).map((data) => data.data);
                const reditItems = data.data.children.map((data) => data.data);
                setReddits(oldReditItems => [...oldReditItems, ...reditItems]);
                setLoading(false);
            })
            .catch(err => console.log(err));
    };

    const handleScroll = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
          e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight >= scrollHeight) {
            setLoading(true);
            loadMoreReddits();
        }
    };

    useEffect(() => {
        loadMoreReddits();
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {
                reddits.map((reddit) => {
                    return <RedditListItem reddit={reddit} val={getKey()}/>
                })
            }
        </div>
    )
}

export default RedditListContainer;