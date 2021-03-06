import {PreautuacaoRecursalController} from "recebimento/preautuacao/recursal/preautuacao-recursal.controller";
import {PreautuacaoRecursalService, PreautuarRecursalCommand} from
        "recebimento/preautuacao/recursal/preautuacao-recursal.service";
import {Classe, Preferencia, Remessa} from "recebimento/services/model";

describe("Teste do controlador preautuacao-recursal.controller", () => {
    let controller: PreautuacaoRecursalController;
    let $q: ng.IQService;
    let $rootScope: ng.IRootScopeService;
    let mockState;
    let mockPreautuacaoRecursalService;
    let mockMessagesService;
    let mockDevolucaoService;

    beforeEach(inject((_$q_, _$rootScope_) => {
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(() => {
        mockState = {
            go : () => {}
        };
        mockPreautuacaoRecursalService = {
            preautuarRecursal : () => {}
        };
        mockMessagesService = {
            success: () => {}
        };
        mockDevolucaoService = {

        };
        let protocoloId = 123;
        let remessa: Remessa = new Remessa(protocoloId, "HC", 4, 7, "BALCAO", null, "PUBLICO");
        controller = new PreautuacaoRecursalController(mockState, mockPreautuacaoRecursalService, mockDevolucaoService,
                [new Classe("HC", "Habeas Corpus", [new Preferencia(1, "Criminal")])], remessa, [{
                    nome: "PUBLICO",
                    descricao: "Público"
                }, {
                    nome: "SEGREDO_JUSTICA",
                    descricao: "Segredo de Justiça"
                }] , mockMessagesService);
    });

    it("Deveria preautuar a remessa recursal", () => {
        let protocoloId = 123;
        let classe = "HC";
        let sigiloProcesso = "PUBLICO";
        let preferencias: Array<number> = [1];
        let motivo = "Teste do motivo";

        controller.cmdPreautuar.motivo = motivo;
        controller.classe = controller.classes[0];
        controller.carregarPreferencias();
        controller.cmdPreautuar.preferencias = [controller.classe.preferencias[0].id];
        controller.cmdPreautuar.classeId = classe;
        controller.cmdPreautuar.motivo = motivo;

        spyOn(mockPreautuacaoRecursalService, "preautuarRecursal").and.callFake(() => $q.when());

        spyOn(mockState, "go").and.callThrough();

        controller.preautuarProcessoRecursal();

        $rootScope.$apply();

        expect(mockPreautuacaoRecursalService.preautuarRecursal).toHaveBeenCalledWith(controller.cmdPreautuar);

        expect(mockState.go).toHaveBeenCalledWith("app.tarefas.minhas-tarefas");
    });
});
