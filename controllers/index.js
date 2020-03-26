'use strict';

/**
 * execute: Executa a função recebida através de um callback.
 * @param {Function} func Elemento que será checado
 */
exports.execute = (req, res, func) => {
    func(req, res, (err, code, ret) => execCallback(res, err, code, ret));
};

/**
 * execCallback: Retorna uma resposta rest
 * @param {Number} code Código Restful que será retornado
 * @param {Object} ret Informações de resposta
 */
function execCallback(res, err, code, ret) {
    if (err) {
        // Não retorna a msg de erro original para o client caso seja um erro interno
        if (code >= 500) {
            ret = {
                error: 'Internal Server Error.'
            };
        } else {
            ret = {
                error: err
            };
        }

        // Exibir o erro
        console.error(err);
    }

    if (ret && code != 204) {
        res.status(code).send(ret);
    } else {
        res.sendStatus(code);
    }
}