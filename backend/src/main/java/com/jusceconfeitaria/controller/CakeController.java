package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.repository.CakeOptionRepository;
import com.jusceconfeitaria.repository.CakeSizeRepository;
import com.jusceconfeitaria.repository.OptionGroupRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CakeController {

  @Autowired private CakeSizeRepository cakeSizeRepository;
  @Autowired private OptionGroupRepository optionGroupRepository;
  @Autowired private CakeOptionRepository cakeOptionRepository;

  // ========== DTOs ==========
  public record TamanhoDTO(Integer id, String descricao, BigDecimal precoBase, Integer ordem) {}

  public record GrupoDTO(
      Integer id,
      String nome,
      Integer minSelecao,
      Integer maxSelecao,
      Boolean obrigatorio,
      Integer ordem) {}

  public record OpcaoDTO(
      Integer id,
      String nome,
      String descricao,
      BigDecimal precoExtra,
      String imagemUrl,
      Integer ordemExibicao) {}

  @GetMapping("/api/tamanhos")
  public List<TamanhoDTO> listarTamanhos() {
    return cakeSizeRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
        .map(
            s ->
                new TamanhoDTO(
                    s.getId(), s.getDescription(), s.getBasePrice(), s.getDisplayOrder()))
        .collect(Collectors.toList());
  }

  @GetMapping("/api/grupos-opcoes")
  public List<GrupoDTO> listarGrupos() {
    try {
      return optionGroupRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
          .map(
              g ->
                  new GrupoDTO(
                      g.getId(),
                      g.getName(),
                      g.getMinSelection(),
                      g.getMaxSelection(),
                      g.getIsRequired(),
                      g.getDisplayOrder()))
          .collect(Collectors.toList());
    } catch (Exception e) {
      System.err.println("Erro ao listar grupos: " + e.getMessage());
      e.printStackTrace();
      throw e;
    }
  }

  @GetMapping("/api/grupos-opcoes/{id}/opcoes")
  public List<OpcaoDTO> listarOpcoesPorGrupo(@PathVariable Integer id) {
    return cakeOptionRepository.findByGroupIdAndIsActiveTrueOrderByDisplayOrderAsc(id).stream()
        .map(
            o ->
                new OpcaoDTO(
                    o.getId(),
                    o.getName(),
                    o.getDescription(),
                    o.getPriceExtra(),
                    o.getImageUrl(),
                    o.getDisplayOrder()))
        .collect(Collectors.toList());
  }
}
