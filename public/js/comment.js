const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value.trim();
    const body = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    if (postId && body) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ postId, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);