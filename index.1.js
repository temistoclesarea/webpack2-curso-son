System.import('./test').then(module => {
    console.log(module)
    module.default();
}, error => {
    console.log('Houve falha ao carregar o módulo!');
    console.log(error);
});

$(document).ready(function(){
    $('input:text').val('JQuery funcionando - SON !!');
});
