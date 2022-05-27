import formatDistance from 'date-fns/formatDistance'

/** @type { HTMLInputElement |null } */
const pseudoInput = document.querySelector('input#pseudo')
const pseudo = localStorage.getItem('pseudo')
if (pseudoInput && pseudo) pseudoInput.value = pseudo

function getMyPseudo() {
  return localStorage.getItem('pseudo') || pseudoInput?.value
}

/**
 * @param {string} date
 */
function formatDate(date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}

const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')

  if (getMyPseudo() === data.pseudo) msgEl.classList.add('self')

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  msgEl.append(pseudoSpan)

  const dateSpan = document.createElement('span')
  dateSpan.classList.add('sent-at')
  dateSpan.textContent = formatDate(data.sentAt)
  dateSpan.dataset.date = data.sentAt
  msgEl.append(dateSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}

setInterval(() => {
  /** @type {NodeListOf<HTMLSpanElement} */
  const els = document.querySelectorAll('span.sent-at')
  els.forEach((dateSpan) => {
    if (!dateSpan.dataset.date) return
    dateSpan.textContent = formatDate(dateSpan.dataset.date)
  })
}, 1000 * 30)
