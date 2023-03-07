import './style.css';
import { url } from './modules/list.js';

const submitBtn = document.getElementById('submit-btn');
const refreshBtn = document.getElementById('refresh-btn');
const scoreList = document.getElementById('score-list');

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const user = document.getElementById('user').value;
  const score = document.getElementById('score').value;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  // clear the form inputs
  document.getElementById('user').value = '';
  document.getElementById('score').value = '';
});

refreshBtn.addEventListener('click', async () => {
  const response = await fetch(url);
  const data = await response.json();
  // clear the list before repopulating it
  scoreList.innerHTML = '';

  // populate the list FILEDS  with the scores
  data.result.forEach((score) => {
    const li = document.createElement('li');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    li.appendChild(span1);
    li.appendChild(span2);
    span1.textContent = `${score.user}:`;
    span2.textContent = `${score.score}`;

    scoreList.appendChild(li);
  });
});