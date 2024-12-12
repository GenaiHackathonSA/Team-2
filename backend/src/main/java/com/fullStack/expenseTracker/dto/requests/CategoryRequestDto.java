package com.fullStack.expenseTracker.dto.requests;

import lombok.Data;

@Data
public class CategoryRequestDto {
    private String categoryName;
    private int transactionTypeId;
}
