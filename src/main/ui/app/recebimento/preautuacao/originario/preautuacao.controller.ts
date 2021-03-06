import IStateService = angular.ui.IStateService;
import {Classe, Remessa, Preferencia, Sigilo} from "../../services/model";
import preautuacao from "./preautuacao.module";
import {PreautuacaoService, PreautuarRemessaCommand} from "./preautuacao.service";
import {DevolucaoService, DevolverRemessaCommand} from "../devolucao/devolucao.service";

/**
 * @author Viniciusk
 */
export class PreautuacaoController {
    public basicForm: Object = {};
    public classe: Classe;
    public preferencias: Array<Preferencia> = [];

    public path = {
        id: "tarefas.preautuacao",
        translation: "Preautuação",
        uisref: "app.tarefas.recebimento-preautuacao",
        parent: "tarefas"
    };

    public cmdPreautuar: PreautuarRemessaCommand = new PreautuarRemessaCommand();
    public cmdDevolucao: DevolverRemessaCommand = new DevolverRemessaCommand();

    public static $inject = ["$state", "messagesService",
            "app.recebimento.preautuacao-originario.PreautuacaoService",
            "app.recebimento.preautuacao-devolucao.DevolucaoService", "classes", "remessa", "sigilos"];

    public constructor(private $state: IStateService, private messagesService: app.support.messaging.MessagesService,
            private preautuacaoService: PreautuacaoService, private devolucaoService: DevolucaoService,
            public classes: Classe[], public remessa: Remessa, public sigilos: Sigilo[]){
        this.cmdPreautuar.protocoloId = remessa.protocolo;
        this.cmdPreautuar.sigilo = remessa.sigilo;
        this.cmdDevolucao.protocoloId = remessa.protocolo;
    }

    /*
     * Carrega as preferências da classe selecionada.
     */
    public carregarPreferencias(): void {
         this.cmdPreautuar.classeId = this.classe.sigla;
         this.preferencias = this.classe.preferencias;
    }

    public devolver(): ng.IPromise<{}> {
        return this.devolucaoService.devolver(this.cmdDevolucao)
                .then(() => {
            this.messagesService.success("Remessa devolvida com sucesso.");
            return this.$state.go("app.tarefas.minhas-tarefas");
        }, () => {
            this.messagesService.error("Erro ao devolver remessa.");
        });
    }

    /*
     * Realiza a preautuação do processo recursal. 
     */
    public preautuarProcessoOriginario(): ng.IPromise<{}> {
        return this.preautuacaoService.preautuarProcesso(this.cmdPreautuar)
                .then(() => {
            this.messagesService.success("Remessa preautuada com sucesso.");
            return this.$state.go("app.tarefas.minhas-tarefas");
        }, () => {
            this.messagesService.error("Erro ao preautuar remessa.");
        });
    }
}

preautuacao.controller("app.recebimento.preautuacao-originario.PreautuacaoController", PreautuacaoController);
export default preautuacao;