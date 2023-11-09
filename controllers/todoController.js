// Assuming you are using JavaScript on the client-side

// To add a new TODO item
const addTodo = async (newtask) => {
  try {
    const response = await fetch('/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newtask }),
    });

    if (response.ok) {
      // Handle successful response (e.g., display the new TODO item)
      const todo = await response.json();
      console.log('New TODO item:', todo);
    } else {
      // Handle error response
      console.error('Error adding TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// To update a TODO item
const updateTodo = async (id, description) => {
  try {
    const response = await fetch(`/updateTodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
      // Handle successful response (e.g., update the TODO item in your UI)
      const updatedTodo = await response.json();
      console.log('Updated TODO item:', updatedTodo);
    } else {
      // Handle error response
      console.error('Error updating TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// To delete a TODO item
const deleteTodo = async (id) => {
  try {
    const response = await fetch(`/deleteTodo/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Handle successful response (e.g., remove the TODO item from your UI)
      console.log('TODO item deleted');
    } else {
      // Handle error response
      console.error('Error deleting TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
