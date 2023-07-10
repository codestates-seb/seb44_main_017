package com.main.project.questionBorad.mapper;

import com.main.project.questionBorad.dto.QuestionDto;
import com.main.project.questionBorad.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface QuestionMapper {

    Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost);

    Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost);

    QuestionDto.Response questionToQuestionDtoResponse(Question question);

    List<QuestionDto.Response> questionsToMultiResponseDtos(List<Question> questions);
}
