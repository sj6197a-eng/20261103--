/* 진주 야행 데모 사이트의 메뉴, 팝업, 신청 기능을 담당합니다. */
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalContent = document.getElementById('modalContent');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// 전체 일정 팝업에 표시할 예시 일정입니다.
const scheduleItems = [
  {day:'11월 14일 (토)', time:'18:00', title:'문화유산 야간 개방', place:'진주성 일원', desc:'문화유산을 둘러보며 진주의 밤 풍경을 감상합니다.'},
  {day:'11월 14일 (토)', time:'19:00', title:'달빛 아래 전통 공연', place:'메인 무대', desc:'전통 음악과 지역 예술가의 공연을 즐겨보세요.'},
  {day:'11월 14일 (토)', time:'20:30', title:'등불 따라 골목 여행', place:'원도심 산책 코스', desc:'등불과 함께 골목에 담긴 이야기를 만나봅니다.'},
  {day:'11월 15일 (일)', time:'18:30', title:'전통문화 체험 마당', place:'체험 부스', desc:'전통 문양 만들기 등 가족 체험 프로그램을 운영합니다.'},
  {day:'11월 15일 (일)', time:'20:00', title:'진주 이야기 마당', place:'메인 무대', desc:'진주의 역사와 인물을 주제로 한 이야기 공연입니다.'},
  {day:'11월 15일 (일)', time:'21:30', title:'밤의 마무리 산책', place:'진주성 주변', desc:'고즈넉한 야경을 감상하며 행사를 마무리합니다.'}
];

const programItems = [
  ['01 / 야경','빛으로 만나는 진주성','문화유산 야간 개방과 야경 감상','18:00–23:00'],
  ['02 / 야로','등불 따라 골목 여행','등불을 따라 걷는 원도심 골목 산책','18:30–22:00'],
  ['03 / 야설','달빛 아래 전통 공연','전통 음악과 지역 예술 공연','19:00–21:30'],
  ['04 / 야사','진주 역사 이야기','해설사와 함께하는 역사 이야기','18:30 / 20:00'],
  ['05 / 야화','전통 문양 만들기','가족이 함께 즐기는 만들기 체험','18:00–21:00'],
  ['06 / 야식','진주 맛 산책','지역 먹거리와 전통 간식 체험','18:00–22:00'],
  ['07 / 야숙','한옥의 밤','전통 공간의 정취를 느끼는 문화 체험','예약 운영'],
  ['08 / 야시','밤마실 문화장터','지역 공예품과 소품을 만나는 장터','18:00–22:00']
];

// 팝업 안에 들어갈 HTML을 생성하는 공통 함수입니다.
function openModal(title, eyebrow, html) {
  modalTitle.textContent = title;
  modalEyebrow.textContent = eyebrow;
  modalContent.innerHTML = html;
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

function openSchedule() {
  let html = '';
  let currentDay = '';
  scheduleItems.forEach(item => {
    if (item.day !== currentDay) {
      currentDay = item.day;
      html += `<h3 class="modal-day">${currentDay}</h3>`;
    }
    html += `<div class="event-row"><time>${item.time}</time><div><strong>${item.title}</strong><p>${item.place} · ${item.desc}</p></div></div>`;
  });
  html += '<p class="form-note">※ 날짜와 프로그램은 제작 예시이며 실제 행사 정보가 아닙니다.</p>';
  openModal('전체 행사 일정', 'FULL SCHEDULE', html);
}

function openPrograms() {
  const html = '<div class="program-modal-grid">' + programItems.map(item =>
    `<article class="program-modal-item"><span>${item[0]}</span><strong>${item[1]}</strong><p>${item[2]}</p><p><b>${item[3]}</b></p></article>`
  ).join('') + '</div><p class="form-note" style="margin-top:16px">※ 프로그램은 웹페이지 시연을 위한 가상 구성입니다.</p>';
  openModal('전체 프로그램', 'ALL PROGRAMS', html);
}

function openRegistration() {
  const html = `
    <form class="register-form" id="registrationForm">
      <p>진주 야행에 참여할 정보를 입력해 주세요. 이 데모 신청서는 브라우저 안에서만 작동하며 실제 서버로 전송되지 않습니다.</p>
      <label>이름 <input name="name" type="text" placeholder="이름을 입력해 주세요" required maxlength="30"></label>
      <label>연락처 <input name="phone" type="tel" placeholder="010-0000-0000" required pattern="[0-9() +\\-]{9,20}"></label>
      <label>참가 날짜 <select name="date" required><option value="">날짜를 선택해 주세요</option><option>11월 14일 (토)</option><option>11월 15일 (일)</option><option>양일 모두</option></select></label>
      <label>참가 인원 <select name="people" required><option value="">인원을 선택해 주세요</option><option>1명</option><option>2명</option><option>3명</option><option>4명</option><option>5명 이상</option></select></label>
      <label>관심 프로그램 <select name="program"><option>전체 프로그램</option><option>문화유산 야간 개방</option><option>전통 공연</option><option>등불 골목 여행</option><option>전통문화 체험</option></select></label>
      <label class="consent"><input type="checkbox" required> 신청 확인을 위한 정보 입력에 동의합니다. (데모용 동의 항목)</label>
      <p class="form-note">실제 운영 시에는 개인정보 처리방침과 안전한 서버 저장 기능을 추가해야 합니다.</p>
      <button class="btn btn-dark modal-cta" type="submit">신청 내용 확인하기 ↗</button>
    </form>`;
  openModal('사전등록 신청', 'PRE-REGISTRATION', html);
  const form = document.getElementById('registrationForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = escapeHTML(data.get('name'));
    const date = escapeHTML(data.get('date'));
    const people = escapeHTML(data.get('people'));
    modalContent.innerHTML = `<div class="success-message"><div class="success-icon">✓</div><h3>신청 내용이 확인되었습니다.</h3><p><strong>${name}</strong>님, 감사합니다.<br>${date} · ${people}<br><br>이 화면은 시연용 확인 페이지입니다. 실제 접수는 완료되지 않았습니다.</p><button class="btn btn-dark modal-cta" data-close-modal>확인</button></div>`;
    modalContent.querySelector('[data-close-modal]').addEventListener('click', closeModal);
  });
}

// 입력한 문자를 화면에 안전하게 표시하도록 처리합니다.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function closeModal() {
  if (typeof modal.close === 'function') modal.close();
  else modal.removeAttribute('open');
}

// 버튼 종류에 따라 해당 팝업을 엽니다.
document.querySelectorAll('[data-open-schedule]').forEach(button => button.addEventListener('click', openSchedule));
document.querySelectorAll('[data-open-programs]').forEach(button => button.addEventListener('click', openPrograms));
document.querySelectorAll('[data-open-register]').forEach(button => button.addEventListener('click', openRegistration));
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

// 모바일 메뉴 열기/닫기
menuToggle.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? '메뉴 닫기' : '메뉴 열기');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
