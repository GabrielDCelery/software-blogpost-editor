(function(){

$(document).ready(function(){

/******************************************************************************************
Declaring variables
******************************************************************************************/

	var $textEditorContent = $('#textEditorContent');
	var $functionButtons = $('.functionButton');
	var $functionSelects = $('.functionSelect');

	var $saveIntoDatabase = $('#textEditorSaveIntoDatabase');
	var $saveAsDraft = $('#textEditorSaveAsDraft');

/******************************************************************************************
Binding events
******************************************************************************************/

	$functionButtons.on('mousedown', buttonDown);
	$functionButtons.on('mouseup', buttonUp);
	$functionButtons.on('mouseleave', buttonUp);

	$functionSelects.on('change', changeSelection);
	$functionSelects.on('mouseleave', changeSelection);

	$saveIntoDatabase.on('click', {
		status: 'save'
	}, saveIntoDatabase);

	$saveAsDraft.on('click', {
		status: 'draft'
	}, saveIntoDatabase);

/******************************************************************************************
Doc formatting functions
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

/******************************************************************************************
Sending data to database (simulation)
******************************************************************************************/

	var TextInput = function(input){
		this.data = input
	}

	TextInput.prototype.replaceAll = function(find, replace){
		this.data = this.data.replace(new RegExp(find, 'g'), replace);
		return this;
	}

	TextInput.prototype.trimText = function(){
		this.data = this.data.trim();
		return this;
	}

	function saveIntoDatabase(event){

		var finalizedText = new TextInput($textEditorContent.html());
		finalizedText.trimText()
			.replaceAll('<div><br></div>', '<br>')
			.replaceAll('<div', '<p')
			.replaceAll('/div>', '/p>')

		switch(event.data.status) {
			case 'save':
				console.log('save')
				break;
			case 'draft':
				console.log('draft')
				break;
			default:
				console.log('error')
		}

	}

})

}())

