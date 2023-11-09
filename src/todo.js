// In your client-side JavaScript
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
        
        const todo = await response.json();
        const newItem = document.createElement('li');
        newItem.innerHTML = `
          <input type="checkbox">
          <label>${todo.description}</label>
          <input type="text">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        `;
  
     
        const newTodoItemsContainer = document.getElementById('new-todo-items');
        newTodoItemsContainer.appendChild(newItem);
      } else {
      
        console.error('Error adding a new TODO item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
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
        
        const updatedTodo = await response.json();
        console.log('Updated TODO item:', updatedTodo);
      } else {
        
        console.error('Error updating TODO item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/deleteTodo/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
      
        console.log('TODO item deleted');
      } else {
        // Handle error response
        console.error('Error deleting TODO item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  