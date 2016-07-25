import devolucaoAssinatura from "./devolucao-assinatura.module";
import {Modelo} from "./../services/model";

export class AssinarOficioParaDevolucaoCommand {
	constructor(public protocoloId: number, public documentoTemporarioId: string) {}
}

export class Devolucao {
	remessaProtocoloId: number;

    remessaNumero: number;
    remessaAno: number;

    modeloDevolucao: Modelo;

    textoId: number;

}

export interface Documento {
	documentoId: number;
	tamanho: number;
	quantidadePaginas: number;
}

export class DevolucaoAssinaturaService {

    private static apiRemessa: string = '/recebimento/api/remessas';
    private static apiTexto: string = '/documents/api/textos';

	static $inject = ['$http', 'properties', '$q'];

    constructor(private $http: ng.IHttpService, private properties: app.support.constants.Properties, private $q: ng.IQService) { }
    
    public montarUrlConteudoTexto(textoId: number): string {
    	return this.properties.apiUrl + DevolucaoAssinaturaService.apiTexto + '/' + textoId + '/conteudo.pdf';
    }
    
    public assinarOficioDevolucao(command: AssinarOficioParaDevolucaoCommand): ng.IPromise<{}> {
    	return this.$http.post(this.properties.apiUrl + DevolucaoAssinaturaService.apiRemessa + '/devolucao-assinatura', command)
    	   .then((response: ng.IHttpPromiseCallbackArg<any>) => {
    		   return response.data
    	   });
    }

	public consultarDevolucoes(protocolos: number[]): ng.IPromise<Devolucao[]> {
		let promises: ng.IPromise<Devolucao>[] = [];
		for (let protocoloId of protocolos) {
			promises.push(this.$http.get(this.properties.apiUrl + DevolucaoAssinaturaService.apiRemessa + "/" + protocoloId + '/devolucao')
				.then((response: ng.IHttpPromiseCallbackArg<Devolucao>) => {
					return response.data;
				}));
		}
		return this.$q.all(promises);
	}

	public consultarDocumentoFinalDoTexto(textoId: number): ng.IPromise<Documento> {
		return this.$http.get(this.properties.apiUrl + DevolucaoAssinaturaService.apiTexto + "/" + textoId + "/documento-final")
			.then((response: ng.IHttpPromiseCallbackArg<Documento>) => {
				return response.data;
			});
	}
}

devolucaoAssinatura.service('app.recebimento.devolucao-assinatura.DevolucaoAssinaturaService', DevolucaoAssinaturaService);
export default devolucaoAssinatura;