$(document).ready(function(){
	$('.delete-team').on('click', function(){
		var id = $(this).data('id');
		var url ='/delete_team/'+id;
		if(confirm('Delete this team member?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result) {
					console.log('deleting this team member');
					window.location.href = '/view_team';
				},
				error: function(err){
					console.log('error is', err)
				}	
			})
		}
	});
});
