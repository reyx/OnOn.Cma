$(function () {
    $('#btn-publish-all').on('click', function () {
        confirmDialog({
            title: 'Atenção!',
            message: 'Este procedimento tornará todas as alterações públicas.<br><br>' +
                '<strong>Observação: </strong> Ao confirmar a publicação, não feche o navegador ou desligue o computador enquanto a mensagem de confirmação não for exibida. Caso isto ocorra, retorne ao sistema e clique em "Publicar Tudo" novamente.<br><br>' +
                'Deseja continuar?',
            positiveCallback: function () {
                changesViewModel.applyChanges();
                $.post('/Issues/Publish', null, function (data) {
                    if (data.result) {
                        alert({ message: 'O conteúdo foi publicado com sucesso!', type: 'succes' });
                    } else {
                        message({ message: data.errors });
                    }
                });
            }
        });
    });

    $('#btn-apply-changes').on('click', function () {
        changesViewModel.applyChanges();
    });
});