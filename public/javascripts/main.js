$(document).ready(function() {

  const userID = $('#currentID').html();
  const houseID = $('#houseID').html();

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

  // select an assigned task
  $(document).on('click', '.assignedTask', (e) => {
    var taskName = $(e.target).find('.task').html();
    var taskID = $(e.target).find('.id').html();
    $('#editForm #editName').val(taskName);
    $('#editForm #taskID').val(taskID);
    $('#editForm').modal('show');

  })

  // submit assigned task form
  $(document).on('click', '#editForm .submit', (e) => {
    editTaskAjax();
  })



  /*
   *  FUNCTIONS
   */

  createTaskAjax = () => {
    const name = $('#name').val();
    const assigned = $('#assigned').val();
    const dueDate = $('#dueDate').val();

    $.ajax({
      method: 'POST',
      url: '/dashboard/create',
      data: {
        name: name,
        assigned: assigned,
        dueDate: dueDate
      }
    }).done((newTask) => {

      if (newTask.assignedID == userID) {
        $('#activeTasks').append('<div class="activeTask"><div class="task">'+newTask.name+'</div><div class="hiddenID id">'+newTask._id+'</div></div>');

      }

      if (newTask.creatorID == userID) {
          $('#assignedTasks').append('<div class="assignedTask"><div class="task">'+newTask.name+'</div><div class="hiddenID id">'+newTask._id+'</div></div>');
      }

      // close modal
      $('#createForm').modal('hide');

    });
  }

  editTaskAjax = () => {
    const name = $('#editName').val();
    const assigned = $('#editAssigned').val();
    const dueDate = $('#editForm #dueDate').val();

    const currentTask = $('#editForm #taskID').val();

    $.ajax({
      method: 'PUT',
      url: '/dashboard/edit',
      data: {
        taskID: currentTask,
        name: name,
        assigned: assigned,
        dueDate: dueDate
      }
    }).done((updatedTask) => {
      // close modal
      $('#editForm').modal('hide');
      var taskArray = document.getElementsByClassName('assignedTask');
      Array.prototype.forEach.call(taskArray, task => {
        if ($(task).find('.hiddenID.id').html() == currentTask) {
          $(task).find('.task').html(updatedTask.name);
        }

      });
    })
  }



});
