package br.jus.stf.autuacao.recebimento.interfaces;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wordnik.swagger.annotations.ApiOperation;

import br.jus.stf.autuacao.recebimento.domain.model.suportejudicial.ClassePeticionavelRepository;
import br.jus.stf.autuacao.recebimento.interfaces.dto.ClasseDto;
import br.jus.stf.autuacao.recebimento.interfaces.dto.ClasseDtoAssembler;
import br.jus.stf.core.shared.processo.TipoProcesso;

/**
 * Serviço REST de classes peticionáveis.
 * 
 * @author anderson.araujo
 * @since 09/05/2016
 *
 */
@RestController
@RequestMapping("/api/classes")
public class ClasseRestResource {

    @Autowired
    private ClassePeticionavelRepository classePeticionavelRepository;

    @Autowired
    private ClasseDtoAssembler classeDtoAssembler;

    /**
     * @return Todas as classes peticionáveis.
     */
    @ApiOperation(value = "Lista todas as classes peticionáveis.", httpMethod = "GET")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ClasseDto> listarClasses() {
        return classePeticionavelRepository.findAll().stream()
                .map(classeDtoAssembler::toDto)
                .collect(Collectors.toList());
    }

    /**
     * @param tipoRemessa Tipo da remessa.
     * @return Lista todas as classes de um tipo de remessa.
     */
    @ApiOperation(value = "Lista todas as classes de um tipo de remessa.", httpMethod = "GET")
    @RequestMapping(value = "", params = "tipoRemessa", method = RequestMethod.GET)
    public List<ClasseDto> consultarClassesPorTipoRemessa(@RequestParam("tipoRemessa") String tipoRemessa) {
        TipoProcesso tipoProcesso = TipoProcesso.valueOf(tipoRemessa);

        return classePeticionavelRepository.findByTipo(tipoProcesso).stream()
                .map(classeDtoAssembler::toDto)
                .collect(Collectors.toList());
    }
}
