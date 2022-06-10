import { endpoints, KEY } from './Constants';

export default class Book{

    _errorResponse(status=500, message){
        const msg = message ? message : 'Ocorreu um erro de comunicação com a API do Google.';
        return { error: true, httpStatus: status, message: msg };
    }

    async show(id){
        var url = endpoints.book.show + id + "?key=" + KEY;

        try{
            const response = await fetch(url);
            console.log(response);
            const responseJson = await response.json();
            var msg = 'Ocorreu um erro ao consultar o usuário.';
            if(response.status === 404)
                msg = 'Usuário não encontrado.'

            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    msg
                    );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }

    async searchList(search){
        var url = endpoints.book.listSearch + search + "&maxResults=40&key=" + KEY;

        try{
            const response = await fetch(url);
            const responseJson = await response.json();

            if(!response.ok){
                return this._errorResponse(
                    response.status, 
                    'Ocorreu um erro ao consultar os livros.'
                    );
            }
            return responseJson;
        }catch(error) {
            return this._errorResponse();
        }
    }
}