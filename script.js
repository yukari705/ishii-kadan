$(function() {
    /* SCROLL REVEAL
    ----------------------------- */
    var fadeIn = {
        duration: 1000,
        easing: 'linear',
        viewFactor: 0.5,
        interval: 300
    };

    var fadeUp = {
        distance: '20px',
        duration: 1000,
        easing: 'ease',
        viewFactor: 0.8,
        interval: 300
    };

    var fadeUpDelay = {
        distance: '20px',
        duration: 1000,
        easing: 'ease',
        viewFactor: 0.8,
        delay: 600,
        interval: 300
    };

    ScrollReveal().reveal('.fade-in', fadeIn);
    ScrollReveal().reveal('.fade-up', fadeUp);
    ScrollReveal().reveal('.fade-up-delay', fadeUpDelay);

    /* HEADER
    ----------------------------- */
    /* CHANGE COLOR */
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('#js-header').removeClass('header--transparent');
        } else {
            $('#js-header').addClass('header--transparent');
        }
    });

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

    /* MODAL
    ----------------------------- */
    $('#js-btn-book').click(function() {
        $('#js-modal').toggleClass('is-show');
    });

    $('#js-modal-close').click(function() {
        $('#js-modal').removeClass('is-show');
    });

    $('#js-modal-bg').click(function() {
        $('#js-modal').removeClass('is-show');
    });

    /* DATE SELECT */
    flatpickr.l10ns.default.firstDayOfWeek = 1; // Monday

    flatpickr('#flatpickr', {
        locale: 'ja',
        mode: 'range',
        minDate: 'today',
    });

    /* NEWS
    ----------------------------- */
    $('.js-news-category').click(function() {
        $('.js-news-category').removeClass('is-active');
        $('.js-news-list').removeClass('is-active');

        $(this).addClass('is-active');

        let id = $(this).data("id");
        $('#' + id).addClass('is-active');
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

    /* SUB PAGE
    ----------------------------- */
    $('body').css('margin-top', $("#js-sub-header").height() + 'px');
});