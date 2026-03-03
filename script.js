/* Load and display Level*/
const loadLevel = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
loadLevel();

// DisplayLevel
const displayLevel = (data) => {
  // console.log(data);
  const levelContainer = document.getElementById("level-container");

  levelContainer.innerHTML = "";
  data.forEach((lesson) => {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-no-${lesson.level_no}" class="btn btn-outline btn-primary lesson-btn" onclick="loadWords('${lesson.level_no}')">
    <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
`;
    levelContainer.appendChild(btnDiv);
  });
};

// Level'sWords load and display

const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-no-${id}`);
      clickedBtn.classList.add("active");
      displayLevelWords(data.data);
    });
  const hidden = document.getElementById("init");
  hidden.classList.add("hidden");
};

const displayLevelWords = (data) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  // Level-Empty-Logic
  if (data.length === 0) {
    wordContainer.innerHTML = `
     <div class="text-center col-span-full py-10 space-y-4">
        <img class="mx-auto" src="./assets/alert-error.png" alt="error" />
        <p class="text-[#79716B] bangla-font text-sm">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-black font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    return;
  }
  data.forEach((word) => {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.className = "bg-white rounded-md px-5 py-10 space-y-8 text-center";
    wordDiv.innerHTML = `
    <h2 class="font-bold text-3xl">${word.word}</h2>
        <p class="font-mediumn text-[20px]">Meaning/Pronounciation</p>
        <p class="font-bold text-3xl">"${word.meaning}/${word.pronounciation}"</p>
        <div class="word-btn flex justify-between">
          <button
            class="info-btn btn border-0 bg-[#1A91FF10] hover:bg[#1A91FF80]"
            onclick="loadWordInfo('${word.id}')"
          >
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button
            class="volume-btn border-0 btn bg-[#1A91FF10] hover:bg[#1A91FF80]"
          >
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
    `;
    wordContainer.appendChild(wordDiv);
  });
};

// Details
const loadWordInfo = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordsInfo(data.data);
};

const displayWordsInfo = (data) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";
  const div = document.createElement("div");
  div.className = "space-y-5";
  div.innerHTML = `
    <h2 class="font-bold text-3xl">
      ${data.word} (<i class="fa-solid fa-microphone-lines"></i
      >:${data.pronunciation})
    </h2>
    <div>
      <h2 class="font-semibold">Meaning</h2>
      <p class="bangla-font">${data.meaning}</p>
    </div>
    <div>
      <h2 class="font-semibold">Example</h2>
      <p>${data.sentence}</p>
    </div>
    <div class="space-y-3">
      <h2 class="font-semibold">Synonyms</h2>
      <div>${array(data.synonyms)}</div>
    </div>
    `;
  detailsContainer.appendChild(div);
  document.getElementById("word_modal").showModal();
};
// Array
const array = (arr) =>
  arr.map((element) => `<span class="btn">${element}</span>`).join(" ");

// Active

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
