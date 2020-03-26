'use strict';
const rp = require('request-promise');
const cheerio = require('cheerio');

/**
 * list: Funçao para retornar a API o crawler baseado no search e limit
 * @param {Object} req Dados da Requisição
 * @param {Object} res Dados da Resposta
 * @param {Function} callback função callback para dar o RES.SEND
 */
exports.list = async (req, res, callback) => {
    try {

        let {
            search,
            limit
        } = req.body

        if (!search) {
            callback('Envie a Palavra chave para a Busca', 404);
        }

        //caso limit não seja enviado, fica definido enviar somente 10 registros
        limit = !limit ? 10 : limit

        const url = `https://lista.mercadolivre.com.br/${search}`;
        //chama metodo de request assincrono da url acima
        rp(url, async (err, response, body) => {
            //caso o mercado livre retorne um status 200 de sucesso
            if (response.statusCode == 200) {

                //chama funcção que vai quebrar o body e limitar o retono
                var arrayReturn = await breakBody(body, limit);
                callback(null, 200, arrayReturn);
            }
        }).catch(e => {
            //caso dê algum erro, mesmo que seja 404 eu retorno uma lista vazia
            callback(null, 200, []);
        });


    } catch (e) {
        callback('Falha desconhecida ao tentar buscar dados', 500);
    }
};


/**
 * breakBody: Funçao que vai quebrar o body do MercadoLivre usando o cheerio
 * @param {String} body retorno do body do request a url
 * @param {Integer} limit quantidade de registros a serem retornados
 */
const breakBody = (body, limit) => {
    return new Promise((resolve, reject) => {

        //joga o resultado do body para a variavel $
        var $ = cheerio.load(body);
        var cont = 0;
        //cria um array vazio que recebera somente os objetos validos e dentro do limit enviado
        var arrayReturn = [];

        //busca no body a lista de resultados
        $('#searchResults li').each(function () {

            if (cont < limit) {
                var name = $(this).find('.rowItem .item__info-container  .item__info h2 a span').text().trim();
                var link = $(this).find('.rowItem .item__info-container  .item__info h2 a').attr('href');
                var priceSimbol = $(this).find('.rowItem .item__info-container  .item__info .price__container .item__price  .price__symbol').text().trim();
                var priceFraction = $(this).find('.rowItem .item__info-container  .item__info .price__container .item__price  .price__fraction').text().trim();
                var priceDecimals = $(this).find('.rowItem .item__info-container  .item__info .price__container .item__price  .price__decimals').text().trim();
                priceDecimals = priceSimbol != '' && priceDecimals == '' ? ',00' : ',' + priceDecimals;
                var price = `${priceSimbol} ${priceFraction}${priceDecimals}`;
                var store = $(this).find('.rowItem .item__info-container  .item__info h2 .item__brand a span').text().trim().replace('por ', '');
                var state = $(this).find('.rowItem .item__info-container  .item__info .item__stack_column .item__stack_column__info .stack_column_item .item__status .item__condition').text().trim();
                if (name != '') {
                    var product = {
                        name: name,
                        link: link,
                        price: price,
                        store: store,
                        state: state
                    };
                    arrayReturn.push(product);
                    cont++
                }
            }


        });

        //resolve a promisse com o array completo
        resolve(arrayReturn);
    });
}