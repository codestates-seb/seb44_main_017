package com.main.project.alarm.repository;

import com.main.project.alarm.entity.Alarm;
import com.main.project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    boolean existsByMember(Member member);

    List<Alarm> findByMember(Member member);

}
