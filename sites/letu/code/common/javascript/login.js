$(document).ready(
    function() {

      $(window).load(
          function() {
            setTimeout(function() {
              if ($(".loginPasswordErrorTooltip").length == 0
                  && $(".loginEmailErrorTooltip").length == 0) {
                if ($('#email-email').val() == '') {
                  $('#email-clear').css("display", "inline-block");
                } else {
                  $('#email-clear').hide();
                }

                if ($('#password-password').val() == '') {
                  $('#password-clear').css("display", "inline-block");
                } else {
                  $('#password-clear').hide();
                }
              } else {
                $('#email-email').val('');
                $('#password-password').val('');

                $('#email-clear').css("display", "inline-block");
                $('#password-clear').css("display", "inline-block");
                if ($(".loginPasswordErrorTooltip").length > 0) {
                  validationTooltip("#passwordBlock",
                      ".loginPasswordErrorTooltip");
                }
                if ($(".loginEmailErrorTooltip").length > 0) {
                  validationTooltip("#loginBlock", ".loginEmailErrorTooltip");
                }
              }
            }, 350);
          });

      $('#email-clear').click(function() {
        $('#email-email').focus();
      });
      $('#email-email').focus(function() {
        $('#email-clear').hide();
        $('#email-email').css('color', '#444444');
        $('#password-clear').hide();
        $('#password-password').css('color', '#444444');
      });
      $('#email-email').blur(function() {
        if ($('#email-email').val() == '') {
          $('#email-clear').css("display", "inline-block");
        }
        if ($('#password-password').val() == '') {
          $('#password-clear').css("display", "inline-block");
        }
      });

      $('#password-clear').click(function() {
        $('#password-password').focus();
      });
      $('#password-password').focus(function() {
        $('#password-clear').hide();
        $('#password-password').css('color', '#444444');
      });
      $('#password-password').blur(function() {
        if ($('#password-password').val() == '') {
          $('#password-clear').css("display", "inline-block");
        }
      });

      $('.default-value').each(function() {
        var default_value = this.value;
        $(this).focus(function() {
          if (this.value == default_value) {
            this.value = '';
            $('.default-value').css('color', '#999999');
          }
          $(this).keydown(function() {
            $(this).css('color', '#444444');
          });
        });
        $(this).blur(function() {
          if (this.value == '') {
            $('.default-value').css('color', '#999999');
            this.value = default_value;
          }
        });
      });
      if ($("#registrationRibbon").length) {
        $(".headerTop .rightBlock").css("padding-right", "168px");
      } else {
        $(".headerTop .rightBlock").css("padding-right", "0px");
      }
    });
