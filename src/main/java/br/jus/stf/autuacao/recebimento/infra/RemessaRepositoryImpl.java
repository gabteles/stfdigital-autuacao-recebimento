package br.jus.stf.autuacao.recebimento.infra;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Repository;

import br.jus.stf.autuacao.recebimento.domain.model.MotivoDevolucao;
import br.jus.stf.autuacao.recebimento.domain.model.Remessa;
import br.jus.stf.autuacao.recebimento.domain.model.RemessaRepository;
import br.jus.stf.core.shared.protocolo.ProtocoloId;

/**
 * @author Rodrigo Barreiros
 * @author Rafael Alencar
 * 
 * @since 1.0.0
 * @since 26.02.2016
 */
@Repository
public class RemessaRepositoryImpl extends SimpleJpaRepository<Remessa, ProtocoloId> implements RemessaRepository {

    private EntityManager entityManager;

    /**
     * @param entityManager Entity manager.
     */
    @Autowired
    public RemessaRepositoryImpl(EntityManager entityManager) {
        super(Remessa.class, entityManager);
        this.entityManager = entityManager;
    }

    /** Motivo de devolução **/

    @Override
    public MotivoDevolucao findOneMotivoDevolucao(Long id) {
        TypedQuery<MotivoDevolucao> query = entityManager
                .createQuery("FROM MotivoDevolucao motivo WHERE motivo.id = :id", MotivoDevolucao.class);

        query.setParameter("id", id);

        return query.getResultList().stream().findFirst().orElse(null);
    }

    @Override
    public List<MotivoDevolucao> findAllMotivoDevolucao() {
        TypedQuery<MotivoDevolucao> query = entityManager
                .createQuery("FROM MotivoDevolucao motivo ORDER BY motivo.descricao", MotivoDevolucao.class);

        return query.getResultList();
    }

    @Override
    public <M extends MotivoDevolucao> M saveMotivoDevolucao(M motivo) {
        return entityManager.merge(motivo);
    }

    @Override
    public void deleteMotivoDevolucao(MotivoDevolucao motivo) {
        entityManager.remove(motivo);
    }

}
