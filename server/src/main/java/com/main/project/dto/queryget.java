package com.main.project.dto;

import lombok.Getter;

import javax.persistence.Column;
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
        Integer getproductlike();
        Integer getprice();
        Integer getview();
        Integer getcondition_value();
    }


    public interface findbypid{
        Long getproduct_id();
    }
    public interface findbyorderpid{
        Long getorderproduct_id();
    }
    public interface findbyorderid{
        Long getorder_id();
    }
    public interface orderproductlist{
        Long getproduct_id();
        Long getmember_id();
        String getname();
        Integer getprice();
        boolean getissell();
    }

    public interface denyproduct{
        Long getproduct_id();
        Long getmember_id();
        String getcategory();
        String getname();
        String gettitle();
        String getcontent();
        String getimage_link();
        LocalDateTime getmodify_at();
        LocalDateTime getcreate_at();
        String getdenycontent();
    }

    public interface question{
        Long getquestion_id();
        Integer getview();
        String gettitle();
        String getcontent();
        LocalDateTime getcreate_at();
        LocalDateTime getmodify_at();

    }

    public interface orderproduct{
        Long getorderproductId();
        Long getmemberId();
        Long getproductId();
    }
}
