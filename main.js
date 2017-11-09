console.log("script.js");

var BACKEND_URL = "http://localhost:5559/";

$(document).ready(function() {
    $.ajax({
	  url: BACKEND_URL + "item",
	}).done(function(data) {
		for (var i = 0; i < data.length; i++) {
			addListItem( data[i] )
		}
	});
});

function addListItem(item){
	var listItem = $('<li>');
	var ul = $('ul');

	console.log(item);
	listItem.html("<h5>Task: " + item.task + ", Completed: " + item.completed + "</h5>");
	console.log(item.completed);
	if(item.completed) {
		listItem.append('<input class="complete" type="checkbox" checked> ')
	} else {
		listItem.append('<input class="complete" type="checkbox"> ')
	}
	listItem.append('<button class="delete">Delete</button>');
	listItem.attr('data-id', item.id);
	ul.append(listItem);

}



$('.add-button').on('click', function(e){
	e.preventDefault();
	console.log('submit button');

	$.ajax(BACKEND_URL + "item", {
		method: 'POST',
		data: {
			task: $('[name="item"]').val()
		}
	}).done(function(data){
		addListItem(data);
	})
})

$('body').on('click', '.delete', function(e){
	console.log(e, 'delete');

	// DELETE /item/1

	var $li = $(this).parents('li');

	var id = $li.attr('data-id');

	$.ajax(BACKEND_URL + "item/" + id, {
		method: 'DELETE'
	}).done(function(data){
		if (data.deleted) {
			$li.remove();
		}

	})
})
$('body').on('click', '.complete', function(e) {
	console.log();
	$.ajax(BACKEND_URL + "item", {
		method: 'PUT',
		data: {
			id:$(e.target.parentNode).attr('data-id'),
			completed: e.target.checked
		}
	}).done(function(data){
		var item =$(`li[data-id=${data.id}]> h5`)
		item.html("Task: " + data.task + ", Completed: " + data.completed);
	})
})