import ElementFinder = protractor.ElementFinder;

export class RecebimentoPage {
	
	public preencherQtdVolumes(quantidade : number) : void {
		element(by.id('qtdVolumes')).sendKeys(quantidade.toString());
	};
	
	public selecionarFormaRecebimento() : void {
		element(by.id('formaRecimento')).click();
		element.all(by.repeater('forma in registro.formasRecebimento')).get(2).click();
	};
	
	public preencherQtdApensos(quantidade : number) : void {
		element(by.id('qtdApensos')).sendKeys(quantidade.toString());
	};
	
	public preencherNumSedex(quantidade : number) : void {
		element(by.id('numSedex')).sendKeys(quantidade.toString());
	};
	
}