(function(){

$(document).ready(function(){

/******************************************************************************************
Declaring variables
******************************************************************************************/

	var $textEditorContent = $('#textEditorContent');
	var $functionButtons = $('.functionButton');
	var $functionSelects = $('.functionSelect');

/******************************************************************************************
Binding events
******************************************************************************************/

	$functionButtons.on('mousedown', buttonDown);
	$functionButtons.on('mouseup', buttonUp);
	$functionButtons.on('mouseleave', buttonUp);
	$functionSelects.on('change', changeSelection);
	$functionSelects.on('mouseleave', changeSelection);

/******************************************************************************************
Functions
******************************************************************************************/

	function formatDoc(contentArea, commandName, argumentValue) {
		document.execCommand(commandName, false, argumentValue);
		contentArea.focus();
	}

	function buttonDown(){
		var clickedDiv = $(this);
		var id = clickedDiv.attr('id');
		id = id.replace('functionButton-', '');
		clickedDiv.addClass('clicked');
		formatDoc($textEditorContent, id);
	}

	function buttonUp(){
		var clickedDiv = $(this);
		clickedDiv.removeClass('clicked');
	}

	function changeSelection(){
		var selectedOption = $(this);
		var selectedSelect = selectedOption.closest('select');
		var id = selectedSelect.attr('id');
		id = id.replace('functionSelect-', '');
		var argumentValue = selectedOption.val();
		formatDoc($textEditorContent, id, argumentValue);
	}


})

}())

