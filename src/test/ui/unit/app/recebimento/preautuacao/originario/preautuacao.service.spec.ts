import {DevolverRemessaCommand} from "recebimento/preautuacao/devolucao/devolucao.service";
import {PreautuacaoService, PreautuarRemessaCommand} from "recebimento/preautuacao/originario/preautuacao.service";

import "recebimento/preautuacao/originario/preautuacao.service";
import "recebimento/services/services.module";

describe("Teste do serviço de preautuação", () => {
    let $httpBackend: ng.IHttpBackendService;
    let preautuacao: PreautuacaoService;
    let properties;
    let handler;

    beforeEach(angular.mock.module("app.recebimento.services", "app.recebimento.preautuacao-originario"));

    beforeEach(inject(["$httpBackend", "app.recebimento.preautuacao-originario.PreautuacaoService", "properties",
            (_$httpBackend_: ng.IHttpBackendService, _preautuacaoService_: PreautuacaoService, _properties_) => {
        $httpBackend = _$httpBackend_;
        preautuacao =  _preautuacaoService_;
        properties = _properties_;
    }]));

    beforeEach(() => {
        handler = {
            success: () => {},
            error: () => {}
        };
        spyOn(handler, "success").and.callThrough();
        spyOn(handler, "error").and.callThrough();
    });

    it("deveria chamar o serviço rest de preautuação", () => {
        let cmdPreautuar: PreautuarRemessaCommand = new PreautuarRemessaCommand();
        cmdPreautuar.classeId = "HC";
        cmdPreautuar.preferencias = [1];
        $httpBackend.expectPUT(properties.apiUrl + "/recebimento/api/remessas/" +
                cmdPreautuar.protocoloId + "/preautuacao-originario", cmdPreautuar)
                .respond(200, "");
        preautuacao.preautuarProcesso(cmdPreautuar).then(handler.success, handler.error);
        $httpBackend.flush();
        expect(handler.success).toHaveBeenCalled();
        expect(handler.error).not.toHaveBeenCalled();
    });
});