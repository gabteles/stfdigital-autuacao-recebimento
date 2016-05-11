package br.jus.stf.autuacao.recebimento.interfaces;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.jus.stf.autuacao.recebimento.application.RecebimentoApplicationService;
import br.jus.stf.autuacao.recebimento.application.commands.AssinarOficioParaDevolucaoCommand;
import br.jus.stf.autuacao.recebimento.application.commands.DevolverRemessaCommand;
import br.jus.stf.autuacao.recebimento.application.commands.PreautuarRemessaCommand;
import br.jus.stf.autuacao.recebimento.application.commands.PrepararOficioParaDevolucaoCommand;
import br.jus.stf.autuacao.recebimento.application.commands.RegistrarRemessaCommand;
import br.jus.stf.autuacao.recebimento.domain.model.FormaRecebimento;
import br.jus.stf.autuacao.recebimento.domain.model.RemessaRepository;
import br.jus.stf.autuacao.recebimento.infra.RemessaDto;
import br.jus.stf.autuacao.recebimento.interfaces.dto.FormaRecebimentoDto;
import br.jus.stf.autuacao.recebimento.interfaces.dto.RemessaDtoAssembler;
import br.jus.stf.core.shared.protocolo.ProtocoloId;

/**
 * @author Rodrigo Barreiros
 * 
 * @since 1.0.0
 * @since 18.12.2015
 */
@RestController
@RequestMapping("/api/remessas")
public class RemessaRestResource {
    
    private static final String REMESSA_INVALIDA_PATTERN = "Remessa Inválida: %S";
	@Autowired
    private RecebimentoApplicationService recebimentoApplicationService; 
	
	@Autowired 
	private RemessaRepository remessaRepossitory;
	
	@Autowired
	private RemessaDtoAssembler remessaDtoAssembler;
    
    @RequestMapping(method = RequestMethod.POST)
    public Long registrar(@RequestBody @Valid RegistrarRemessaCommand command, BindingResult binding) {
        if (binding.hasErrors()) {
            throw new IllegalArgumentException(message(binding));
        }
        
        return recebimentoApplicationService.handle(command);
    }
    
    @RequestMapping(value="/{protocoloId}", method = RequestMethod.GET)
    public RemessaDto consultarRemessa(@PathVariable("protocoloId") Long id){
    	return  remessaDtoAssembler.toDto(remessaRepossitory.findOne(new ProtocoloId(id)));
    }
    

    @RequestMapping(value = "/preautuacao", method = RequestMethod.POST)
    public void preautuar(@RequestBody @Valid PreautuarRemessaCommand command, BindingResult binding) {
        if (binding.hasErrors()) {
            throw new IllegalArgumentException(message(binding));
        }
        
        recebimentoApplicationService.handle(command);
    }
    
    @RequestMapping(value = "/devolucao", method = RequestMethod.POST)
    public void devolver(@RequestBody @Valid DevolverRemessaCommand command, BindingResult binding) {
        if (binding.hasErrors()) {
            throw new IllegalArgumentException(message(binding));
        }
        
        recebimentoApplicationService.handle(command);
    }

    @RequestMapping(value = "/devolucao-oficio", method = RequestMethod.POST)
    public void prepararOficio(@RequestBody @Valid PrepararOficioParaDevolucaoCommand command, BindingResult binding) {
        if (binding.hasErrors()) {
            throw new IllegalArgumentException(message(binding));
        }
        
        recebimentoApplicationService.handle(command);
    }

    @RequestMapping(value = "/devolucao-assinatura", method = RequestMethod.POST)
    public void assinarOficio(@RequestBody @Valid AssinarOficioParaDevolucaoCommand command, BindingResult binding) {
        if (binding.hasErrors()) {
            throw new IllegalArgumentException(message(binding));
        }
        
        recebimentoApplicationService.handle(command);
    }
	
	@RequestMapping(value="/formas-recebimento", method = RequestMethod.GET)
    public List<FormaRecebimentoDto> consultarFormasRecebimento(){
    	return Arrays.asList(FormaRecebimento.values()).stream()
    			.map(forma -> new FormaRecebimentoDto(forma.descricao(), forma.exigeNumeracao()))
    			.collect(Collectors.toList());
    }

	private String message(BindingResult binding) {
		return String.format(REMESSA_INVALIDA_PATTERN, binding.getAllErrors());
	}

}
