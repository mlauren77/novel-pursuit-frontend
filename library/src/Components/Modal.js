import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from './Context/AppContext';

/** Renders a book modal.
 *  
 * - item is the selectedBook which is a prop passed down from the Main component.
 * - Returns a modal overlay that displays the book details.
 * - It includes a button to add or remove the book from the bookmarks.
 * 
 */

const Modal = ({ show, item, closeModal }) => {
	const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

	console.log('favorites are', favorites);

	if (!show) {
		return null;
	}

	const isBookInFavorites = (key) => {
		// .some checks if there is at least one element in the favorites array in the condition
		const found = favorites.some((book) => book.key === key);
		return found;
	};

	const coverUrl = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null;
	const publisher = item.publisher ? item.publisher.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first publisher
	const author = item.author_name ? item.author_name.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first author

	return (
		<React.Fragment>
			<div className="overlay" onClick={closeModal}>
				<div className="overlay-inner">
					<button className="close" onClick={closeModal}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
					<div className="inner-box">
						{coverUrl ? (
							<img className="book-cover" src={coverUrl} alt={item.title} />
						) : (
							<FontAwesomeIcon className="book-placeholder" icon={faBook} size="6x" />
						)}
						<div className="info">
							<h1 className="title">{item.title}</h1>
							<h3 className="author">by {author}</h3>
							<h5 className="publisher">
								Publisher: {publisher}
								<span className="publish-date">
									&nbsp;|&nbsp;Publish Date: {item.first_publish_year}
								</span>
							</h5>

							{isBookInFavorites(item.key) ? (
								<button
									className="bookmark-btn"
									type="submit"
									onClick={(e) => {
										e.stopPropagation();
										removeFromFavorites(item.key);
									}}
								>
									<span className="bookmark-text">
										<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
										<span className="add-to-bookmarks">&nbsp;Remove from Bookmarks</span>
									</span>
								</button>
							) : (
								<button
									className="bookmark-btn"
									type="submit"
									onClick={(e) => {
										e.stopPropagation();
										addToFavorites(item);
									}}
								>
									<span className="bookmark-text">
										<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
										<span className="add-to-bookmarks">&nbsp;Add to Bookmarks</span>
									</span>
								</button>
							)}
						</div>
						<br />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
