import { type JSX } from 'react';
import style from "./style.module.css"

type BlogCardProps = {
    date: string;
    title: string;
    author: string;
    excerpt: string;
    imageUrl: string;
    onReadMore: () => void;
};


const BlogList = ({ date, title, author, excerpt, imageUrl, onReadMore, }: BlogCardProps): JSX.Element => {
    return (
        <div className={style.blogCard}>
            <div className={style.blogContent}>
                <p className={style.blogDate}>{date}</p>
                <h2 className={style.blogTitle}>{title}</h2>
                <p className={style.blogAuthor}>Por {author}</p>
                <p className={style.blogExcerpt}>{excerpt}</p>
                <button className={style.readButton} onClick={onReadMore}>
                    Read more →
                </button>
            </div>
            <div className={style.imageContainer}  style={{backgroundImage: `url(${imageUrl})`}}>
            </div>
        </div>
    );
}

export default BlogList