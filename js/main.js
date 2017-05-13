// Grab Todo list from localStorage
var todoList = JSON.parse(localStorage.getItem('todos'));

$(document).ready(function(){
	// Set incrimentor
	var i=0;

	// Check if there are saved tasks in localStorage
	if(localStorage.getItem('todos') != null){
		// Loop through tasks and display
		$.each(todoList, function(key, value){
			$('#todos').prepend('<li id="task-"' + i + '><a id="task_link" href="#edit" data-task_i="' + i + '" data-task_name="' + value.task_name + '" data-task_date="' + value.task_date + '">' + value.task_name + ' <span>' + value.task_date + '</span></a></li>');
			i++
		});
		// Refresh
		$('#todos').listview().listview("refresh");
	}

	// Add task submition
	$('#frm-add').submit(function(e){
		var task_name = $('#task_name').val();
		var task_date = $('#task_date').val();

		// Form validation
		var frm_err = false;
		if(task_name == ''){
			$('#err_list').append('<li>Please fill in the tasks name</li>');
			frm_err=true;
		}
		if(task_date == ''){
			$('#err_list').append('<li>Please fill in the tasks due date</li>');
			frm_err=true;
		}

		// Check for form errors and popup if there are
		if(frm_err){
			$('#frm_error').popup("open");
			return false;
		} else {
			// If no errors - save tasks to localStorage[using JSON]
			var todos = JSON.parse(localStorage.getItem('todos'));
			if (todos == null) {
				todos = [];
			}
			var new_todo = {
				"task_name": task_name,
				"task_date": task_date
			};
			todos.push(new_todo);
			localStorage.setItem('todos', JSON.stringify(todos));

			// Refresh
			$('#todos').listview().listview("refresh");
		}
	});

	// Edit task submition
	$('#frm-edit').submit(function(){
		var currentTaski = localStorage.getItem('current_task_i');

		todoList.splice(currentTaski, 1);

		localStorage.setItem('todos', JSON.stringify(todoList));

		var task_name_edit = $('#task_name_edit').val();
		var task_date_edit = $('#task_date_edit').val();

		// Form validation
		var frm_err_edit = false;
		if(task_name_edit == ''){
			$('#err_list_edit').append('<li>Please fill in the tasks name</li>');
			frm_err_edit=true;
		}
		if(task_date_edit == ''){
			$('#err_list_edit').append('<li>Please fill in the tasks due date</li>');
			frm_err_edit=true;
		}

		// Check for form errors and popup if there are
		if(frm_err_edit){
			$('#frm_error_edit').popup("open");
			return false;
		} else {
			// If no errors
			var updatedTodoList = {
				"task_name": task_name_edit,
				"task_date": task_date_edit
			}
			var todos = JSON.parse(localStorage.getItem('todos'));
			todos.push(updatedTodoList);
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	});

	// Grab data from task link
	$('#todos').on('click', '#task_link', function(){
		// Save chosen task data to localstoarge
		localStorage.setItem('current_task_i', $(this).data('task_i'));
		localStorage.setItem('current_task_name', $(this).data('task_name'));
		localStorage.setItem('current_task_date', $(this).data('task_date'));
	});

	// Show chosen task data in edit fields
	$(document).on('pageshow', '#edit', function(){
		var currentTaskName = localStorage.getItem('current_task_name');
		var currentTaskDate = localStorage.getItem('current_task_date');

		$('#frm-edit input[name=task_name]', this).val(currentTaskName);
		$('#frm-edit input[name=task_date]', this).val(currentTaskDate);

	});

	// Reload homepage to show updated task list
	$(document).on('pageshow', '#home', function(){
		window.location.reload();
	});

	// Delete One
	$('#frm-edit').on('click', '#delete', function(){
		var currentTaski = localStorage.getItem('current_task_i');

		todoList.splice(currentTaski, 1);

		localStorage.setItem('todos', JSON.stringify(todoList));
		
		// Close, go home
		$.mobile.changePage($('#home'), 'pop');
	});

	// Delete all Tasks
	$('#btn-clear').click(function(){
		localStorage.clear();
	});
});
