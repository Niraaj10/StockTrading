import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Skeleton = () => (
    <>
        <div className="skeleton-item mb-6 p-4 px-36 border-b border-[#303030] pb-4 animate-pulse">
            <div className='flex gap-5 items-center'>

                <div className='basis-[30%]'>
                    <div className="skeleton-image bg-gray-500  rounded-md mt-4 w-full h-48"></div>
                </div>


                <div className='basis-[70%]'>
                    <div className="skeleton-headline rounded-md  bg-gray-400 h-6 w-3/4 mb-2"></div>
                    <div className="skeleton-date rounded-md  bg-gray-300 h-4 w-1/4 mb-4"></div>
                    <div className="skeleton-summary rounded-md  bg-gray-500 h-2 w-full mb-2"></div>
                </div>
            </div>

        </div>

        
        <div className="skeleton-item mb-6 p-4 px-36 border-b border-[#303030] pb-4 animate-pulse">
            <div className='flex gap-5 items-center'>

                <div className='basis-[30%]'>
                    <div className="skeleton-image bg-gray-500  rounded-md mt-4 w-full h-48"></div>
                </div>


                <div className='basis-[70%]'>
                    <div className="skeleton-headline rounded-md  bg-gray-400 h-6 w-3/4 mb-2"></div>
                    <div className="skeleton-date rounded-md  bg-gray-300 h-4 w-1/4 mb-4"></div>
                    <div className="skeleton-summary rounded-md  bg-gray-500 h-2 w-full mb-2"></div>
                </div>
            </div>

        </div>

        <div className="skeleton-item mb-6 p-4 px-36 border-b border-[#303030] pb-4 animate-pulse">
            <div className='flex gap-5 items-center'>

                <div className='basis-[30%]'>
                    <div className="skeleton-image bg-gray-500  rounded-md mt-4 w-full h-48"></div>
                </div>


                <div className='basis-[70%]'>
                    <div className="skeleton-headline rounded-md  bg-gray-400 h-6 w-3/4 mb-2"></div>
                    <div className="skeleton-date rounded-md  bg-gray-300 h-4 w-1/4 mb-4"></div>
                    <div className="skeleton-summary rounded-md  bg-gray-500 h-2 w-full mb-2"></div>
                </div>
            </div>

        </div>


    </>
);

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`);
            setNews(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Unable to fetch news at this time.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) {
        // return <div>Loading news...</div>;
        return <Skeleton />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="news-container p-4 px-36">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Latest Stock Market News</h2>
            {/* <Skeleton /> */}
            
            {news.map((article, index) => (
                <div key={index} className="news-item flex items-center gap-3 mb-6 border-b border-[#303030] pb-4">
                    <div className='basis-[30%]'>
                        {article.image && (
                            <img src={article.image} alt={article.headline} className="mt-4 w-full h-48 object-cover rounded-md" />
                        )}
                    </div>

                    <div className='basis-[70%]'>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-green-600">
                            {article.headline}
                        </a>
                        <p className="text-base mt-2">{article.summary}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(article.datetime * 1000).toLocaleDateString()}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default News;
