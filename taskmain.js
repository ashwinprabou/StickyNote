$(document).ready(function() {
  let points = 0;
  
  $('#addTaskButton').click(function() {
      const taskName = $('#taskName').val().trim();
      if (taskName !== "") {
          addTask(taskName);
          $('#taskName').val("");
      }
  });

  $(document).keydown(function(event) {
      if (event.key === 'Enter') {
          $('#addTaskButton').click();
      }
  });

  $('.customize').click(function() {
      $('.box').addClass('box_active');
  });

  $('.closeButton').click(function() {
      $('.box').removeClass('box_active');
  });

  $('.randomColor').click(function() {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      $('body').css('background-color', randomColor);
  });

  const addTask = (taskName) => {
      const listItem = $('<li></li>');
      const checkbox = $('<input>', { type: 'checkbox', id: `task-${$('#taskList').children().length}` });
      const label = $('<label></label>').attr('for', checkbox.attr('id')).text(taskName);

      checkbox.change(function() {
          if (checkbox.is(':checked')) {
              rewardPoints(5, listItem);
          }
      });

      listItem.append(checkbox, label);
      $('#taskList').append(listItem);
  };

  const rewardPoints = (pointsToAdd, listItem) => {
      points += pointsToAdd;
      $('#points').text(points);

      const pointsAnimation = $('<span></span>', { class: 'points-animation', text: `+${pointsToAdd}` });
      listItem.append(pointsAnimation);

      setTimeout(function() {
          pointsAnimation.remove();
      }, 1000);
  };

  let isDragging = false;
  let offsetX, offsetY;

  $('.box').mousedown(function(e) {
      isDragging = true;
      offsetX = e.clientX - $('.box').offset().left;
      offsetY = e.clientY - $('.box').offset().top;
      $('.box').css('transition', 'none');
  });

  $(document).mousemove(function(e) {
      if (isDragging) {
          $('.box').css({
              left: `${e.clientX - offsetX}px`,
              top: `${e.clientY - offsetY}px`
          });
      }
  });

  $(document).mouseup(function() {
      isDragging = false;
      $('.box').css('transition', 'transform 0.2s ease');
  });
});