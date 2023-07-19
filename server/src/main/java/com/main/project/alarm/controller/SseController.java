package com.main.project.alarm.controller;

import com.main.project.alarm.entity.Alarm;
import com.main.project.alarm.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
@Slf4j
public class SseController {
    private final SseService sseService;

    public static Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping(value = "", consumes = MediaType.ALL_VALUE)
    public SseEmitter streamSseMvc(@RequestParam Long userId) {

        // 현재 클라이언트를 위한 SseEmitter 생성
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        try {
            // 연결!!
            emitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // userId를 key값으로 해서 SseEmitter를 저장
        sseEmitters.put(String.valueOf(userId), emitter);

        emitter.onCompletion(() -> sseEmitters.remove(String.valueOf(userId)));
        emitter.onTimeout(() -> sseEmitters.remove(String.valueOf(userId)));
        emitter.onError((e) -> sseEmitters.remove(String.valueOf(userId)));

        return emitter;
    }

    /*
    @PostMapping("/alarm")
    public ResponseEntity addComment(@Positive @RequestParam Long memberId,
                                     @Positive @RequestParam Long productId)
    {
        Alarm alarm = sseService.addalarm(memberId, productId);

        // 알림 이벤트 발행 메서드 호출
        sseService.alarmaddEvent(alarm.getAlarmId());

        return ResponseEntity.ok("ok");
    }
     */


}
