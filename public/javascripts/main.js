$(document).ready(function() {


  /*
   *  EVENT LISTENERS
   */

  // Open Modal
  $(document).on('click', '#createButton', (e) => {
    $('#createForm').modal('show');
  });

  // Submit Create Form
  $(document).on('click', '#createForm .submit', (e) => {
    createTaskAjax();
  });

  // select an active task
  $(document).on('click', '.activeTask', (e) => {
    $('#completeForm').modal('show');
  })

  // select an assigned event
  $(document).on('click', '.assignedTask', (e) => {
    $('#editForm').modal('show');
  })



  /*
   *  FUNCTIONS
   */

  createTaskAjax = () => {
    const name = $('#name').val();
    const assigned = $('#assigned').val();
    const dueDate = $('#dueDate').val();

    console.log(name);

    $.ajax({
      method: 'POST',
      url: '/dashboard/create',
      data: {
        name: name,
        assigned: assigned,
        dueDate: dueDate
      }
    }).done(() => {
      console.log('create ajax success');
      // close modal
      $('#createForm').modal('hide');
    });
  }



});
