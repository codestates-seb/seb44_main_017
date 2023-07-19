package com.main.project.alarm.service;

import com.main.project.alarm.entity.Alarm;
import com.main.project.alarm.repository.AlarmRepository;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.service.MemberService;
import com.main.project.product.entity.Product;
import com.main.project.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

import static com.main.project.alarm.controller.SseController.sseEmitters;

@RequiredArgsConstructor
@Service
public class SseService {
    private final AlarmRepository alarmRepository;
    private final MemberService memberService;
    private final ProductService productService;

    public void alarmaddEvent(Long alarmId) {
        Alarm alarm = alarmRepository.findById(alarmId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ALARM_NOT_FOUND)
        );
        Long uuserId = alarm.getMember().getMemberId();
        String userId = String.valueOf(uuserId);
        if (sseEmitters.containsKey(userId)) {
            SseEmitter sseEmitter = sseEmitters.get(userId);
            try {
                sseEmitter.send(SseEmitter.event().name("addAlarm").data("등록한 상품 '"+alarm.getProduct().getName()+"' 이/가 판매되었습니다."));
            } catch (Exception e) {
                sseEmitters.remove(userId);
            }
        }
    }

    public void addalarm(Member member, Product product){
        Alarm alarm = new Alarm();
        alarm.setMember(member);
        alarm.setProduct(product);
        Alarm savealarm = alarmRepository.save(alarm);
        alarmaddEvent(savealarm.getAlarmId());
    }

    public void deletealarm(Long memberId){
        Member member = memberService.findVerifiedMember(memberId);
        if(alarmRepository.existsByMember(member) == true){
            List<Alarm> alarmlist = alarmRepository.findByMember(member);
            alarmlist.forEach(alarm -> {
                alarmRepository.delete(alarm);
            });
        }
    }
}

