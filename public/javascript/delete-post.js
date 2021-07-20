async function editPostHandler(event) {
  event.preventDefault();

  const id = document.location.toString().split('/')[
    document.location.toString().split('/').length-1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
  }); 

  if(response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.delete-post-btn').addEventListener('click', editPostHandler);