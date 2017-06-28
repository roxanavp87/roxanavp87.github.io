/**
 * Created by roxana on 5/4/17.
 */


(function () {
    'use strict';

    //------------------------------------------------------------------------------------------------------------------
    // Global variables declarations
    //------------------------------------------------------------------------------------------------------------------

    // Navigation bar
    var mobileLinks;
    mobileLinks = "<div class=\"mobile-links\">" +
                        "<ul>" +
                            "<li><a href=\"#\"><span class=\"text-capitalize\">A</span>bout</a></li>" +
                            "<li><a href=\"#\"><span class=\"text-capitalize\">P</span>ortfolio</a></li>" +
                            "<li><a href=\"#\"><span class=\"text-capitalize\">R</span>esume</a></li>" +
                            "<li><a href=\"#\"><span class=\"text-capitalize\">C</span>ontact</a></li>" +
                        "</ul>" +
                    "</div>";


    $('nav').append(mobileLinks);


    // Projects
    var videoSRC = ['videos/simon.mov', 'videos/weatherChannel.mov', 'videos/tictactoe.mov'];
    var codeHref = ['https://github.com/roxanavp87/my-projects/tree/master/simpleSimon',
                    'https://github.com/roxanavp87/my-projects/tree/master/weatherApp',
                    'https://github.com/roxanavp87/my-projects/tree/master/TicTacToe'];

    var $video = $('.video');
    var $project = $('.project');
    var $close_project = $('#close-project');

    //------------------------------------------------------------------------------------------------------------------
    // Functions Navigation Bar
    //------------------------------------------------------------------------------------------------------------------

    // Arrow to scrolling bounce effect
    // setInterval(function () { $('.down-arrow').toggle('bounce', 'slow'); }, 500);

    function navbar(target) {
        if($(target).html() === "<span class=\"text-capitalize\">P</span>ortfolio") {
            // scroll to projects
            $('html, body').animate({
                scrollTop: $('.projects').offset().top
            }, 600);
        } else if($(target).html() === "<span class=\"text-capitalize\">A</span>bout") {
            $('main').removeClass('home').addClass('about');
            $('.container-fluid').css('display', 'flex');
            $('#about-text-1').fadeIn(600);

            var index = 1;
            var intervalId = setInterval(function () {
                if (index > 5) {
                    clearInterval(intervalId);
                } else {
                    $('.about-text')[index].style.opacity = 1;
                    index++;
                }
            }, 1000);
        } else if($(target).html() === "<span class=\"text-capitalize\">R</span>esume") {
            $('html, body').animate({
                scrollTop: $('.resume').offset().top
            }, 600);

        } else if($(target).html() === "<span class=\"text-capitalize\">C</span>ontact") {
            $('html, body').animate({
                scrollTop: $('.contact').offset().top
            }, 600);
        }
    }


    //------------------------------------------------------------------------------------------------------------------
    // Events Home Section
    //------------------------------------------------------------------------------------------------------------------

    // Click event for the menu button (mobile version)
    $('#menu-button').click(function () {
        $('.mobile-links').slideToggle(500);
    });

    // Click event for my logo
    $('#my-logo').children().click(function () {
        $('main').removeClass('about').addClass('home');
        $('.container-fluid').hide();
        $('.about-text').css('opacity', '0');
        $('#about-text-1').css('opacity', '1').hide();
    });

    // Hover event and bounce effect for the down arrow
    $('.down-arrow').hover(function () {
        $(this).css('width', '4%');
    }, function () {
        $(this).css('width', '3%');
    }).toggle('bounce', 'slow');

    // Click event for the down arrow of home
    $('#arrow-home').click(function () {
        // scroll to resume
        $('html, body').animate({
            scrollTop: $('.resume').offset().top
        }, 600);

    });

    // Click event for the links of the navigation bar
    $('.nav-links a').click(function (event) {
        event.preventDefault();
        navbar(this);
    });

    $('.mobile-links').children().children().children().click(function (event) {
        event.preventDefault();
        navbar(this);
        $('.mobile-links').hide();
    });


    //------------------------------------------------------------------------------------------------------------------
    // Events & Functions for Projects Section
    //------------------------------------------------------------------------------------------------------------------

    // Click event for the projects
    $project.click(function () {
        $(this).show().attr('data-active', 'true');
        $project.each(function (index, proj) {
            if( $(proj).attr('data-active') === 'false') {
                $(proj).delay((index+1)*100).slideUp();
            }
        });
        $close_project.css('display', 'flex');

        // display video
        var project_index = parseInt($(this).attr('data-index'));
        if($(window).width() > 1200) {
            setTimeout(function () {
                $video.show().attr('src', videoSRC[project_index]).get(0).play();
                $video.on("loadeddata", function () {
                    console.log("ok");
                    $project.css('display', 'none');
                });
                $project.css('display', 'none');
            }, 900);
        }

        setTimeout(function () {
            //set up link for the code
            $('#code-link').css('display', 'flex').attr('href', codeHref[project_index]);
        }, 1500);

    });

    $close_project.click(function () {
        $(this).hide();
        $video.hide();
        $project.attr('data-active', 'false').hide();

        $project.each(function (index, proj) {
            $(proj).delay((index+1)*100).slideToggle(1500);
        });

        $('#code-link').hide();
    });

    var countBoxes = 0, transition = $('.transition-effect');
    transition.show();

    var intervalId = setInterval(function () {
        if (countBoxes >= 20) {
            clearInterval(intervalId);
        } else {
            countBoxes++;
            $('.box').css('left', '+=5%');
            transition.append('<div class="box"></div>');
        }
    }, 30);


    //------------------------------------------------------------------------------------------------------------------
    // Events & Functions for Contact Section
    //------------------------------------------------------------------------------------------------------------------

    // Function that validates email address through a regular expression.
    function validateEmail(email) {
        var regex = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        return regex.test(email);
    }

    // Click event submit button
    $('#submit').click(function (e) {
        var email = $('#input-email').val();

        if( validateEmail(email)) {
            // Valid Email Address
            $('#email-wrapper').addClass('has-success has-feedback');
            $('#span').addClass('glyphicon-ok');
            // e.preventDefault();

        } else {
            // Invalid Email Address
            $('#email-wrapper').addClass('has-error has-feedback');
            $('#span').addClass('glyphicon-remove');
            e.preventDefault();
        }

        //Check for an empty message
        if($('#message').val() === "") {
            // Empty message
            $('#msg-wrapper').addClass('has-error has-feedback');
            $('#spanm').addClass('glyphicon-remove');
            e.preventDefault();
        } else {
            $('#msg-wrapper').addClass('has-success has-feedback');
            $('#spanm').addClass('glyphicon-ok');
        }

    });

    // Focus event for message
    $( "#message" ).focus(function() {
        $('#msg-wrapper').removeClass('has-error has-success has-feedback');
        $('#spanm').removeClass('glyphicon-remove glyphicon-ok');
    });


    // Focus event for email
    $( "#input-email").focus(function() {
        // $(this).val("");
        $('#email-wrapper').removeClass('has-error has-success has-feedback');
        $('#span').removeClass('glyphicon-remove glyphicon-ok');
    });


    //------------------------------------------------------------------------------------------------------------------
    // Events Footer Section
    //------------------------------------------------------------------------------------------------------------------

    // Click and hover event for the scroll up in the footer
    $('#scroll-up').hover(function () {
        $(this).css('background-color', '#bbd7c4');
    }, function () {
        $(this).css('background-color', '#275744');
    }).click(function () {
        // scroll to projects
        $('html, body').animate({
            scrollTop: $('.home').offset().top
        }, 600);
    });

    // Hover event for footer logos
    $('#github').hover(function () {
        $(this).attr("src", "img/github_logo_1.png");
    }, function () {
        $(this).attr("src", "img/github_logo.png");
    });
    $('#linkedln').hover(function () {
        $(this).attr("src", "img/linkedln-logo_1.png");
    }, function () {
        $(this).attr("src", "img/linkedln-logo.png");
    });
    $('#email').hover(function () {
        $(this).attr("src", "img/email_logo_1.png");
    }, function () {
        $(this).attr("src", "img/email_logo.png");
    });

})();
