import {PrepararOficioDevolucaoService, MotivoDevolucao, Tag, GerarTextoCommand, SubstituicaoTag, Texto, PrepararOficioParaDevolucaoCommand} from "recebimento/preparar-oficio-devolucao/preparar-oficio-devolucao.service";
import {Modelo, TipoDocumento} from "recebimento/services/model";
import "recebimento/preparar-oficio-devolucao/preparar-oficio-devolucao.service";
import 'recebimento/services/services.module';

describe('Teste do serviço preparar-oficio-devolucao.service', () => {

	let $httpBackend: ng.IHttpBackendService;
	let prepararOficioDevolucaoService: PrepararOficioDevolucaoService;
	let properties: app.support.constants.Properties;

	let handler;

	beforeEach(angular.mock.module('app.recebimento.services', 'app.recebimento.preparar-oficio-devolucao'));

	beforeEach(inject(['$httpBackend', 'app.recebimento.preparar-oficio-devolucao.PrepararOficioDevolucaoService', 'properties', (_$httpBackend_ : ng.IHttpBackendService, _prepararOficioDevolucaoService_ : PrepararOficioDevolucaoService, _properties_: app.support.constants.Properties) => {
        $httpBackend = _$httpBackend_;
       	prepararOficioDevolucaoService =  _prepararOficioDevolucaoService_;
       	properties = _properties_;
    }]));

    beforeEach(() => {
        handler = {
            success: () => {},
            error: () => {}
		}; 
 		spyOn(handler, 'success').and.callThrough();
		spyOn(handler, 'error').and.callThrough();
    });

    it("Deveria chamar o serviço rest listagem de motivos de devolução", () => {
		let motivosDevolucao: MotivoDevolucao[] = [new MotivoDevolucao(123, "Motivo 1", [3, 4]), new MotivoDevolucao(124, "Motivo 2", [5, 6])];
        $httpBackend.expectGET(properties.apiUrl + '/recebimento/api/devolucao/motivos-devolucao').respond(200, motivosDevolucao);
		
		prepararOficioDevolucaoService.listarMotivosDevolucao().then(handler.success, handler.error);
        
		$httpBackend.flush();

        expect(handler.success).toHaveBeenCalledWith(motivosDevolucao);
        expect(handler.error).not.toHaveBeenCalled();
    });

    it("Deveria chamar o serviço rest de consulta de modelos pelo motivo", () => {
		let modelos: Modelo[] = [<Modelo>{id: 1, nome: "Modelo de teste", documento: 3, tipoDocumento: new TipoDocumento(7, "Ofício de devolução")}];
		let idMotivoDevolucao: number = 123;
        $httpBackend.expectGET(properties.apiUrl + '/recebimento/api/devolucao/motivos-devolucao/' + idMotivoDevolucao + '/modelos').respond(200, modelos);
		
		prepararOficioDevolucaoService.consultarModelosPorMotivo(idMotivoDevolucao).then(handler.success, handler.error);
        
		$httpBackend.flush();

        expect(handler.success).toHaveBeenCalledWith(modelos);
        expect(handler.error).not.toHaveBeenCalled();
    });

    it("Deveria chamar o serviço rest de extração de tags", () => {
		let documentoId: number = 77;
        let tags: Tag[] = [<Tag>{nome: "Destinatário"}, <Tag>{nome: "Vocativo"}];
        $httpBackend.expectGET(properties.apiUrl + '/documents/api/documentos/77/tags').respond(200, tags);

        prepararOficioDevolucaoService.extrairTags(documentoId).then(handler.success, handler.error);

        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalledWith(tags);
        expect(handler.error).not.toHaveBeenCalled();
    });

    it("Deveria chamar o serviço rest de geração de texto com os valores das tags", () => {
        let command: GerarTextoCommand = new GerarTextoCommand(3, [new SubstituicaoTag('Destinatário', 'Fulano'), new SubstituicaoTag('Vocativo', 'Senhor Secretário')]);
        let texto: Texto = <Texto>{id: 123, documentoId: 87};
        $httpBackend.expectPOST(properties.apiUrl + '/documents/api/textos/gerar-texto', command).respond(200, texto);

        prepararOficioDevolucaoService.gerarTextoComTags(command).then(handler.success, handler.error);

        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalledWith(texto);
        expect(handler.error).not.toHaveBeenCalled();
    });

   it("Deveria chamar o serviço rest de finalizar o ofício de devolução", () => {
		let command: PrepararOficioParaDevolucaoCommand = new PrepararOficioParaDevolucaoCommand(123, 3, 7, 8);
        $httpBackend.expectPOST(properties.apiUrl + '/recebimento/api/remessas/devolucao-oficio', command).respond(200, '');

        prepararOficioDevolucaoService.finalizarDevolucao(command).then(handler.success, handler.error);

        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(handler.error).not.toHaveBeenCalled();
    });

});