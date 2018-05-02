import test from './test';
require('./app.less');
test();
$(document).ready(function(){
    $('input:text').val('JQuery funcionando - SON !');
});
