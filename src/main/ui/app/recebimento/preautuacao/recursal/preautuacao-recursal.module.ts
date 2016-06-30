import ITranslatePartialLoaderService = angular.translate.ITranslatePartialLoaderService;
import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import {RemessaService} from '../../services/remessa.service';
import Properties = app.support.constants.Properties;
import cmd = app.support.command; 

/** @ngInject **/
function config($stateProvider: IStateProvider,
                properties: Properties) {

    $stateProvider.state("app.novo-processo.preautuacao-recursal", {
        url : "/preautuacao/recursal",
        views : {
            "content@app.autenticado" : {
                templateUrl : "./preautuacao-recursal.tpl.html",
                controller : "app.recebimento.preautuacao-recursal.PreautuacaoRecursalController",
                controllerAs: "preautuacao"
            }
        },
        resolve: {
            classes: ['app.recebimento.services.RemessaService', (remessaService: RemessaService) => {
                return remessaService.listarClassesPorTipoRemessa("RECURSAL")
            }],
            remessa: ['app.recebimento.services.RemessaService', (remessaService: RemessaService) => {
                let protocoloId = 9007;
                return remessaService.consultarRemessa(protocoloId);
            }]
        }
    });
}

/** @ngInject **/
function run($translatePartialLoader: ITranslatePartialLoaderService,
			 properties: Properties) {
	
	$translatePartialLoader.addPart(properties.apiUrl + "/recebimento/preautuacao/recursal");
}

let preautuacaoRecursal: IModule = angular.module("app.recebimento.preautuacao-recursal", ["app.recebimento.services", "app.novo-processo", "app.support"]);
preautuacaoRecursal.config(config).run(run);
export default preautuacaoRecursal;