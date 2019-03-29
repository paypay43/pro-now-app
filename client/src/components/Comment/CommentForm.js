import React from 'react';
//import EventContext from '../../contexts/ArticleContext';
import EventApiService from '../../services/event-api-service';

export default function CommentForm(props) {
  const handleSubmit = ev => {
    ev.preventDefault();
    let text = ev.target.text;

    EventApiService.postComment(props.id, text.value)
      .then(comment => {
        text.value = '';
        props.addComment(comment);
      })
      .catch(error => {});
  };

  return (
    <form className="CommentForm" onSubmit={handleSubmit}>
      <div className="text">
        <textarea
          className="comment-textarea"
          required
          aria-label="Type a comment..."
          name="text"
          id="text"
          cols="30"
          rows="5"
          placeholder="Type a comment.."
        />
      </div>
      <button className="submit-comment btn" type="submit">
        Post comment
      </button>
    </form>
  );
}
