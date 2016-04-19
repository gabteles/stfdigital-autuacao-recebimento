package br.jus.stf.autuacao.recebimento.domain.model.support;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import br.jus.stf.core.framework.domaindrivendesign.ValueObjectSupport;
import br.jus.stf.core.shared.preferencia.PreferenciaId;

/**
 * @author Rafael Alencar
 * 
 * @since 1.0.0
 * @since 06.04.2016
 */
@Entity
@Table(name = "PREFERENCIA", schema = "RECEBIMENTO")
public class Preferencia extends ValueObjectSupport<Preferencia> {
	
	@EmbeddedId
	private PreferenciaId id;
	
	@Column(name = "NOM_PREFERENCIA")
	private String nome;
	
	public Preferencia() {
		// Deve ser usado apenas pelo Hibernate, que sempre usa o construtor default antes de popular uma nova instância.
	}
	
	public PreferenciaId id() {
		return id;
	}
	
	public String nome() {
		return nome;
	}
	
	@Override
	public String toString() {
		return String.format("%s - %s", id.toString(), nome);
	}

}
