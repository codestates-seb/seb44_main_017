package com.main.project.response;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class ListResponseDto<T> extends ArrayList<T> {
    public ListResponseDto(Collection<? extends T> collection) {
        super(collection);
    }
}
