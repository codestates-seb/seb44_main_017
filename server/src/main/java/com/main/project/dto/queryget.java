package com.main.project.dto;

import java.time.LocalDateTime;

public interface queryget {
    public interface product{
        Long getproduct_id();
        Long getmember_id();
        String getcategory();
        String getname();
        String gettitle();
        String getcontent();
        String getimage_link();
        LocalDateTime getmodify_at();
        LocalDateTime getcreate_at();
        //Boolean getproductlike();
        Integer getprice();
        Integer getview();
        Integer getcondition_value();
    }
    public interface question{
        Long getquestion_id();
        Integer getview();
        String gettitle();
        String getcontent();
        LocalDateTime getcreate_at();
        LocalDateTime getmodify_at();

    }
}
