package com.main.project.questionBorad.mapper;

import com.main.project.dto.queryget;
import com.main.project.questionBorad.dto.QuestionDto;
import com.main.project.questionBorad.dto.QuestionsResponseDto;
import com.main.project.questionBorad.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface QuestionMapper {

    Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost);

    Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost);

    QuestionDto.Response questionToQuestionDtoResponse(Question question);

    List<QuestionDto.Response> questionsToMultiResponseDtos(List<Question> questions);

}
