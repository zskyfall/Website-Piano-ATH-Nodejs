/*
 * Copyright © 2014 NoNumber All Rights Reserved
 * License http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */
(function($){$(document).ready(function(){var tt_timeout=null;var tt_timeoutOff=0;$('.nn_tooltips-link.hover').popover({trigger:'hover',container:'body',});$('html').click(function(){$('.nn_tooltips-link').popover('hide');});$('html').one('touchstart',function(){$('.nn_tooltips-link.hover').popover({trigger:'manual',container:'body'}).click(function(evt){tooltipsShow($(this),evt,'click');});$('.nn_tooltips-link, .nn_tooltips').on('touchstart',function(evt){evt.stopPropagation();});$('html').on('touchstart',function(){$('.nn_tooltips-link').popover('hide');});});function tooltipsShow(el,evt,cls){evt.stopPropagation();clearTimeout(tt_timeout);$('.nn_tooltips-link.'+cls).each(function(){if($(this).data('popover')!=el.data('popover')){$(this).popover('hide');}});if(!el.data('popover').tip().hasClass('in')){el.popover('show');}
$('.nn_tooltips').click(function(evt){evt.stopPropagation();tt_timeoutOff=1;clearTimeout(tt_timeout);}).on('touchstart',function(evt){evt.stopPropagation();});}});})(jQuery);