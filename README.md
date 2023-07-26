# RECLOSET
<div align="center">
  <img width="40%" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/772108b2-265d-4215-9246-9f44ded562b6" alt="recloset">
</div>

</br>
<div align="center"><h3><img width="18px" height="18px" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/3da6241e-23ed-4c3a-a829-2bc6407a3304"> 환경을 위한 중고 의류 판매 쇼핑몰</h3></div>


- **팀 명 :**  세븐일레븐
- **프로젝트 명 :** RECLOSET
- **프로젝트 기간 :** 2023.06.28 - 2023.07.24
- **한줄 소개 :** 빠르게 소비되고 버려지는 의류를 판매하여 친환경까지 생각하는 중고 의류 거래 플랫폼입니다.
- **배포 링크 :** http://recloset-bucket.s3-website.ap-northeast-2.amazonaws.com/

## <img width="18px" height="18px" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/9317d682-e804-4a3b-b6e0-57fd9aa0921b"> Team
| 박준용<br>(BE, 팀장) | 신예림<br>(BE, 팀원) | 황호준<br>(BE, 팀원) 
| :---: | :---: | :---: |
| <img alt="박준용" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/905f09d5-c54e-478e-86e2-8a7ce52d12e5" height="150px" width="150px"> | <img alt="신예림" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/3275307f-ba45-4f9b-9695-1ae7e17471f1" height="150px" width="150px"> | <img alt="황호준" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/aeda5e06-5fe3-4393-a4bc-ae14c59ee5a0" height="150px" width="150px"> 
|[@pparkjyy](https://github.com/pparkjyy) | [@yelm-212](https://github.com/yelm-212) | [@hwanghojun](https://github.com/hwanghojun) |

| 강민승<br>(FE, 부팀장) | 안상우<br>(FE, 팀원) | 오승찬<br>(FE, 팀원) | 이현영<br>(FE, 팀원) |
| :---: | :---: | :---: | :---: |
| <img alt="강민승" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/2dbe70ee-a638-41ff-8d51-09b29d2b1220" height="150px" width="150px"> | <img alt="안상우" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/66ddb7f8-5d0c-4e49-8c82-d297b2ca5896" height="150px" width="150px"> | <img alt="오승찬" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/111149ca-2eb1-4cf7-8e8c-bc1ea37cdce8" height="150px" width="150px"> | <img alt="이현영" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/99892e61-741a-4785-88f8-8a13cf041193" height="150px" width="150px"> |
| [@g4dalcom](https://github.com/g4dalcom) | [@NonFungibleCode](https://github.com/NonFungibleCode) | [@FASTFOX24](https://github.com/FASTFOX24) | [@lhyjjg](https://github.com/lhyjjg)

<details>
<summary>담당 파트</summary>
<div markdown="1">
  <br/>
  <strong>박준용</strong>
  
  - Spring Security, jwt, oauth 적용 및 유저, 관리자 로그인,로그아웃.토큰관리
  - 유저,관리자 CRUD 및 유저 프로필 s3 이미지 연동
  - 유저 페이지( 유저 별 등록 상품 트랙킹 )
  - 관리자 페이지(관리자 별 담당 상품 트랙킹)
  - 물품 list 묶음 등록 api 및 물품 사진 s3 연동
  - 카카오 페이 결제 시스템 적용 및 주문 기능
  - 장바구니 기능
  - ElasticSearch 검색 엔진 적용

  <br/>
  <strong>신예림</strong>
  
  - Product CRUD
  - Product List 조회시 Paging, sort-option 적용
  - 상품의 좋아요, 조회수 기능(유저 로그인시에만 반영) 구현
  - 상품 댓글 (유저) CRUD 구현
  - GitHub Actions + Docker + AWS EC2 CI & CD
  - Docker Hub 이미지 생성

  <br/>
  <strong>황호준</strong>
  
  - Notify CRUD 구현
  - NotifyView 구현
  - Question & Answer CRUD 구현
  - QuestionView 구현
  - AWS Route 53
  - AWS EC2
  - AWS S3 버킷 이미지(프로필) 생성
  - AWS Certificate Manager ssl 인증서 발급

  <br/>
  <strong>강민승</strong>
  
  - 의류 수거 신청 페이지
  - 장바구니 페이지
  - Q&A목록, 상세 페이지
  - 정렬 & 카테고리 컴포넌트
  - 댓글 컴포넌트(CRUD)
  - 검색 컴포넌트
  - 마이페이지 상품관리 & 질문관리
  <br/>
  <strong>안상우</strong>
  
  - 공지사항 카드 컴포넌트
  - 상품 상세 페이지
  - 공지, Q&A 등록 및 수정 컴포넌트(CRUD 구현)
  - 페이지네이션 컴포넌트
  - 공지사항 수정 페이지
  - Q&A 수정 페이지
  <br/>
  <strong>오승찬</strong>
  
  - 헤더 컴포넌트(Header)
  - 상품 카드 컴포넌트 (Item-product)
  - 서브타이틀바 컴포넌트 (SubTitleBar)
  - 메인 페이지
  - 상품 관리 페이지(관리자)
  - 유저 관리 페이지(관리자)
  - 상품 승인 관리 페이지(관리자)
  <br/>
  <strong>이현영</strong>
  
  - 회원가입
  - 로그인 (로그인 시 쿠키에 토큰 저장)
  - Footer 컴포넌트
  - 상품리스트 페이지
  - 공지사항 리스트 페이지
  - 공지사항 상세페이지
  - 회원정보수정 CRUD
</div>
</details>

## 🔨 Skills
<div align="center">
  <img width="60%" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/ae3efb5e-d20f-449c-88e8-613cdd111361">
</div>

## 💫 Pages & Features
|메인 페이지|로그인 / 회원가입|
|:---:|:---:|
|<img width="100%" alt="메인페이지" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/70eafdf0-9d8f-4fdf-9911-cfcb7f84861c"/>|<img width="100%" alt="로그인/회원가입" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/868811a6-bea2-446b-9f07-df1d6f27b4fc"/>|
|**상품리스트**|**상품상세페이지**|
|<img width="100%" alt="상품리스트" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/987292d3-f495-4977-86c4-c76866ce9bb0"/>|<img width="100%" alt="상품상세페이지" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/4449a292-c700-4609-baea-2edb01cf1f2a"/>|
|**의류수거신청페이지**|**장바구니**|
|<img width="100%" alt="의류수거신청페이지" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/8603642d-ab58-4e4d-ac2d-61732f83c190"/>|<img width="100%" alt="장바구니" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/24382b80-4a65-48fd-8f9e-8a40cd4edefa"/>|
|**마이페이지-상품관리**|**마이페이지-질문관리**|
|<img width="100%" alt="마이페이지-상품관리" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/750d0441-7a99-4a70-b6b4-74ac066d02eb"/>|<img width="100%" alt="마이페이지-질문관리" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/cf076396-3ba1-4bef-acbf-3f863155065b"/>|
|**마이페이지-회원정보수정**|**관리자페이지-상품관리**|
|<img width="100%" alt="회원정보수정" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/7fa8ccd2-ae22-4142-8c0b-ec57fedb315d"/>|<img width="100%" alt="관리자페이지-상품관리" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/15e2b869-703a-40c7-a0a8-d603b31449ef"/>|
|**관리자페이지-회원관리**|**관리자페이지-승인관리**|
|<img width="100%" alt="관리자페이지-회원관리" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/e83b9398-9071-4fdc-9206-a0326755f595"/>|<img width="100%" alt="관리자페이지-승인관리" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/87e2a6e1-d057-460b-8417-caf2d122f2fb"/>|
|**공지사항**|**공지사항-상세**|
|<img width="100%" alt="공지사항" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/6648a3f5-4680-4018-a266-50824d30fe55"/>|<img width="100%" alt="공지사항-상세" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/1a1da3ae-747c-4f5e-a629-655ad0b1cc1a"/>|
|**Q&A**|**Q&A-상세**|
|<img width="100%" alt="Q&A" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/44c67721-f911-4291-a28c-65b15b8647d8"/>|<img width="100%" alt="Q&A-상세" src="https://github.com/codestates-seb/seb44_main_017/assets/120166543/10b66385-f994-440b-9cac-8caa28869e34"/>|

## 📋 [API](https://documenter.getpostman.com/view/26572008/2s946mZpJT#fb9c8bdd-cad1-4990-b04c-05d1911361c6)
## 📙 Table
![image](https://github.com/codestates-seb/seb44_main_017/assets/120166543/3f7257af-47f0-47ce-b781-95b3070dd61f)
## 🖥️ [Wireframe](https://www.figma.com/file/wO2Q0aUYVPyJhnDl5QSSXD/%EC%84%B8%EB%B8%90%EC%9D%BC%EB%A0%88%EB%B8%90_RECLOSET?type=design&node-id=0-1&mode=design)
## 🗨️ [Service Manual](https://github.com/codestates-seb/seb44_main_017/files/12168680/7Eleven_.pdf)
