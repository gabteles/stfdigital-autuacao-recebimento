import cmd = app.support.command;
import Properties = app.support.constants.Properties;

import {PeticaoFisicaCommand, PeticaoFisicaService} from "recebimento/peticoes-fisicas/peticao-fisica.service";

import "recebimento/peticoes-fisicas/peticao-fisica.service";
import "recebimento/peticoes-fisicas/peticao-fisica.module";

describe("Teste do serviço de petição física", () => {

    let $httpBackend: ng.IHttpBackendService;
    let peticaoService: PeticaoFisicaService;
    let properties;
    let handler;

    beforeEach(angular.mock.module("app.recebimento.services", "app.recebimento.peticoes-fisicas"));

    beforeEach(inject(["$httpBackend", "commandService", "app.recebimento.peticoes-fisicas.PeticaoFisicaService",
            "properties", (_$httpBackend_: ng.IHttpBackendService, commandService: cmd.CommandService,
            _peticaoFisicaService_: PeticaoFisicaService, _properties_: Properties) => {
        $httpBackend = _$httpBackend_;
        peticaoService =  _peticaoFisicaService_;
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

    it("deveria chamar o serviço rest registro da remessa", () => {
        //"BALCAO", 2, 3, null, "ORIGINARIO", "PUBLICO", "PeticaoFisica"
        //"BALCAO", 2, 3, null, "ORIGINARIO", "PUBLICO", "PeticaoFisica"
        $httpBackend.expectPOST(properties.apiUrl + "/recebimento/api/remessas",
                new PeticaoFisicaCommand()).respond(200, "");
        peticaoService.registrar(new PeticaoFisicaCommand()).then(handler.success, handler.error);
        $httpBackend.flush();
        expect(handler.success).toHaveBeenCalled();
        expect(handler.error).not.toHaveBeenCalled();
    });
});