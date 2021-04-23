import $ from 'jquery';
import Collapse from 'bootstrap/js/src/collapse';

$(document).ready(function () {
    // Collapse left sidebar
    $('.js-collapse').on('click', function() {
        $(this).toggleClass('expanded');
        $(this).next('ul').toggleClass('show');
    })

    // Show sidebar
    function showMobileMenu() {
        $('.js-click').on('click', function() {
            const attr = $(this).attr('data-click');
            $(`.${attr}`).toggleClass('show');
            $(this).toggleClass('show-content');
            $('body').toggleClass('no-scroll');
        })
    }

    showMobileMenu();
})