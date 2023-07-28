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
| <img alt="박준용" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJ1Mwf%2Fbtso0ssF9rt%2Fjsk635ZYKKgh5UlTZ3kqQ1%2Fimg.png" height="150px" width="150px"> | <img alt="신예림" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLSMBJ%2Fbtso1uwWCsk%2F83RiXDRyZDTTVqyKkjFTb0%2Fimg.png" height="150px" width="150px"> | <img alt="황호준" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbpJDTU%2FbtsoZMydEGy%2Fg694EhvCrlO9A7woTNUbz0%2Fimg.png" height="150px" width="150px"> 
|[@pparkjyy](https://github.com/pparkjyy) | [@yelm-212](https://github.com/yelm-212) | [@hwanghojun](https://github.com/hwanghojun) |

| 강민승<br>(FE, 부팀장) | 안상우<br>(FE, 팀원) | 오승찬<br>(FE, 팀원) | 이현영<br>(FE, 팀원) |
| :---: | :---: | :---: | :---: |
| <img alt="강민승" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZ1ugm%2Fbtso7RREX3G%2F8LlZiWgfMJdMs52IKRDKM0%2Fimg.png" height="150px" width="150px"> | <img alt="안상우" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdCtZej%2Fbtso22togvF%2FkExPLkbFnixTEZyT4bO7pK%2Fimg.png" height="150px" width="150px"> | <img alt="오승찬" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJK9LH%2Fbtso5sZF42D%2FEdq6UaiDJvh8RzFsTK6rt1%2Fimg.png" height="150px" width="150px"> | <img alt="이현영" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb8U81n%2Fbtso6puAKsN%2FLrtBPu1a0pX5QTvY1pUhak%2Fimg.png" height="150px" width="150px"> |
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
  <img width="60%" src="https://github.com/codestates-seb/seb44_main_017/assets/92436863/013f4428-78b6-4cc4-b8d8-6944391781ba">
</div>

## 💫 Pages & Features
|메인 페이지|로그인 / 회원가입|
|:---:|:---:|
|<img width="100%" alt="메인페이지" src="https://blog.kakaocdn.net/dn/bWO2Gr/btso5YX3PRB/JohUQJbKlpAmjKozYlKUDk/img.gif"/>|<img width="100%" alt="로그인/회원가입" src="https://blog.kakaocdn.net/dn/vit8U/btso6pA3Onu/KXy1U9k0a3tw8GWK0R6BzK/img.gif"/>|
|**상품리스트**|**상품상세페이지**|
|<img width="100%" alt="상품리스트" src="https://blog.kakaocdn.net/dn/5M1ME/btso7QSAD0c/Y5oRWlQd5XEKuJbTa8MCaK/img.gif"/>|<img width="100%" alt="상품상세페이지" src="https://blog.kakaocdn.net/dn/braSSH/btso1uQ2hPH/3SwFG6DMilt9xzbtRkKIGK/img.gif"/>|
|**의류수거신청페이지**|**장바구니**|
|<img width="100%" alt="의류수거신청페이지" src="https://blog.kakaocdn.net/dn/bgHHlQ/btso10voOd4/fgNhjx9m31MnjvOcypKXyK/img.gif"/>|<img width="100%" alt="장바구니" src="https://blog.kakaocdn.net/dn/dFZRG4/btso6kGGfey/zPgDbOJdqPegQwmKnoWGeK/img.gif"/>|
|**마이페이지-상품관리**|**마이페이지-질문관리**|
|<img width="100%" alt="마이페이지-상품관리" src="https://blog.kakaocdn.net/dn/Ub0my/btso1t5CebI/NohtZEWwI6qjz0DUJV8FsK/img.gif"/>|<img width="100%" alt="마이페이지-질문관리" src="https://blog.kakaocdn.net/dn/dFZRG4/btso6kGGfey/zPgDbOJdqPegQwmKnoWGeK/img.gif"/>|
|**마이페이지-회원정보수정**|**관리자페이지-상품관리**|
|<img width="100%" alt="회원정보수정" src="https://blog.kakaocdn.net/dn/muZEX/btso112dAZP/2MM9QakkJGzfaIy6FfiRZK/img.gif"/>|<img width="100%" alt="관리자페이지-상품관리" src="https://blog.kakaocdn.net/dn/0X5Oi/btso4yS1twY/Fm6QsUQqCBc0tfjbkEEAJ1/img.gif"/>|
|**관리자페이지-회원관리**|**관리자페이지-승인관리**|
|<img width="100%" alt="관리자페이지-회원관리" src="https://blog.kakaocdn.net/dn/bxtT3g/btso6qz2nR7/GjciY0v8djEUvLsv4Mkqh1/img.gif"/>|<img width="100%" alt="관리자페이지-승인관리" src="https://blog.kakaocdn.net/dn/TmGa3/btso6jHLwSh/wCKmMoyfysNjI8jlAeSKck/img.gif"/>|
|**공지사항**|**공지사항-상세**|
|<img width="100%" alt="공지사항" src="https://blog.kakaocdn.net/dn/qPwRC/btso6axnGfh/W4Z0Y6isb59K9ZoyLN0sA0/img.gif"/>|<img width="100%" alt="공지사항-상세" src="https://blog.kakaocdn.net/dn/cA99RD/btso109ZVvV/ge0ftOkxnig3Nyvvkx8wjk/img.gif"/>|
|**Q&A**|**Q&A-상세**|
|<img width="100%" alt="Q&A" src="https://blog.kakaocdn.net/dn/dKMF82/btsoZZ41sTZ/pnNObhkSzbJOi9NZyU6jzK/img.gif"/>|<img width="100%" alt="Q&A-상세" src="https://blog.kakaocdn.net/dn/b467G4/btso5YKB1cs/VEZRMBk5KfCZsOK3D2pztk/img.gif"/>|

## 📋 [API](https://documenter.getpostman.com/view/26572008/2s946mZpJT#fb9c8bdd-cad1-4990-b04c-05d1911361c6)
## 📙 Table
![image](https://github.com/codestates-seb/seb44_main_017/assets/92436863/c7041b32-5c9b-426c-a841-798575d94346)
## 🖥️ [Wireframe](https://www.figma.com/file/wO2Q0aUYVPyJhnDl5QSSXD/%EC%84%B8%EB%B8%90%EC%9D%BC%EB%A0%88%EB%B8%90_RECLOSET?type=design&node-id=0-1&mode=design)
## 🗨️ [Service Manual](https://github.com/codestates-seb/seb44_main_017/files/12168680/7Eleven_.pdf)

