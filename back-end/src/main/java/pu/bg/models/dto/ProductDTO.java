package pu.bg.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pu.bg.models.entity.Category;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ProductDTO {

    @Size(max = 50)
    @NotBlank
    private String productName;

    @Size(max = 2000)
    @NotBlank
    private String description;


    private String image;

    @NotNull
    private BigDecimal buyPrice;

    @NotNull
    private BigDecimal sellPrice;

    @NotNull
    private Integer quantity;

    @NotNull
    private Category category;

    private String barcode;
}
