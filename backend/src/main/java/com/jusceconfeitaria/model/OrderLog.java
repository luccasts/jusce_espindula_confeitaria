import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "clicked_at", nullable = false, updatable = false)
  private LocalDateTime clickedAt;

  @Column(name = "order_details", nullable = false, columnDefinition = "TEXT")
  private String orderDetails;

  @Column(name = "user_ip", length = 45)
  private String userIp;

  @Column(name = "user_agent", columnDefinition = "TEXT")
  private String userAgent;

  @Column(name = "session_id", length = 100)
  private String sessionId;

  @PrePersist
  protected void onCreate() {
    clickedAt = LocalDateTime.now();
  }
}
