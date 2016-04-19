package br.jus.stf.autuacao.recebimento.domain.model.support;

import java.util.List;

import br.jus.stf.core.shared.preferencia.PreferenciaId;

/**
 * @author Rafael Alencar
 * 
 * @since 1.0.0
 * @since 06.04.2016
 */
public interface PreferenciaRepository {

	List<Preferencia> findAll();
	
	Preferencia findOne(PreferenciaId id);

}
