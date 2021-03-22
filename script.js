$(function() {
    AOS.init({
        offset: 200,
        duration: 1000,
        easing: 'linear'
    });

    /* HEADER
    ----------------------------- */
    /* SMOOTH SCROLL */
    $('#js-header-logo').click(function() {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });

    /* HAMBURGER MENU */
    function drawerClose() {
        $('#js-hamburger').attr('area-expanded', 'false');
        $('#js-header-nav').attr('area-hidden', 'true');
    }

    $('#js-hamburger').click(function() {
        $('body').toggleClass('is-drawerActive');

        if ($(this).attr('area-expanded') == 'false') {
            $(this).attr('area-expanded', 'true');
            $('#js-header-nav').attr('area-hidden', 'false');
        } else {
            drawerClose();
        }
    });

    $('#js-header-nav a').click(function() {
        $('body').removeClass('is-drawerActive');
        drawerClose();
    });



    /* FORM
    ----------------------------- */
    const $submitBtn = $('#js-submit');

    /* VALIDATION */

    $('#js-form input, #js-form textarea').on('change', function() {
        if (
            $('#js-form input[type="text"]').val() !== '' &&
            $('#js-form input[type="email"]').val() !== '' &&
            $('#js-form textarea').val() !== '' &&
            $('#privacy-check').prop('checked') === true
        ) {
            $submitBtn.prop('disabled', false).css('opacity', 1);
        } else {
            $submitBtn.prop('disabled', true).css('opacity', .5);
        }
    });

    /* SUBMIT MESSAGE */
    $('#js-form').submit(function(event) {
        var formData = $('#js-form').serialize();

        $.ajax({
            url: "https://docs.google.com/forms/u/4/d/e/1FAIpQLSeqxBU4t0cWwqvESYlgKNGmQwMgfusL8ZfNHQVeKd-Gi26tUQ/formResponse",
            data: formData,
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {
                    $(".thanks-message").slideDown();
                    $submitBtn.prop('disabled', true).css('opacity', .5);
                },
                200: function() {
                    $(".error-message").slideDown();
                }
            }
        });

        event.preventDefault();
    });
});