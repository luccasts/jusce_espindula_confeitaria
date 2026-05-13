package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.*;
import com.jusceconfeitaria.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

  @Autowired private OrderRepository orderRepository;
  @Autowired private OrderSelectionRepository orderSelectionRepository;
  @Autowired private OrderLogRepository orderLogRepository;
  @Autowired private CakeSizeRepository cakeSizeRepository;
  @Autowired private CakeOptionRepository cakeOptionRepository;

  public record NovoPedidoRequest(
      String nomeCliente,
      String telefoneCliente,
      Integer tamanhoId, // ID do CakeSize
      List<Integer> opcaoIds, // IDs das CakeOptions selecionadas
      BigDecimal totalPrice,
      String observacoes) {}

  public record NovoLogRequest(
      String orderDetails, // JSON ou texto com os detalhes
      String sessionId) {}

  public record PedidoCriadoResponse(Integer id, String status) {}

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PedidoCriadoResponse criarPedido(
      @RequestBody NovoPedidoRequest req, HttpServletRequest httpReq) {

    CakeSize tamanho =
        cakeSizeRepository
            .findById(req.tamanhoId())
            .orElseThrow(
                () ->
                    new RecursoNaoEncontradoException(
                        "Tamanho não encontrado: id=" + req.tamanhoId()));

    Order order = new Order();
    order.setCustomerName(req.nomeCliente());
    order.setCustomerPhone(req.telefoneCliente());
    order.setCakeSize(tamanho);
    order.setTotalPrice(req.totalPrice());
    order.setObservations(req.observacoes());
    order.setStatus(OrderStatus.PENDING);

    Order saved = orderRepository.save(order);

    if (req.opcaoIds() != null) {
      for (Integer opcaoId : req.opcaoIds()) {
        CakeOption opcao =
            cakeOptionRepository
                .findById(opcaoId)
                .orElseThrow(
                    () -> new RecursoNaoEncontradoException("Opção não encontrada: id=" + opcaoId));

        OrderSelection sel = new OrderSelection();
        sel.setOrder(saved);
        sel.setOption(opcao);
        orderSelectionRepository.save(sel);
      }
    }

    // Registra log automático
    OrderLog log = new OrderLog();
    log.setOrderDetails("Pedido #" + saved.getId() + " criado por " + req.nomeCliente());
    log.setUserIp(httpReq.getRemoteAddr());
    log.setUserAgent(httpReq.getHeader("User-Agent"));
    log.setSessionId(req.nomeCliente() + "_" + System.currentTimeMillis());
    orderLogRepository.save(log);

    return new PedidoCriadoResponse(saved.getId(), saved.getStatus().name());
  }

  @PostMapping("/log")
  @ResponseStatus(HttpStatus.CREATED)
  public void registrarLog(@RequestBody NovoLogRequest req, HttpServletRequest httpReq) {
    OrderLog log = new OrderLog();
    log.setOrderDetails(req.orderDetails());
    log.setUserIp(httpReq.getRemoteAddr());
    log.setUserAgent(httpReq.getHeader("User-Agent"));
    log.setSessionId(req.sessionId());
    orderLogRepository.save(log);
  }
}
